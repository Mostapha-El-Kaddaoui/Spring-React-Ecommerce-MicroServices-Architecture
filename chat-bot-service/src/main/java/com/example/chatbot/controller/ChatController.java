package com.example.chatbot.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@Tag(name = "Chat Bot API")
public class ChatController {

    private static final ObjectMapper MAPPER = new ObjectMapper();
    private static final HttpClient CLIENT = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    @Operation(summary = "Ask a question to the bot")
    @PostMapping
    public ResponseEntity<Map<String, String>> ask(@RequestBody Map<String, String> body) {
        String question = body.getOrDefault("question", "").trim();

        String apiKey = System.getenv("OPENAI_API_KEY");
        if (apiKey == null || apiKey.isBlank()) {
            return ResponseEntity.status(500).body(Map.of(
                    "question", question,
                    "answer", "OpenAI API key non fournie. Définissez la variable d'environnement OPENAI_API_KEY."
            ));
        }

        try {
            // Build request payload for Chat Completions
            String payload = MAPPER.writeValueAsString(Map.of(
                    "model", "gpt-3.5-turbo",
                    "messages", new Object[] { Map.of("role", "user", "content", question) },
                    "max_tokens", 500
            ));

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://api.openai.com/v1/chat/completions"))
                    .timeout(Duration.ofSeconds(30))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + apiKey)
                    .POST(HttpRequest.BodyPublishers.ofString(payload))
                    .build();

            HttpResponse<String> response = CLIENT.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                JsonNode root = MAPPER.readTree(response.body());
                // Extract the assistant message (choices[0].message.content)
                String answer = "";
                if (root.has("choices") && root.get("choices").isArray() && root.get("choices").size() > 0) {
                    JsonNode first = root.get("choices").get(0);
                    if (first.has("message") && first.get("message").has("content")) {
                        answer = first.get("message").get("content").asText();
                    }
                }
                if (answer.isBlank()) {
                    answer = "Pas de réponse retournée par l'API OpenAI.";
                }
                return ResponseEntity.ok(Map.of("question", question, "answer", answer));
            } else {
                String bodyResp = response.body() != null ? response.body() : "(no body)";
                return ResponseEntity.status(response.statusCode()).body(Map.of(
                        "question", question,
                        "answer", "Erreur OpenAI: " + bodyResp
                ));
            }

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "question", question,
                    "answer", "Erreur lors de l'appel à OpenAI: " + e.getMessage()
            ));
        }
    }
}

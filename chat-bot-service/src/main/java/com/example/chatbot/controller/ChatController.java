package com.example.chatbot.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@Tag(name = "Chat Bot API")
public class ChatController {

    @Operation(summary = "Ask a question to the bot")
    @PostMapping
    public ResponseEntity<Map<String, String>> ask(@RequestBody Map<String, String> body) {
        String question = body.getOrDefault("question", "").toLowerCase();
        String answer = switch (true) {
            case true when question.contains("hello") || question.contains("hi") -> "Bonjour! Comment puis-je vous aider?";
            case true when question.contains("company") -> "Je peux vous fournir des informations sur les entreprises enregistrées.";
            case true when question.contains("stock") -> "Le stock peut être consulté via le service stock.";
            default -> "Désolé, je n'ai pas compris, pouvez-vous reformuler ?";
        };
        return ResponseEntity.ok(Map.of("question", question, "answer", answer));
    }
}

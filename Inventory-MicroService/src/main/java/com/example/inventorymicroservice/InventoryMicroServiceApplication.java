package com.example.inventorymicroservice;

import com.example.inventorymicroservice.Entities.Product;
import com.example.inventorymicroservice.Repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.UUID;

@SpringBootApplication
public class InventoryMicroServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(InventoryMicroServiceApplication.class, args);
    }
    @Bean
    CommandLineRunner commandLineRunner(ProductRepository productRepository) {
        return args -> {
            productRepository.save(Product.builder()
                    .name("cartona1")
                    .price(5.6)
                    .quantity(5)
                    .build());
            productRepository.save(Product.builder()
                    .name("cartona2")
                    .price(5.6)
                    .quantity(5)
                    .build());
            productRepository.save(Product.builder()
                    .name("cartona3")
                    .price(5.6)
                    .quantity(5)
                    .build());
        };
    }

}

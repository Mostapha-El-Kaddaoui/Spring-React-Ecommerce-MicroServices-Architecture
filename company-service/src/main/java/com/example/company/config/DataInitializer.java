package com.example.company.config;

import com.example.company.entity.Company;
import com.example.company.repository.CompanyRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner init(CompanyRepository repo) {
        return args -> {
            Company c1 = new Company();
            c1.setName("Acme Corp");
            c1.setAddress("1 Road St");

            Company c2 = new Company();
            c2.setName("Beta LLC");
            c2.setAddress("2 Avenue");

            repo.save(c1);
            repo.save(c2);
        };
    }
}

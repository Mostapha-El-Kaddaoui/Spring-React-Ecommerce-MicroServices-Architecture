package com.example.clientmicroservice;

import com.example.clientmicroservice.Entities.Customer;
import com.example.clientmicroservice.Repositiories.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ClientMicroserviceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClientMicroserviceApplication.class, args);
    }
    @Bean
    CommandLineRunner start(CustomerRepository customerRepository){
        return args -> {
            customerRepository.save(Customer.builder().name("Mohammed").email("mohamed@email.com")
                    .build());
            customerRepository.save(Customer.builder().name("Khalid").email("mohamed@email.com")
                    .build());
            customerRepository.save(Customer.builder().name("Omar").email("mohamed@email.com")
                    .build());
            customerRepository.save(Customer.builder().name("Ilyas").email("mohamed@email.com")
                    .build());
            customerRepository.findAll().forEach(c->{
                System.out.println("========================");
                System.out.println(c.getId());
                System.out.println(c.getName());
                System.out.println(c.getEmail());
                System.out.println("========================");
            });
        };
    }


}
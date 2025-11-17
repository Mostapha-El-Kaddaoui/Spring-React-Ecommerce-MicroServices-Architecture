package com.example.company;

import com.example.company.dto.CompanyDto;
import com.example.company.service.CompanyService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class CompanyServiceTests {
    @Autowired
    CompanyService service;

    @Test
    void createAndGetCompany() {
        CompanyDto dto = new CompanyDto();
        dto.setName("TestCo");
        dto.setAddress("Test Address");
        CompanyDto created = service.create(dto);
        assertThat(created.getId()).isNotNull();

        CompanyDto fetched = service.get(created.getId());
        assertThat(fetched.getName()).isEqualTo("TestCo");
    }
}

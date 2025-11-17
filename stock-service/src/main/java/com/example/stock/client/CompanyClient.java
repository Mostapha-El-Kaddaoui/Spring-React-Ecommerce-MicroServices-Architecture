package com.example.stock.client;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.cloud.openfeign.FeignClient;
import java.util.Map;

@FeignClient(name = "company-service", url = "http://localhost:8091")
public interface CompanyClient {
    @GetMapping("/api/companies/{id}")
    Map<String, Object> getCompany(@PathVariable("id") Long id);
}

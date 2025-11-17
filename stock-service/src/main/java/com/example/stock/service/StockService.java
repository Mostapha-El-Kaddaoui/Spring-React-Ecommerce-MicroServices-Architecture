package com.example.stock.service;

import com.example.stock.client.CompanyClient;
import com.example.stock.dto.StockDto;
import com.example.stock.entity.Stock;
import com.example.stock.repository.StockRepository;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StockService {
    private final StockRepository repo;
    private final CompanyClient companyClient;

    public StockService(StockRepository repo, CompanyClient companyClient) {
        this.repo = repo;
        this.companyClient = companyClient;
    }

    public StockDto create(StockDto dto) {
        Stock e = new Stock();
        e.setCompanyId(dto.getCompanyId());
        e.setQuantity(dto.getQuantity());
        e = repo.save(e);
        dto.setId(e.getId());
        return dto;
    }

    public StockDto get(Long id) {
        Stock s = repo.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        StockDto dto = new StockDto(); dto.setId(s.getId()); dto.setCompanyId(s.getCompanyId()); dto.setQuantity(s.getQuantity());
        return dto;
    }

    public List<StockDto> list() {
        return repo.findAll().stream().map(s -> {
            StockDto dto = new StockDto(); dto.setId(s.getId()); dto.setCompanyId(s.getCompanyId()); dto.setQuantity(s.getQuantity()); return dto;
        }).collect(Collectors.toList());
    }

    public void delete(Long id) { repo.deleteById(id); }

    @CircuitBreaker(name = "companyClient", fallbackMethod = "companyFallback")
    public Object getCompanyInfo(Long companyId) {
        return companyClient.getCompany(companyId);
    }

    public Object companyFallback(Long companyId, Throwable t) {
        return java.util.Map.of("id", companyId, "name", "unknown", "address", "unavailable");
    }
}

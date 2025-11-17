package com.example.stock.controller;

import com.example.stock.dto.StockDto;
import com.example.stock.service.StockService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
@Tag(name = "Stock API")
public class StockController {
    private final StockService service;

    public StockController(StockService service) { this.service = service; }

    @PostMapping
    public StockDto create(@RequestBody StockDto dto) { return service.create(dto); }

    @GetMapping("/{id}")
    public StockDto get(@PathVariable Long id) { return service.get(id); }

    @GetMapping
    public List<StockDto> list() { return service.list(); }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { service.delete(id); }

    @GetMapping("/{id}/company")
    public Object company(@PathVariable("id") Long companyId) { return service.getCompanyInfo(companyId); }
}

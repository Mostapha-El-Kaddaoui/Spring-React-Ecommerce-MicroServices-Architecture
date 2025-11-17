package com.example.company.controller;

import com.example.company.dto.CompanyDto;
import com.example.company.service.CompanyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/companies")
@Tag(name = "Company API", description = "CRUD operations for companies")
public class CompanyController {
    private final CompanyService service;

    public CompanyController(CompanyService service) { this.service = service; }

    @Operation(summary = "Create company")
    @PostMapping
    public ResponseEntity<CompanyDto> create(@RequestBody CompanyDto dto) {
        CompanyDto created = service.create(dto);
        return ResponseEntity.created(URI.create("/api/companies/" + created.getId())).body(created);
    }

    @Operation(summary = "Update company")
    @PutMapping("/{id}")
    public CompanyDto update(@PathVariable Long id, @RequestBody CompanyDto dto) { return service.update(id, dto); }

    @Operation(summary = "Get company")
    @GetMapping("/{id}")
    public CompanyDto get(@PathVariable Long id) { return service.get(id); }

    @Operation(summary = "List companies")
    @GetMapping
    public List<CompanyDto> list() { return service.list(); }

    @Operation(summary = "Delete company")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}

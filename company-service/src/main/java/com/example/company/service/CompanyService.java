package com.example.company.service;

import com.example.company.dto.CompanyDto;
import com.example.company.entity.Company;
import com.example.company.mapper.CompanyMapper;
import com.example.company.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompanyService {
    private final CompanyRepository repository;
    private final CompanyMapper mapper;

    public CompanyService(CompanyRepository repository, CompanyMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public CompanyDto create(CompanyDto dto) {
        Company entity = mapper.toEntity(dto);
        entity = repository.save(entity);
        return mapper.toDto(entity);
    }

    public CompanyDto update(Long id, CompanyDto dto) {
        Company existing = repository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        existing.setName(dto.getName());
        existing.setAddress(dto.getAddress());
        existing = repository.save(existing);
        return mapper.toDto(existing);
    }

    public CompanyDto get(Long id) {
        return repository.findById(id).map(mapper::toDto).orElseThrow(() -> new RuntimeException("Not found"));
    }

    public List<CompanyDto> list() {
        return repository.findAll().stream().map(mapper::toDto).collect(Collectors.toList());
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}

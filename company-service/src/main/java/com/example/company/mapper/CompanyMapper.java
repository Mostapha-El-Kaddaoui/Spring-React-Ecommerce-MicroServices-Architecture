package com.example.company.mapper;

import com.example.company.dto.CompanyDto;
import com.example.company.entity.Company;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CompanyMapper {
    CompanyDto toDto(Company c);
    Company toEntity(CompanyDto dto);
}

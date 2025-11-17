package com.example.stock.entity;

import jakarta.persistence.*;

@Entity
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long companyId;
    private Integer quantity;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}

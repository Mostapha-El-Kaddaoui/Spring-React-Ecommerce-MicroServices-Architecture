package com.example.clientmicroservice.Entities;

import org.springframework.data.rest.core.config.Projection;

@Projection(name="all", types = Customer.class)
public interface CustomerProjection2 {
    String getName();
    String getEmail();
}

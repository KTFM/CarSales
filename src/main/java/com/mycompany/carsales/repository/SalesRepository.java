package com.mycompany.carsales.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mycompany.carsales.model.Sales;

public interface SalesRepository extends JpaRepository<Sales, Long> {
}
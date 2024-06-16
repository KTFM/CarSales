package com.mycompany.carsales.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mycompany.carsales.model.Car;

public interface CarRepository extends JpaRepository<Car, Long> {
}
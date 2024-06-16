package com.mycompany.carsales.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mycompany.carsales.model.Sales;
import com.mycompany.carsales.repository.SalesRepository;

@Service
public class SalesService {

    @Autowired
    private SalesRepository salesRepository;

    public List<Sales> findAll() {
        return salesRepository.findAll();
    }

    public Optional<Sales> findById(Long id) {
        return salesRepository.findById(id);
    }

    public Sales save(Sales sale) {
        return salesRepository.save(sale);
    }

    public void deleteById(Long id) {
        salesRepository.deleteById(id);
    }
}
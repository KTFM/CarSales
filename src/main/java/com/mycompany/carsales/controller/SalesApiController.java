package com.mycompany.carsales.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mycompany.carsales.model.Sales;
import com.mycompany.carsales.service.SalesService;

@RestController
@RequestMapping("/sales/api")
public class SalesApiController {

    @Autowired
    private SalesService salesService;

    @GetMapping
    public List<Sales> getAllSales() {
        return salesService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sales> getSaleById(@PathVariable Long id) {
        return salesService.findById(id)
                .map(sale -> ResponseEntity.ok().body(sale))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Sales createSale(@RequestBody Sales sale) {
        return salesService.save(sale);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sales> updateSale(@PathVariable Long id, @RequestBody Sales saleDetails) {
        return salesService.findById(id)
                .map(sale -> {
                    sale.setCar(saleDetails.getCar());
                    sale.setCustomer(saleDetails.getCustomer());
                    sale.setDate(saleDetails.getDate());
                    sale.setPrice(saleDetails.getPrice());
                    Sales updatedSale = salesService.save(sale);
                    return ResponseEntity.ok().body(updatedSale);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSale(@PathVariable Long id) {
        return salesService.findById(id)
                .map(sale -> {
                    salesService.deleteById(id);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
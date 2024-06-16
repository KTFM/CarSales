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

import com.mycompany.carsales.model.Car;
import com.mycompany.carsales.service.CarService;

@RestController
@RequestMapping("/car/api")
public class CarApiController {

    @Autowired
    private CarService carService;

    @GetMapping
    public List<Car> getAllCars() {
        return carService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable Long id) {
        return carService.findById(id)
                .map(car -> ResponseEntity.ok().body(car))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Car createCar(@RequestBody Car car) {
        return carService.save(car);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable Long id, @RequestBody Car carDetails) {
        return carService.findById(id)
                .map(car -> {
                    car.setMake(carDetails.getMake());
                    car.setModel(carDetails.getModel());
                    car.setReleaseDate(carDetails.getReleaseDate());
                    car.setPrice(carDetails.getPrice());
                    Car updatedCar = carService.save(car);
                    return ResponseEntity.ok().body(updatedCar);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCar(@PathVariable Long id) {
        return carService.findById(id)
                .map(car -> {
                    carService.deleteById(id);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
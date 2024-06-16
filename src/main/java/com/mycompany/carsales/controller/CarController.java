package com.mycompany.carsales.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CarController {

    @GetMapping("/car")
    public String home(Model model) {
        model.addAttribute("message", "");
        return "car";
    }
}
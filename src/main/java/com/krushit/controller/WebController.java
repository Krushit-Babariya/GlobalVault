package com.krushit.controller;

import com.krushit.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {
    
    @Autowired
    private CountryService countryService;
    
    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("totalCountries", countryService.getTotalCountryCount());
        model.addAttribute("continents", countryService.getAllContinents());
        return "index";
    }
    
    @GetMapping("/countries")
    public String countries(Model model) {
        model.addAttribute("countries", countryService.getAllCountries());
        model.addAttribute("continents", countryService.getAllContinents());
        return "countries";
    }
    
    @GetMapping("/add-country")
    public String addCountry(Model model) {
        model.addAttribute("continents", countryService.getAllContinents());
        return "add-country";
    }
    
    @GetMapping("/statistics")
    public String statistics(Model model) {
        model.addAttribute("totalCountries", countryService.getTotalCountryCount());
        model.addAttribute("continents", countryService.getAllContinents());
        model.addAttribute("countriesByContinent", countryService.getCountryCountByContinent());
        return "statistics";
    }
} 
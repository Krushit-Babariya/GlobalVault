package com.krushit.controller;

import com.krushit.entity.Country;
import com.krushit.service.CountryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/countries")
@CrossOrigin(origins = "*")
public class CountryRestController {
    
    @Autowired
    private CountryService countryService;
    
    @GetMapping
    public ResponseEntity<List<Country>> getAllCountries() {
        List<Country> countries = countryService.getAllCountries();
        return ResponseEntity.ok(countries);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Country> getCountryById(@PathVariable Long id) {
        Optional<Country> country = countryService.getCountryById(id);
        return country.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/name/{name}")
    public ResponseEntity<Country> getCountryByName(@PathVariable String name) {
        Optional<Country> country = countryService.getCountryByName(name);
        return country.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/continent/{continent}")
    public ResponseEntity<List<Country>> getCountriesByContinent(@PathVariable String continent) {
        List<Country> countries = countryService.getCountriesByContinent(continent);
        return ResponseEntity.ok(countries);
    }

    @GetMapping("/search/name")
    public ResponseEntity<List<Country>> searchCountriesByName(@RequestParam String name) {
        List<Country> countries = countryService.searchCountriesByName(name);
        return ResponseEntity.ok(countries);
    }
    
    @GetMapping("/search/continent")
    public ResponseEntity<List<Country>> searchCountriesByContinent(@RequestParam String continent) {
        List<Country> countries = countryService.searchCountriesByContinent(continent);
        return ResponseEntity.ok(countries);
    }
    
    public ResponseEntity<List<String>> getAllContinents() {
        List<String> continents = countryService.getAllContinents();
        return ResponseEntity.ok(continents);
    }
    
    @GetMapping("/population/greater-than/{population}")
    public ResponseEntity<List<Country>> getCountriesWithPopulationGreaterThan(@PathVariable Long population) {
        List<Country> countries = countryService.getCountriesWithPopulationGreaterThan(population);
        return ResponseEntity.ok(countries);
    }
    
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getStatistics() {
        Map<String, Object> statistics = new HashMap<>();
        statistics.put("totalCountries", countryService.getTotalCountryCount());
        statistics.put("continents", countryService.getAllContinents());
        statistics.put("countriesByContinent", countryService.getCountryCountByContinent());
        return ResponseEntity.ok(statistics);
    }
    
    @PostMapping
    public ResponseEntity<?> createCountry(@Valid @RequestBody Country country) {
        if (countryService.existsByName(country.getName())) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Country with name '" + country.getName() + "' already exists");
            return ResponseEntity.badRequest().body(error);
        }
        
        Country savedCountry = countryService.saveCountry(country);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCountry);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCountry(@PathVariable Long id, @Valid @RequestBody Country countryDetails) {
        Country updatedCountry = countryService.updateCountry(id, countryDetails);
        if (updatedCountry != null) {
            return ResponseEntity.ok(updatedCountry);
        } else {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Country with ID " + id + " not found");
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCountry(@PathVariable Long id) {
        boolean deleted = countryService.deleteCountry(id);
        if (deleted) {
            Map<String, String> message = new HashMap<>();
            message.put("message", "Country deleted successfully");
            return ResponseEntity.ok(message);
        } else {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Country with ID " + id + " not found");
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/bulk")
    public ResponseEntity<?> createCountries(@Valid @RequestBody List<Country> countries) {
        List<Country> savedCountries = countries.stream()
                .filter(country -> !countryService.existsByName(country.getName()))
                .map(countryService::saveCountry)
                .toList();
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Created " + savedCountries.size() + " countries");
        response.put("countries", savedCountries);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
} 
package com.krushit.service;

import com.krushit.entity.Country;
import com.krushit.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CountryService {
    
    @Autowired
    private CountryRepository countryRepository;
    
    public List<Country> getAllCountries() {
        return countryRepository.findAllByOrderByContinentAscNameAsc();
    }
    
    public Optional<Country> getCountryById(Long id) {
        return countryRepository.findById(id);
    }

    public Optional<Country> getCountryByName(String name) {
        return countryRepository.findByName(name);
    }
    
    public List<Country> getCountriesByContinent(String continent) {
        return countryRepository.findByContinentOrderByNameAsc(continent);
    }
    
    public List<Country> searchCountriesByName(String name) {
        return countryRepository.findByNameContainingIgnoreCase(name);
    }
    
    public List<Country> searchCountriesByContinent(String continent) {
        return countryRepository.findByContinentContainingIgnoreCase(continent);
    }
    
   public List<String> getAllContinents() {
        return countryRepository.findAllDistinctContinents();
    }
    
    public List<Country> getCountriesWithPopulationGreaterThan(Long population) {
        return countryRepository.findCountriesWithPopulationGreaterThan(population);
    }
    
    public List<Object[]> getCountryCountByContinent() {
        return countryRepository.countCountriesByContinent();
    }
    
    public Country saveCountry(Country country) {
        return countryRepository.save(country);
    }
    
    public Country updateCountry(Long id, Country countryDetails) {
        Optional<Country> optionalCountry = countryRepository.findById(id);
        if (optionalCountry.isPresent()) {
            Country country = optionalCountry.get();
            country.setName(countryDetails.getName());
            country.setContinent(countryDetails.getContinent());
            country.setPopulation(countryDetails.getPopulation());
            country.setCapital(countryDetails.getCapital());
            country.setArea(countryDetails.getArea());
            country.setCurrency(countryDetails.getCurrency());
            country.setLanguage(countryDetails.getLanguage());
            return countryRepository.save(country);
        }
        return null;
    }
    
    public boolean deleteCountry(Long id) {
        Optional<Country> optionalCountry = countryRepository.findById(id);
        if (optionalCountry.isPresent()) {
            countryRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public boolean existsByName(String name) {
        return countryRepository.findByName(name).isPresent();
    }
    
    public long getTotalCountryCount() {
        return countryRepository.count();
    }
} 
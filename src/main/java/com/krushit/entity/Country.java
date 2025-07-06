package com.krushit.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "countries")
public class Country {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Country name is required")
    @Size(min = 2, max = 100, message = "Country name must be between 2 and 100 characters")
    @Column(name = "name", nullable = false, unique = true)
    private String name;
    
    @NotBlank(message = "Continent is required")
    @Size(min = 2, max = 50, message = "Continent must be between 2 and 50 characters")
    @Column(name = "continent", nullable = false)
    private String continent;
    
    @Column(name = "population")
    private Long population;
    
    @Column(name = "capital")
    private String capital;
    
    @Column(name = "area")
    private Double area;
    
    @Column(name = "currency")
    private String currency;
    
    @Column(name = "language")
    private String language;
    
    // Default constructor
    public Country() {}
    
    // Constructor with required fields
    public Country(String name, String continent) {
        this.name = name;
        this.continent = continent;
    }
    
    // Constructor with all fields
    public Country(String name, String continent, Long population, String capital, Double area, String currency, String language) {
        this.name = name;
        this.continent = continent;
        this.population = population;
        this.capital = capital;
        this.area = area;
        this.currency = currency;
        this.language = language;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getContinent() {
        return continent;
    }
    
    public void setContinent(String continent) {
        this.continent = continent;
    }
    
    public Long getPopulation() {
        return population;
    }
    
    public void setPopulation(Long population) {
        this.population = population;
    }
    
    public String getCapital() {
        return capital;
    }
    
    public void setCapital(String capital) {
        this.capital = capital;
    }
    
    public Double getArea() {
        return area;
    }
    
    public void setArea(Double area) {
        this.area = area;
    }
    
    public String getCurrency() {
        return currency;
    }
    
    public void setCurrency(String currency) {
        this.currency = currency;
    }
    
    public String getLanguage() {
        return language;
    }
    
    public void setLanguage(String language) {
        this.language = language;
    }
    
    @Override
    public String toString() {
        return "Country{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", continent='" + continent + '\'' +
                ", population=" + population +
                ", capital='" + capital + '\'' +
                ", area=" + area +
                ", currency='" + currency + '\'' +
                ", language='" + language + '\'' +
                '}';
    }
} 
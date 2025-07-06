package com.krushit.config;

import com.krushit.entity.Country;
import com.krushit.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private CountryRepository countryRepository;
    
    @Override
    public void run(String... args) throws Exception {
        if (countryRepository.count() == 0) {
            initializeSampleData();
        }
    }
    
    private void initializeSampleData() {
        List<Country> sampleCountries = Arrays.asList(
            // Asia
            new Country("China", "Asia", 1439323776L, "Beijing", 9596961.0, "CNY", "Chinese"),
            new Country("India", "Asia", 1380004385L, "New Delhi", 3287263.0, "INR", "Hindi"),
            new Country("Japan", "Asia", 125836021L, "Tokyo", 377975.0, "JPY", "Japanese"),
            new Country("South Korea", "Asia", 51269185L, "Seoul", 100210.0, "KRW", "Korean"),
            new Country("Indonesia", "Asia", 273523615L, "Jakarta", 1904569.0, "IDR", "Indonesian"),
            new Country("Thailand", "Asia", 69799978L, "Bangkok", 513120.0, "THB", "Thai"),
            new Country("Vietnam", "Asia", 97338579L, "Hanoi", 331212.0, "VND", "Vietnamese"),
            new Country("Malaysia", "Asia", 32365999L, "Kuala Lumpur", 330803.0, "MYR", "Malay"),
            new Country("Philippines", "Asia", 109581078L, "Manila", 300000.0, "PHP", "Filipino"),
            new Country("Singapore", "Asia", 5850342L, "Singapore", 728.6, "SGD", "English"),
            
            // Europe
            new Country("Germany", "Europe", 83190556L, "Berlin", 357022.0, "EUR", "German"),
            new Country("France", "Europe", 65273511L, "Paris", 551695.0, "EUR", "French"),
            new Country("United Kingdom", "Europe", 67886011L, "London", 242495.0, "GBP", "English"),
            new Country("Italy", "Europe", 60461826L, "Rome", 301340.0, "EUR", "Italian"),
            new Country("Spain", "Europe", 46754778L, "Madrid", 505990.0, "EUR", "Spanish"),
            new Country("Poland", "Europe", 37846611L, "Warsaw", 312696.0, "PLN", "Polish"),
            new Country("Netherlands", "Europe", 17134872L, "Amsterdam", 41543.0, "EUR", "Dutch"),
            new Country("Belgium", "Europe", 11589623L, "Brussels", 30528.0, "EUR", "Dutch"),
            new Country("Sweden", "Europe", 10099265L, "Stockholm", 450295.0, "SEK", "Swedish"),
            new Country("Norway", "Europe", 5421241L, "Oslo", 385207.0, "NOK", "Norwegian"),
            
            // Africa
            new Country("Nigeria", "Africa", 206139589L, "Abuja", 923768.0, "NGN", "English"),
            new Country("Ethiopia", "Africa", 114963588L, "Addis Ababa", 1104300.0, "ETB", "Amharic"),
            new Country("Egypt", "Africa", 102334404L, "Cairo", 1002450.0, "EGP", "Arabic"),
            new Country("Democratic Republic of the Congo", "Africa", 89561403L, "Kinshasa", 2344858.0, "CDF", "French"),
            new Country("South Africa", "Africa", 59308690L, "Pretoria", 1221037.0, "ZAR", "English"),
            new Country("Tanzania", "Africa", 59734218L, "Dodoma", 947303.0, "TZS", "Swahili"),
            new Country("Kenya", "Africa", 53771296L, "Nairobi", 580367.0, "KES", "English"),
            new Country("Uganda", "Africa", 45741007L, "Kampala", 241550.0, "UGX", "English"),
            new Country("Algeria", "Africa", 44616624L, "Algiers", 2381741.0, "DZD", "Arabic"),
            new Country("Sudan", "Africa", 43849260L, "Khartoum", 1886068.0, "SDG", "Arabic"),
            
            // North America
            new Country("United States", "North America", 331002651L, "Washington D.C.", 9833517.0, "USD", "English"),
            new Country("Mexico", "North America", 128932753L, "Mexico City", 1964375.0, "MXN", "Spanish"),
            new Country("Canada", "North America", 37742154L, "Ottawa", 9984670.0, "CAD", "English"),
            new Country("Guatemala", "North America", 17915568L, "Guatemala City", 108889.0, "GTQ", "Spanish"),
            new Country("Cuba", "North America", 11326616L, "Havana", 109884.0, "CUP", "Spanish"),
            new Country("Haiti", "North America", 11402528L, "Port-au-Prince", 27750.0, "HTG", "French"),
            new Country("Dominican Republic", "North America", 10847910L, "Santo Domingo", 48671.0, "DOP", "Spanish"),
            new Country("Honduras", "North America", 9904607L, "Tegucigalpa", 112492.0, "HNL", "Spanish"),
            new Country("Nicaragua", "North America", 6624554L, "Managua", 130373.0, "NIO", "Spanish"),
            new Country("El Salvador", "North America", 6486205L, "San Salvador", 21041.0, "USD", "Spanish"),
            
            // South America
            new Country("Brazil", "South America", 212559417L, "Brasília", 8515767.0, "BRL", "Portuguese"),
            new Country("Colombia", "South America", 50882891L, "Bogotá", 1141748.0, "COP", "Spanish"),
            new Country("Argentina", "South America", 45195774L, "Buenos Aires", 2780400.0, "ARS", "Spanish"),
            new Country("Peru", "South America", 32971854L, "Lima", 1285216.0, "PEN", "Spanish"),
            new Country("Venezuela", "South America", 28435943L, "Caracas", 916445.0, "VES", "Spanish"),
            new Country("Chile", "South America", 19116201L, "Santiago", 756102.0, "CLP", "Spanish"),
            new Country("Ecuador", "South America", 17643054L, "Quito", 283561.0, "USD", "Spanish"),
            new Country("Bolivia", "South America", 11673021L, "La Paz", 1098581.0, "BOB", "Spanish"),
            new Country("Paraguay", "South America", 7132538L, "Asunción", 406752.0, "PYG", "Spanish"),
            new Country("Uruguay", "South America", 3473730L, "Montevideo", 181034.0, "UYU", "Spanish"),
            
            // Australia
            new Country("Australia", "Australia", 25499884L, "Canberra", 7692024.0, "AUD", "English"),
            new Country("Papua New Guinea", "Australia", 8947024L, "Port Moresby", 462840.0, "PGK", "English"),
            new Country("New Zealand", "Australia", 5084300L, "Wellington", 270467.0, "NZD", "English"),
            new Country("Fiji", "Australia", 896444L, "Suva", 18274.0, "FJD", "English"),
            new Country("Solomon Islands", "Australia", 686884L, "Honiara", 28896.0, "SBD", "English"),
            new Country("Vanuatu", "Australia", 307145L, "Port Vila", 12189.0, "VUV", "Bislama"),
            new Country("New Caledonia", "Australia", 285498L, "Nouméa", 18575.0, "XPF", "French"),
            new Country("French Polynesia", "Australia", 280908L, "Papeete", 4167.0, "XPF", "French"),
            new Country("Samoa", "Australia", 198414L, "Apia", 2842.0, "WST", "Samoan"),
            new Country("Tonga", "Australia", 105695L, "Nuku'alofa", 747.0, "TOP", "Tongan")
        );
        
        countryRepository.saveAll(sampleCountries);
        System.out.println("Sample countries data initialized successfully!");
    }
} 
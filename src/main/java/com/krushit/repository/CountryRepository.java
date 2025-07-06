package com.krushit.repository;

import com.krushit.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
    
    Optional<Country> findByName(String name);
    
    List<Country> findByContinent(String continent);
    
    List<Country> findByContinentOrderByNameAsc(String continent);
    
    List<Country> findAllByOrderByNameAsc();
    
    List<Country> findAllByOrderByContinentAscNameAsc();
    
    List<Country> findByNameContainingIgnoreCase(String name);
    
    List<Country> findByContinentContainingIgnoreCase(String continent);
    
    @Query("SELECT c FROM Country c WHERE c.population > :population ORDER BY c.population DESC")
    List<Country> findCountriesWithPopulationGreaterThan(@Param("population") Long population);

    @Query("SELECT DISTINCT c.continent FROM Country c ORDER BY c.continent")
    List<String> findAllDistinctContinents();
    
    @Query("SELECT c.continent, COUNT(c) FROM Country c GROUP BY c.continent ORDER BY COUNT(c) DESC")
    List<Object[]> countCountriesByContinent();
} 
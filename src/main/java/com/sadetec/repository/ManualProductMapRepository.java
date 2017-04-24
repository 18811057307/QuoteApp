package com.sadetec.repository;

import java.util.List;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.sadetec.model.ManualProductMap;
import com.sadetec.model.ManualProductMap_;

public interface ManualProductMapRepository extends JpaRepository<ManualProductMap, Integer> {

    default List<ManualProductMap> complete(String query, int maxResults) {
        ManualProductMap probe = new ManualProductMap();
        probe.setMiProductName(query);

        ExampleMatcher matcher = ExampleMatcher.matching() //
                .withMatcher(ManualProductMap_.miProductName.getName(), match -> match.ignoreCase().startsWith());

        Page<ManualProductMap> page = findAll(Example.of(probe, matcher), new PageRequest(0, maxResults));
        return page.getContent();
    }
    
    ManualProductMap findById(String atProductCode);
    
    List<ManualProductMap> findByMiProductCode(String miProductCode);
    
    List<ManualProductMap> findByMiProductCodeOrId(String miProductCode, String id);
    
    Page<ManualProductMap> findByMiProductCodeContainsOrIdContains(String miProductCode, String atProductCode, Pageable pageable);
    
    @Query(value="SELECT * FROM manual_product_map WHERE (AT_PRODUCT_CODE LIKE ?1% OR MI_PRODUCT_CODE like ?2%) and (AT_PRODUCT_CODE like '%①%' OR MI_PRODUCT_CODE like '%①%')", nativeQuery=true)
    List<ManualProductMap> findByIdOrMiProductCodeStartWith (String miProductCode, String atProductCode);
    
}
package com.sadetec.repository;

import java.util.List;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

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

}
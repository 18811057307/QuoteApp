package com.sadetec.repository;

import java.util.List;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sadetec.model.Product;
import com.sadetec.model.Product_;

public interface ProductRepository extends JpaRepository<Product, Integer> {

	Page<Product> findByProcFlagIsNull(Pageable page);
	
    default List<Product> complete(String query, int maxResults) {
        Product probe = new Product();
        probe.setProductName(query);

        ExampleMatcher matcher = ExampleMatcher.matching() //
                .withMatcher(Product_.productName.getName(), match -> match.ignoreCase().startsWith());

        Page<Product> page = findAll(Example.of(probe, matcher), new PageRequest(0, maxResults));
        return page.getContent();
    }
}
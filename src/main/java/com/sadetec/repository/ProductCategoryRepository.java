package com.sadetec.repository;

import java.util.List;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sadetec.model.ProductCategory;
import com.sadetec.model.ProductCategory_;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Integer> {

    default List<ProductCategory> complete(String query, int maxResults) {
        ProductCategory probe = new ProductCategory();
        probe.setCategoryName(query);

        ExampleMatcher matcher = ExampleMatcher.matching() //
                .withMatcher(ProductCategory_.categoryName.getName(), match -> match.ignoreCase().startsWith());

        Page<ProductCategory> page = findAll(Example.of(probe, matcher), new PageRequest(0, maxResults));
        return page.getContent();
    }
}
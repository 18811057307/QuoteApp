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
import org.springframework.transaction.annotation.Transactional;

import com.sadetec.model.Product;
import com.sadetec.model.Product_;

@Transactional
public interface ProductRepository extends JpaRepository<Product, Integer> {

	Page<Product> findByProcFlagIsNull(Pageable page);
	
	@Modifying(clearAutomatically = true)
    @Query(value="UPDATE product p SET p.proc_by = ?1 WHERE p.proc_by IS NULL AND p.proc_flag IS NULL ORDER BY p.product_code LIMIT 10", nativeQuery = true)
    int lockRows(String procBy);
	
	@Query("SELECT p FROM Product p WHERE p.procBy = ?1 AND p.procFlag IS NULL")
	List<Product> getLockedRows(String procBy);
	
	long countByProcByIsNullAndProcFlagIsNull();
	
    default List<Product> complete(String query, int maxResults) {
        Product probe = new Product();
        probe.setProductName(query);

        ExampleMatcher matcher = ExampleMatcher.matching() //
                .withMatcher(Product_.productName.getName(), match -> match.ignoreCase().startsWith());

        Page<Product> page = findAll(Example.of(probe, matcher), new PageRequest(0, maxResults));
        return page.getContent();
    }
}
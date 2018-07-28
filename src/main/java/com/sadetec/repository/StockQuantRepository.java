/*
 * Source code generated by Celerio, a Jaxio product.
 * Documentation: http://www.jaxio.com/documentation/celerio/
 * Follow us on twitter: @jaxiosoft
 * Need commercial support ? Contact us: info@jaxio.com
 * Template pack-angular:src/main/java/repository/EntityRepository.java.e.vm
 */
package com.sadetec.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sadetec.model.StockQuant;
import com.sadetec.model.StockQuant_;

public interface StockQuantRepository extends JpaRepository<StockQuant, Integer> {

	StockQuant findOneByLocationAndLot(String location, String lot);
	
	@Query(value="SELECT SUM(USE_QTY) FROM STOCK_QUANT WHERE PRODUCT_ID = ?1", nativeQuery = true)	
	BigDecimal findTotalUseQtyByProductId(String productId);

	@Query(value="SELECT STOCK_QUANT.* FROM SALES_ORDER LEFT JOIN STOCK_QUANT ON ( SALES_ORDER.PRODUCT_CODE = STOCK_QUANT.PRODUCT_ID OR SALES_ORDER.AT_PRODUCT_CODE = STOCK_QUANT.PRODUCT_ID) WHERE SALES_ORDER.FORM_INSTANCE_ID = ?1", nativeQuery = true)
	List<StockQuant> findByProductIdInSalesOrder(Integer formInstanceId);
	
    default List<StockQuant> complete(String query, int maxResults) {
        StockQuant probe = new StockQuant();
        probe.setProductId(query);

        ExampleMatcher matcher = ExampleMatcher.matching() //
                .withMatcher(StockQuant_.productId.getName(), match -> match.ignoreCase().startsWith());

        Page<StockQuant> page = findAll(Example.of(probe, matcher), new PageRequest(0, maxResults));
        return page.getContent();
    }
}
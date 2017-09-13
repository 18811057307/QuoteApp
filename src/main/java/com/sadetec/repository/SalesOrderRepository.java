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
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.sadetec.model.SalesOrder;
import com.sadetec.model.SalesOrder_;

@Transactional
public interface SalesOrderRepository extends JpaRepository<SalesOrder, Integer> {

	List<SalesOrder> findByFormInstanceId(Integer formInstanceId);
	
	@Modifying(clearAutomatically = true)
    @Query(value="DELETE FROM SALES_ORDER WHERE FORM_INSTANCE_ID = ?1", nativeQuery = true)
    int deleteRows(Integer formInstanceId);
	
    default List<SalesOrder> complete(String query, int maxResults) {
        SalesOrder probe = new SalesOrder();
        probe.setCategoryCode(query);

        ExampleMatcher matcher = ExampleMatcher.matching() //
                .withMatcher(SalesOrder_.categoryCode.getName(), match -> match.ignoreCase().startsWith());

        Page<SalesOrder> page = findAll(Example.of(probe, matcher), new PageRequest(0, maxResults));
        return page.getContent();
    }

    @Query(value="SELECT SUM(AMOUNT*UNIT_PRICE) FROM SALES_ORDER WHERE FORM_INSTANCE_ID = ?1", nativeQuery = true)
	BigDecimal calcTotalPrice(Integer formInstanceId);
}
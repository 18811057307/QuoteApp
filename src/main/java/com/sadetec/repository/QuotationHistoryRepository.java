package com.sadetec.repository;

import java.util.List;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.sadetec.model.QuotationHistory;
import com.sadetec.model.QuotationHistory_;

@Transactional
public interface QuotationHistoryRepository extends JpaRepository<QuotationHistory, String> {

	List<QuotationHistory> findByLoginNameAndProcFlag(String loginName, Boolean procFlag);
	
	List<QuotationHistory> findByLoginName(String loginName);
		
    @Modifying
    @Query(value="DELETE FROM quotation_history WHERE login_name = ?1", nativeQuery = true)
    int deleteByLoginName(String loginName);
		
    default List<QuotationHistory> complete(String query, int maxResults) {
        QuotationHistory probe = new QuotationHistory();
        probe.setAtProductName(query);

        ExampleMatcher matcher = ExampleMatcher.matching() //
                .withMatcher(QuotationHistory_.atProductName.getName(), match -> match.ignoreCase().startsWith());

        Page<QuotationHistory> page = findAll(Example.of(probe, matcher), new PageRequest(0, maxResults));
        return page.getContent();
    }
}
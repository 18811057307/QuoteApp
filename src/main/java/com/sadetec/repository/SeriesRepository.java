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
import com.sadetec.model.Series;
import com.sadetec.model.Series_;

@Transactional
public interface SeriesRepository extends JpaRepository<Series, String> {

	Page<Series> findByProcFlagIsNull(Pageable page);
	
	long countByProcByIsNullAndProcFlagIsNull();
	
	@Modifying(clearAutomatically = true)
    @Query(value="UPDATE series s SET s.proc_by = ?1 WHERE s.proc_by IS NULL AND s.proc_flag IS NULL ORDER BY s.series_code LIMIT 10", nativeQuery = true)
    int lockRows(String procBy);
	
	@Query("SELECT s FROM Series s WHERE s.procBy = ?1 AND s.procFlag IS NULL")
	List<Series> getLockedRows(String procBy);
	
    default List<Series> complete(String query, int maxResults) {
        Series probe = new Series();
        probe.setSeriesName(query);

        ExampleMatcher matcher = ExampleMatcher.matching() //
                .withMatcher(Series_.seriesName.getName(), match -> match.ignoreCase().startsWith());

        Page<Series> page = findAll(Example.of(probe, matcher), new PageRequest(0, maxResults));
        return page.getContent();
    }
}
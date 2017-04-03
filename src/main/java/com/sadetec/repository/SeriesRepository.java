package com.sadetec.repository;

import java.util.List;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sadetec.model.Series;
import com.sadetec.model.Series_;

public interface SeriesRepository extends JpaRepository<Series, String> {

	Page<Series> findByProcFlagIsNull(Pageable page);
	
    default List<Series> complete(String query, int maxResults) {
        Series probe = new Series();
        probe.setSeriesName(query);

        ExampleMatcher matcher = ExampleMatcher.matching() //
                .withMatcher(Series_.seriesName.getName(), match -> match.ignoreCase().startsWith());

        Page<Series> page = findAll(Example.of(probe, matcher), new PageRequest(0, maxResults));
        return page.getContent();
    }
}
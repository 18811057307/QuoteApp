/*
 * Source code generated by Celerio, a Jaxio product.
 * Documentation: http://www.jaxio.com/documentation/celerio/
 * Follow us on twitter: @jaxiosoft
 * Need commercial support ? Contact us: info@jaxio.com
 * Template pack-angular:src/main/java/repository/EntityRepository.java.e.vm
 */
package com.sadetec.repository;

import java.util.List;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sadetec.model.SeriesSpec;
import com.sadetec.model.SeriesSpec_;

public interface SeriesSpecRepository extends JpaRepository<SeriesSpec, Integer> {

    default List<SeriesSpec> complete(String query, int maxResults) {
        SeriesSpec probe = new SeriesSpec();
        probe.setTitle(query);

        ExampleMatcher matcher = ExampleMatcher.matching() //
                .withMatcher(SeriesSpec_.title.getName(), match -> match.ignoreCase().startsWith());

        Page<SeriesSpec> page = findAll(Example.of(probe, matcher), new PageRequest(0, maxResults));
        return page.getContent();
    }

	Page<SeriesSpec> findBySeriesCode(String seriesCode, Pageable pageReq);
}
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
import org.springframework.data.jpa.repository.JpaRepository;

import com.sadetec.model.SysCompany;
import com.sadetec.model.SysCompany_;

public interface SysCompanyRepository extends JpaRepository<SysCompany, Integer> {

	List<SysCompany> findByParentId(Integer parentId);
	
    default List<SysCompany> complete(String query, int maxResults) {
        SysCompany probe = new SysCompany();
        probe.setName(query);

        ExampleMatcher matcher = ExampleMatcher.matching() //
                .withMatcher(SysCompany_.name.getName(), match -> match.ignoreCase().startsWith());

        Page<SysCompany> page = findAll(Example.of(probe, matcher), new PageRequest(0, maxResults));
        return page.getContent();
    }
}
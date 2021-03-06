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

import com.sadetec.model.SysUserRole;
import com.sadetec.model.SysUserRolePk;

public interface SysUserRoleRepository extends JpaRepository<SysUserRole, SysUserRolePk> {

    default List<SysUserRole> complete(String query, int maxResults) {
        SysUserRole probe = new SysUserRole();

        ExampleMatcher matcher = ExampleMatcher.matching() //
        ;

        Page<SysUserRole> page = findAll(Example.of(probe, matcher), new PageRequest(0, maxResults));
        return page.getContent();
    }
}
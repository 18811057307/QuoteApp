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
import org.springframework.data.jpa.repository.Query;

import com.sadetec.model.SysRole;
import com.sadetec.model.SysRole_;

public interface SysRoleRepository extends JpaRepository<SysRole, Integer> {

    /**
     * Return the persistent instance of {@link SysRole} with the given unique property value name,
     * or null if there is no such persistent instance.
     *
     * @param name the unique value
     * @return the corresponding {@link SysRole} persistent instance or null
     */
    SysRole getByName(String name);

    Page<SysRole> findByNameContains(String name, Pageable pageable);
    
    @Query("select r from SysRole r where r.id in (select ur.id.roleId from SysUserRole ur where ur.id.userId = ?1)")
    List<SysRole> findByUserId(Integer userId);
    
    @Query("select r.name from SysRole r where r.id in (select ur.id.roleId from SysUserRole ur where ur.id.userId in (select su.id from SysUser su where su.loginName = ?1))")
    List<String> findUserRoles(String loginName);
    
    default List<SysRole> complete(String query, int maxResults) {
        SysRole probe = new SysRole();
        probe.setName(query);

        ExampleMatcher matcher = ExampleMatcher.matching() //
                .withMatcher(SysRole_.name.getName(), match -> match.ignoreCase().startsWith());

        Page<SysRole> page = findAll(Example.of(probe, matcher), new PageRequest(0, maxResults));
        return page.getContent();
    }
}
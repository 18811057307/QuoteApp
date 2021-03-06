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

import com.sadetec.model.ManualProductMap;
import com.sadetec.model.SysRole;
import com.sadetec.model.SysUser;
import com.sadetec.model.SysUser_;

public interface SysUserRepository extends JpaRepository<SysUser, Integer> {

    /**
     * Return the persistent instance of {@link SysUser} with the given unique property value loginName,
     * or null if there is no such persistent instance.
     *
     * @param loginName the unique value
     * @return the corresponding {@link SysUser} persistent instance or null
     */
    SysUser getByLoginName(String loginName);
    
    List<SysUser> findByCompanyIdOrderBySequence(Integer companyId);
    
    Long countByCompanyId(Integer companyId);

    default List<SysUser> complete(String query, int maxResults) {
        SysUser probe = new SysUser();
        probe.setLoginName(query);

        ExampleMatcher matcher = ExampleMatcher.matching() //
                .withMatcher(SysUser_.loginName.getName(), match -> match.ignoreCase().startsWith());

        Page<SysUser> page = findAll(Example.of(probe, matcher), new PageRequest(0, maxResults));
        return page.getContent();
    }
    
    Page<SysUser> findByLoginNameContainsOrNameContains(String loginName, String name, Pageable pageable);
    
    List<SysUser> findByNameContains(String name);
    
    @Query("select su from SysUser su where su.id in (select ur.id.userId from SysUserRole ur where ur.id.roleId in (select sr.id from SysRole sr where sr.name = ?1))")
    List<SysUser> findByRoleName(String roleName);

    @Query("select su from SysUser su where su.companyId = ?1 and su.id in (select ur.id.userId from SysUserRole ur where ur.id.roleId in (select sr.id from SysRole sr where sr.name = ?2)) order by su.sequence")
	List<SysUser> findByCompanyIdAndRoleCodeOrderBySequence(Integer companyId, String roleCode);
}
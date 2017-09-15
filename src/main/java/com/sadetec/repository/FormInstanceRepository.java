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
import org.springframework.data.jpa.repository.Query;

import com.sadetec.model.FormInstance;
import com.sadetec.model.FormInstance_;
import com.sadetec.model.ManualProductMap;

public interface FormInstanceRepository extends JpaRepository<FormInstance, Integer> {

	List<FormInstance> findByDrafterIdAndProcessInstanceId(String deafterId, String processInstanceId);
	
	List<FormInstance> findByDrafterIdAndProcessInstanceIdNot(String deafterId,String processInstanceId);
	
	FormInstance findOneByProcessInstanceId(String processInstanceId);
	
    default List<FormInstance> complete(String query, int maxResults) {
        FormInstance probe = new FormInstance();
        probe.setTitle(query);

        ExampleMatcher matcher = ExampleMatcher.matching() //
                .withMatcher(FormInstance_.title.getName(), match -> match.ignoreCase().startsWith());

        Page<FormInstance> page = findAll(Example.of(probe, matcher), new PageRequest(0, maxResults));
        return page.getContent();
    }
    
    @Query(value="SELECT * FROM FORM_INSTANCE WHERE PROCESS_INSTANCE_ID IN (SELECT DISTINCT(PROC_INST_ID_) FROM ACT_HI_TASKINST WHERE END_TIME_ IS NOT NULL AND ASSIGNEE_ = ?1) ORDER BY LAST_MODIFIED DESC", nativeQuery=true)
    List<FormInstance> findCompleteFormInstanceByAssignee (String assignee);
    
}
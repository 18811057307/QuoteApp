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
	
	@Query(value="SELECT * FROM FORM_INSTANCE WHERE PROCESS_INSTANCE_ID != '' AND TITLE LIKE '%?1%'", nativeQuery=true)	
	List<FormInstance> findByTitleContains(String title);
	
	@Query(value="SELECT * FROM FORM_INSTANCE WHERE PROCESS_INSTANCE_ID != '' AND (DRAFTER_ID = ?1 OR DRAFTER = ?1) ORDER BY CREATE_DATE DESC", nativeQuery=true)    
	List<FormInstance> findByDrafter(String deafter);
	
	@Query(value="SELECT * FROM FORM_INSTANCE WHERE PROCESS_INSTANCE_ID != '' AND (DRAFTER_ID IN (SELECT ID FROM SYS_USER WHERE COMPANY_ID = ?1) OR DRAFTER IN (SELECT ID FROM SYS_USER WHERE COMPANY_ID = ?1)) ORDER BY CREATE_DATE DESC", nativeQuery=true)
	List<FormInstance> findByCompanyId(Integer companyId);
	
	List<FormInstance> findByProcessDefinitionId(String processDefinitionId);
	
	@Query(value="SELECT COUNT(*) FROM FORM_INSTANCE WHERE PROCESS_INSTANCE_ID != '' AND (DRAFTER_ID = ?1 OR DRAFTER = ?1)", nativeQuery=true)
	Long countByDrafterId(String deafterId);
	
	@Query(value="SELECT COUNT(*) FROM FORM_INSTANCE WHERE PROCESS_INSTANCE_ID != '' AND (DRAFTER_ID IN (SELECT ID FROM SYS_USER WHERE COMPANY_ID = ?1) OR DRAFTER IN (SELECT ID FROM SYS_USER WHERE COMPANY_ID = ?1))", nativeQuery=true)
	Long countByCompanyId(Integer companyId);
	
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
    
    @Query(value="SELECT COUNT(*) FROM FORM_INSTANCE WHERE PROCESS_INSTANCE_ID IN (SELECT DISTINCT(PROC_INST_ID_) FROM ACT_HI_TASKINST WHERE END_TIME_ IS NOT NULL AND ASSIGNEE_ = ?1) ORDER BY LAST_MODIFIED DESC", nativeQuery=true)
    Long countCompleteFormInstanceByAssignee (String assignee);
    
}
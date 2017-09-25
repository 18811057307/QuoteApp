package com.sadetec.repository;

import java.util.List;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sadetec.model.Category;
import com.sadetec.model.Category_;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
	
	/**
	 * 按层级分类
	 */
	List<Category> findByCategoryLevel(Integer categoryLevel);
	
	/**
	 * 获取名称包含{categoryName}层级
	 * @param categoryName
	 * @param categoryLevel
	 * @return
	 */
	List<Category> findByCategoryNameContainsAndCategoryLevel(String categoryName, Integer categoryLevel);
	
	/**
	 * 获取{parentCode}的下级分类
	 */
	List<Category> findByParentCode(String parentCode);
	
	List<Category> findByHasChildCategoryAndProcFlag(Boolean hasChild, Boolean procFlag);
	
	List<Category> findByHasChildCategoryAndProcByIsNull(Boolean hasChild);
	
	Category findById(String categoryCode);
	
	Category getByCategoryName(String categoryName);
	
    default List<Category> complete(String query, int maxResults) {
        Category probe = new Category();
        probe.setCategoryName(query);

        ExampleMatcher matcher = ExampleMatcher.matching() //
                .withMatcher(Category_.categoryName.getName(), match -> match.ignoreCase().startsWith());

        Page<Category> page = findAll(Example.of(probe, matcher), new PageRequest(0, maxResults));
        return page.getContent();
    }

	Long countByParentCode(String id);
}
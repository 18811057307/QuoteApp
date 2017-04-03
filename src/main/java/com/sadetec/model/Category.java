/*
 * Source code generated by Celerio, a Jaxio product.
 * Documentation: http://www.jaxio.com/documentation/celerio/
 * Follow us on twitter: @jaxiosoft
 * Need commercial support ? Contact us: info@jaxio.com
 * Template pack-angular:src/main/java/domain/Entity.java.e.vm
 */
package com.sadetec.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.logging.Logger;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;
import org.hibernate.validator.constraints.URL;

import com.google.common.base.MoreObjects;
import com.google.common.base.Objects;

@Entity
@Table(name = "category")
public class Category implements Serializable {
    private static final long serialVersionUID = 1L;
    private static final Logger log = Logger.getLogger(Category.class.getName());

    // Raw attributes
    private String id;
    private String categoryName;
    private String categoryUrl;
    private Integer categoryLevel;
    private String parentCode;
    private Boolean hasChildCategory;
    private String procBy;
    private Boolean procFlag;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;

    public String entityClassName() {
        return Category.class.getSimpleName();
    }

    // -- [id] ------------------------

    @NotEmpty
    @Size(max = 128)
    @Column(name = "category_code", length = 128)
    @Id
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Category id(String id) {
        setId(id);
        return this;
    }

    @Transient
    public boolean isIdSet() {
        return id != null && !id.isEmpty();
    }
    // -- [categoryName] ------------------------

    @NotEmpty
    @Size(max = 256)
    @Column(name = "category_name", nullable = false, length = 256)
    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Category categoryName(String categoryName) {
        setCategoryName(categoryName);
        return this;
    }
    // -- [categoryUrl] ------------------------

    @Size(max = 512)
    @URL
    @Column(name = "category_url", length = 512)
    public String getCategoryUrl() {
        return categoryUrl;
    }

    public void setCategoryUrl(String categoryUrl) {
        this.categoryUrl = categoryUrl;
    }

    public Category categoryUrl(String categoryUrl) {
        setCategoryUrl(categoryUrl);
        return this;
    }
    // -- [categoryLevel] ------------------------

    @Digits(integer = 10, fraction = 0)
    @Column(name = "category_level", precision = 10)
    public Integer getCategoryLevel() {
        return categoryLevel;
    }

    public void setCategoryLevel(Integer categoryLevel) {
        this.categoryLevel = categoryLevel;
    }

    public Category categoryLevel(Integer categoryLevel) {
        setCategoryLevel(categoryLevel);
        return this;
    }
    // -- [parentCode] ------------------------

    @Size(max = 256)
    @Column(name = "parent_code", length = 256)
    public String getParentCode() {
        return parentCode;
    }

    public void setParentCode(String parentCode) {
        this.parentCode = parentCode;
    }

    public Category parentCode(String parentCode) {
        setParentCode(parentCode);
        return this;
    }
    // -- [hasChildCategory] ------------------------

    @Column(name = "has_child_category", length = 0)
    public Boolean getHasChildCategory() {
        return hasChildCategory;
    }

    public void setHasChildCategory(Boolean hasChildCategory) {
        this.hasChildCategory = hasChildCategory;
    }

    public Category hasChildCategory(Boolean hasChildCategory) {
        setHasChildCategory(hasChildCategory);
        return this;
    }
    // -- [procBy] ------------------------

    /**
     * 多处理线程时每个线程标识
     */
    @Size(max = 255)
    @Column(name = "proc_by")
    public String getProcBy() {
        return procBy;
    }

    public void setProcBy(String procBy) {
        this.procBy = procBy;
    }

    public Category procBy(String procBy) {
        setProcBy(procBy);
        return this;
    }
    // -- [procFlag] ------------------------

    /**
     * 处理标记 1：已完成 0：未完成
     */
    @Column(name = "proc_flag", length = 0)
    public Boolean getProcFlag() {
        return procFlag;
    }

    public void setProcFlag(Boolean procFlag) {
        this.procFlag = procFlag;
    }

    public Category procFlag(Boolean procFlag) {
        setProcFlag(procFlag);
        return this;
    }
    // -- [createDate] ------------------------

    /**
     * 创建时间
     */
    @Column(name = "create_date", length = 19)
    public LocalDateTime getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDateTime createDate) {
        this.createDate = createDate;
    }

    public Category createDate(LocalDateTime createDate) {
        setCreateDate(createDate);
        return this;
    }
    // -- [updateDate] ------------------------

    /**
     * 更新时间
     */
    @Column(name = "update_date", length = 19)
    public LocalDateTime getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(LocalDateTime updateDate) {
        this.updateDate = updateDate;
    }

    public Category updateDate(LocalDateTime updateDate) {
        setUpdateDate(updateDate);
        return this;
    }

    /**
     * Apply the default values.
     */
    public Category withDefaults() {
        return this;
    }

    /**
     * Equals implementation using a business key.
     */
    @Override
    public boolean equals(Object other) {
        return this == other || (other instanceof Category && hashCode() == other.hashCode());
    }

    /**
     * Construct a readable string representation for this Category instance.
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this) //
                .add("id", getId()) //
                .add("categoryName", getCategoryName()) //
                .add("categoryUrl", getCategoryUrl()) //
                .add("categoryLevel", getCategoryLevel()) //
                .add("parentCode", getParentCode()) //
                .add("hasChildCategory", getHasChildCategory()) //
                .add("procBy", getProcBy()) //
                .add("procFlag", getProcFlag()) //
                .add("createDate", getCreateDate()) //
                .add("updateDate", getUpdateDate()) //
                .toString();
    }
}
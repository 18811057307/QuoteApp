package com.sadetec.model;

import static javax.persistence.GenerationType.IDENTITY;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.logging.Logger;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;
import org.hibernate.validator.constraints.URL;

import com.google.common.base.MoreObjects;

@Entity
@Table(name = "product_category")
public class ProductCategory implements Serializable {
    private static final long serialVersionUID = 1L;
    private static final Logger log = Logger.getLogger(ProductCategory.class.getName());

    // Raw attributes
    private Integer id;
    private String categoryName;
    private String categoryCode;
    private String categoryUrl;
    private String childCategoryName;
    private String childCategoryCode;
    private String childCategoryUrl;
    private String grandCategoryName;
    private String grandCategoryUrl;
    private LocalDateTime dateAdded;

    public String entityClassName() {
        return ProductCategory.class.getSimpleName();
    }

    // -- [id] ------------------------

    @Column(name = "id", precision = 10)
    @GeneratedValue(strategy = IDENTITY)
    @Id
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ProductCategory id(Integer id) {
        setId(id);
        return this;
    }

    @Transient
    public boolean isIdSet() {
        return id != null;
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

    public ProductCategory categoryName(String categoryName) {
        setCategoryName(categoryName);
        return this;
    }
    // -- [categoryCode] ------------------------

    @NotEmpty
    @Size(max = 256)
    @Column(name = "category_code", nullable = false, length = 256)
    public String getCategoryCode() {
        return categoryCode;
    }

    public void setCategoryCode(String categoryCode) {
        this.categoryCode = categoryCode;
    }

    public ProductCategory categoryCode(String categoryCode) {
        setCategoryCode(categoryCode);
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

    public ProductCategory categoryUrl(String categoryUrl) {
        setCategoryUrl(categoryUrl);
        return this;
    }
    // -- [childCategoryName] ------------------------

    @Size(max = 256)
    @Column(name = "child_category_name", length = 256)
    public String getChildCategoryName() {
        return childCategoryName;
    }

    public void setChildCategoryName(String childCategoryName) {
        this.childCategoryName = childCategoryName;
    }

    public ProductCategory childCategoryName(String childCategoryName) {
        setChildCategoryName(childCategoryName);
        return this;
    }
    // -- [childCategoryCode] ------------------------

    @Size(max = 256)
    @Column(name = "child_category_code", length = 256)
    public String getChildCategoryCode() {
        return childCategoryCode;
    }

    public void setChildCategoryCode(String childCategoryCode) {
        this.childCategoryCode = childCategoryCode;
    }

    public ProductCategory childCategoryCode(String childCategoryCode) {
        setChildCategoryCode(childCategoryCode);
        return this;
    }
    // -- [childCategoryUrl] ------------------------

    @Size(max = 512)
    @URL
    @Column(name = "child_category_url", length = 512)
    public String getChildCategoryUrl() {
        return childCategoryUrl;
    }

    public void setChildCategoryUrl(String childCategoryUrl) {
        this.childCategoryUrl = childCategoryUrl;
    }

    public ProductCategory childCategoryUrl(String childCategoryUrl) {
        setChildCategoryUrl(childCategoryUrl);
        return this;
    }
    // -- [grandCategoryName] ------------------------

    @Size(max = 256)
    @Column(name = "grand_category_name", length = 256)
    public String getGrandCategoryName() {
        return grandCategoryName;
    }

    public void setGrandCategoryName(String grandCategoryName) {
        this.grandCategoryName = grandCategoryName;
    }

    public ProductCategory grandCategoryName(String grandCategoryName) {
        setGrandCategoryName(grandCategoryName);
        return this;
    }
    // -- [grandCategoryUrl] ------------------------

    @Size(max = 512)
    @URL
    @Column(name = "grand_category_url", length = 512)
    public String getGrandCategoryUrl() {
        return grandCategoryUrl;
    }

    public void setGrandCategoryUrl(String grandCategoryUrl) {
        this.grandCategoryUrl = grandCategoryUrl;
    }

    public ProductCategory grandCategoryUrl(String grandCategoryUrl) {
        setGrandCategoryUrl(grandCategoryUrl);
        return this;
    }
    // -- [dateAdded] ------------------------

    @Column(name = "date_added", length = 19)
    public LocalDateTime getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(LocalDateTime dateAdded) {
        this.dateAdded = dateAdded;
    }

    public ProductCategory dateAdded(LocalDateTime dateAdded) {
        setDateAdded(dateAdded);
        return this;
    }

    /**
     * Apply the default values.
     */
    public ProductCategory withDefaults() {
        return this;
    }

    /**
     * Equals implementation using a business key.
     */
    @Override
    public boolean equals(Object other) {
        return this == other || (other instanceof ProductCategory && hashCode() == other.hashCode());
    }

    /**
     * Construct a readable string representation for this ProductCategory instance.
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this) //
                .add("id", getId()) //
                .add("categoryName", getCategoryName()) //
                .add("categoryCode", getCategoryCode()) //
                .add("categoryUrl", getCategoryUrl()) //
                .add("childCategoryName", getChildCategoryName()) //
                .add("childCategoryCode", getChildCategoryCode()) //
                .add("childCategoryUrl", getChildCategoryUrl()) //
                .add("grandCategoryName", getGrandCategoryName()) //
                .add("grandCategoryUrl", getGrandCategoryUrl()) //
                .add("dateAdded", getDateAdded()) //
                .toString();
    }
}
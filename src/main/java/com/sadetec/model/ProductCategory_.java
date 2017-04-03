package com.sadetec.model;

import java.time.LocalDateTime;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(ProductCategory.class)
public abstract class ProductCategory_ {

    // Raw attributes
    public static volatile SingularAttribute<ProductCategory, Integer> id;
    public static volatile SingularAttribute<ProductCategory, String> categoryName;
    public static volatile SingularAttribute<ProductCategory, String> categoryCode;
    public static volatile SingularAttribute<ProductCategory, String> categoryUrl;
    public static volatile SingularAttribute<ProductCategory, String> childCategoryName;
    public static volatile SingularAttribute<ProductCategory, String> childCategoryCode;
    public static volatile SingularAttribute<ProductCategory, String> childCategoryUrl;
    public static volatile SingularAttribute<ProductCategory, String> grandCategoryName;
    public static volatile SingularAttribute<ProductCategory, String> grandCategoryUrl;
    public static volatile SingularAttribute<ProductCategory, LocalDateTime> dateAdded;
}
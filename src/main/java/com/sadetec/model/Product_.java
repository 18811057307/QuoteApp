/*
 * Source code generated by Celerio, a Jaxio product.
 * Documentation: http://www.jaxio.com/documentation/celerio/
 * Follow us on twitter: @jaxiosoft
 * Need commercial support ? Contact us: info@jaxio.com
 * Template pack-angular:src/main/java/domain/EntityMeta_.java.e.vm
 */
package com.sadetec.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(Product.class)
public abstract class Product_ {

    // Raw attributes
    public static volatile SingularAttribute<Product, String> id;
    public static volatile SingularAttribute<Product, String> productName;
    public static volatile SingularAttribute<Product, String> productUrl;
    public static volatile SingularAttribute<Product, String> productSpec;
    public static volatile SingularAttribute<Product, String> typeCode;
    public static volatile SingularAttribute<Product, String> typeName;
    public static volatile SingularAttribute<Product, String> brdName;
    public static volatile SingularAttribute<Product, String> brdCode;
    public static volatile SingularAttribute<Product, String> seriesCode;
    public static volatile SingularAttribute<Product, BigDecimal> unitPrice;
    public static volatile SingularAttribute<Product, String> procBy;
    public static volatile SingularAttribute<Product, Boolean> procFlag;
    public static volatile SingularAttribute<Product, LocalDateTime> createDate;
    public static volatile SingularAttribute<Product, LocalDateTime> updateDate;
}
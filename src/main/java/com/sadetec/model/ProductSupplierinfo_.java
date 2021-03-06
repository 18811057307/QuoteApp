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

@StaticMetamodel(ProductSupplierinfo.class)
public abstract class ProductSupplierinfo_ {

    // Raw attributes
    public static volatile SingularAttribute<ProductSupplierinfo, Integer> id;
    public static volatile SingularAttribute<ProductSupplierinfo, String> createUid;
    public static volatile SingularAttribute<ProductSupplierinfo, LocalDateTime> createDate;
    public static volatile SingularAttribute<ProductSupplierinfo, Integer> delay;
    public static volatile SingularAttribute<ProductSupplierinfo, Integer> sequence;
    public static volatile SingularAttribute<ProductSupplierinfo, LocalDateTime> dateStart;
    public static volatile SingularAttribute<ProductSupplierinfo, LocalDateTime> dateEnd;
    public static volatile SingularAttribute<ProductSupplierinfo, Integer> companyId;
    public static volatile SingularAttribute<ProductSupplierinfo, String> companyName;
    public static volatile SingularAttribute<ProductSupplierinfo, String> productName;
    public static volatile SingularAttribute<ProductSupplierinfo, String> productCode;
    public static volatile SingularAttribute<ProductSupplierinfo, BigDecimal> minQty;
    public static volatile SingularAttribute<ProductSupplierinfo, BigDecimal> price;
    public static volatile SingularAttribute<ProductSupplierinfo, String> productId;
}
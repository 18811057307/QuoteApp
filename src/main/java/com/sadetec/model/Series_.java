/*
 * Source code generated by Celerio, a Jaxio product.
 * Documentation: http://www.jaxio.com/documentation/celerio/
 * Follow us on twitter: @jaxiosoft
 * Need commercial support ? Contact us: info@jaxio.com
 * Template pack-angular:src/main/java/domain/EntityMeta_.java.e.vm
 */
package com.sadetec.model;

import java.time.LocalDateTime;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(Series.class)
public abstract class Series_ {

    // Raw attributes
    public static volatile SingularAttribute<Series, String> id;
    public static volatile SingularAttribute<Series, String> seriesName;
    public static volatile SingularAttribute<Series, String> seriesUrl;
    public static volatile SingularAttribute<Series, String> brdName;
    public static volatile SingularAttribute<Series, String> brdCode;
    public static volatile SingularAttribute<Series, String> categoryCode;
    public static volatile SingularAttribute<Series, String> procBy;
    public static volatile SingularAttribute<Series, Boolean> procFlag;
    public static volatile SingularAttribute<Series, LocalDateTime> createDate;
    public static volatile SingularAttribute<Series, LocalDateTime> updateDate;
}
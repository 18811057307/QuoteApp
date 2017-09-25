/*
 * Source code generated by Celerio, a Jaxio product.
 * Documentation: http://www.jaxio.com/documentation/celerio/
 * Follow us on twitter: @jaxiosoft
 * Need commercial support ? Contact us: info@jaxio.com
 * Template pack-angular:src/main/java/domain/Entity.java.e.vm
 */
package com.sadetec.model;

import static javax.persistence.GenerationType.IDENTITY;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.logging.Logger;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

import com.google.common.base.MoreObjects;

@Entity
public class SalesOrderWithStock implements Serializable {
    private static final long serialVersionUID = 1L;
    private static final Logger log = Logger.getLogger(SalesOrderWithStock.class.getName());

 // Raw attributes
    private Integer id;
    private String brand;
    private String categoryName;
    private String productCode;
    private String atProductCode;
	private Integer amount;
    private String unit;
    private BigDecimal unitPrice;
    private BigDecimal useQty;
    
    public String entityClassName() {
        return SalesOrderWithStock.class.getSimpleName();
    }
    
    //{爱安特, 直线轴承, LM-8s-C, null, 100, 个, 30.6900, 100.0000}
    public SalesOrderWithStock(String brand, String categoryName, String productCode, String atProductCode, Integer amount, String unit, BigDecimal unitPrice, BigDecimal useQty) {
		this.brand = brand;
		this.categoryName = categoryName;
		this.productCode = productCode;
		this.atProductCode = atProductCode;
		this.amount = amount;
		this.unit = unit;
		this.unitPrice = unitPrice;
		this.useQty = useQty;
		
	}

    @Id
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    
    // -- [categoryName] ------------------------

    @Size(max = 256)
    @Column(name = "category_name", length = 256)
    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public SalesOrderWithStock categoryName(String categoryName) {
        setCategoryName(categoryName);
        return this;
    }

    // -- [productCode] ------------------------

    @Size(max = 256)
    @Column(name = "product_code", length = 256)
    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public SalesOrderWithStock productCode(String productCode) {
        setProductCode(productCode);
        return this;
    }

    @Digits(integer = 11, fraction = 4)
    @Column(name = "unit_price", precision = 15, scale = 4)
    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }
    
    @Size(max = 64)
    @Column(name = "unit", length = 64)
    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    // -- [amount] ------------------------

    @Digits(integer = 10, fraction = 0)
    @Column(name = "amount", precision = 10)
    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public SalesOrderWithStock amount(Integer amount) {
        setAmount(amount);
        return this;
    }
    

    @Size(max = 256)
    @Column(name = "at_product_code", length = 256)
    public String getAtProductCode() {
        return atProductCode;
    }

    public void setAtProductCode(String atProductCode) {
        this.atProductCode = atProductCode;
    }

    public SalesOrderWithStock atProductCode(String atProductCode) {
        setAtProductCode(atProductCode);
        return this;
    }
    // -- [brand] ------------------------

    /**
     * 品牌
     */
    @Size(max = 256)
    @Column(name = "brand", length = 256)
    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public SalesOrderWithStock brand(String brand) {
        setBrand(brand);
        return this;
    }

    @Digits(integer = 11, fraction = 4)
    @Column(name = "use_qty", precision = 15, scale = 4)
	public BigDecimal getUseQty() {
		return useQty;
	}

	public void setUseQty(BigDecimal useQty) {
		this.useQty = useQty;
	}

	/**
     * Apply the default values.
     */
    public SalesOrderWithStock withDefaults() {
        return this;
    }

    /**
     * Equals implementation using a business key.
     */
    @Override
    public boolean equals(Object other) {
        return this == other || (other instanceof SalesOrderWithStock && hashCode() == other.hashCode());
    }


    /**
     * Construct a readable string representation for this SalesOrder instance.
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this) //
                .add("categoryName", getCategoryName()) //
                .add("productCode", getProductCode()) //
                .add("amount", getAmount()) //
                .toString();
    }
}
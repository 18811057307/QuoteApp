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
@Table(name = "sales_order")
public class SalesOrder implements Serializable {
    private static final long serialVersionUID = 1L;
    private static final Logger log = Logger.getLogger(SalesOrder.class.getName());

 // Raw attributes
    private Integer id;
    private Integer formInstanceId;
    private String categoryCode;
    private String categoryName;
    private String seriesCode;
    private String seriesName;
    private String productCode;
    private String productName;
    private String processType;
    
	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(style = "S-")
    private Date deliveryDate;
	
	//货期-天数
	private Integer deliveryTime;
    
	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(style = "S-")
    private Date validDate;
	
	private Integer amount;
	private Integer stockAmount;
    private String unit;
    private BigDecimal costPrice;
    private BigDecimal factoryPrice;
    private BigDecimal unitPrice;
    private String quoterId;
    private String quoterName;
    private String auditorId;
    private String auditorName;
    private String drawingUrl;
    private String atProductCode;
    private String brand;
    private String supplierName;
    private Boolean needProc;
    private String comment;

    public String entityClassName() {
        return SalesOrder.class.getSimpleName();
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

    public SalesOrder id(Integer id) {
        setId(id);
        return this;
    }

    @Transient
    public boolean isIdSet() {
        return id != null;
    }
    // -- [formInstanceId] ------------------------

    @Digits(integer = 10, fraction = 0)
    @NotNull
    @Column(name = "form_instance_id", nullable = false, precision = 10)
    public Integer getFormInstanceId() {
        return formInstanceId;
    }

    public void setFormInstanceId(Integer formInstanceId) {
        this.formInstanceId = formInstanceId;
    }

    public SalesOrder formInstanceId(Integer formInstanceId) {
        setFormInstanceId(formInstanceId);
        return this;
    }
    // -- [categoryCode] ------------------------

    @Size(max = 256)
    @Column(name = "category_code", length = 256)
    public String getCategoryCode() {
        return categoryCode;
    }

    public void setCategoryCode(String categoryCode) {
        this.categoryCode = categoryCode;
    }

    public SalesOrder categoryCode(String categoryCode) {
        setCategoryCode(categoryCode);
        return this;
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

    public SalesOrder categoryName(String categoryName) {
        setCategoryName(categoryName);
        return this;
    }
    // -- [seriesCode] ------------------------

    @Size(max = 256)
    @Column(name = "series_code", length = 256)
    public String getSeriesCode() {
        return seriesCode;
    }

    public void setSeriesCode(String seriesCode) {
        this.seriesCode = seriesCode;
    }

    public SalesOrder seriesCode(String seriesCode) {
        setSeriesCode(seriesCode);
        return this;
    }
    // -- [seriesName] ------------------------

    @Size(max = 256)
    @Column(name = "series_name", length = 256)
    public String getSeriesName() {
        return seriesName;
    }

    public void setSeriesName(String seriesName) {
        this.seriesName = seriesName;
    }

    public SalesOrder seriesName(String seriesName) {
        setSeriesName(seriesName);
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

    public SalesOrder productCode(String productCode) {
        setProductCode(productCode);
        return this;
    }
    // -- [productName] ------------------------

    @Size(max = 256)
    @Column(name = "product_name", length = 256)
    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public SalesOrder productName(String productName) {
        setProductName(productName);
        return this;
    }
    // -- [processType] ------------------------

    @Size(max = 256)
    @Column(name = "process_type", length = 256)
    public String getProcessType() {
        return processType;
    }

    public void setProcessType(String processType) {
        this.processType = processType;
    }

    public SalesOrder processType(String processType) {
        setProcessType(processType);
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
    // -- [deliveryDate] ------------------------

    @Column(name = "delivery_date", length = 19)
    public Date getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(Date deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public SalesOrder deliveryDate(Date deliveryDate) {
        setDeliveryDate(deliveryDate);
        return this;
    }
    
    @Column(name = "valid_date", length = 19)
    public Date getValidDate() {
		return validDate;
	}

	public void setValidDate(Date validDate) {
		this.validDate = validDate;
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

    public SalesOrder amount(Integer amount) {
        setAmount(amount);
        return this;
    }
    
	@Digits(integer = 10, fraction = 0)
    @Column(name = "stock_amount", precision = 10)
    public Integer getStockAmount() {
        return stockAmount;
    }

    public void setStockAmount(Integer stockAmount) {
        this.stockAmount = stockAmount;
    }
    
	@Digits(integer = 10, fraction = 0)
    @Column(name = "delivery_time", precision = 10)
    public Integer getDeliveryTime() {
        return deliveryTime;
    }

    public void setDeliveryTime(Integer deliveryTime) {
        this.deliveryTime = deliveryTime;
    }
    
    // -- [quoterId] ------------------------

    /**
     * 办理人
     */
    @Size(max = 64)
    @Column(name = "quoter_id", length = 64)
    public String getQuoterId() {
        return quoterId;
    }

    public void setQuoterId(String quoterId) {
        this.quoterId = quoterId;
    }

    public SalesOrder quoterId(String quoterId) {
        setQuoterId(quoterId);
        return this;
    }
    // -- [quoterName] ------------------------

    /**
     * 办理人
     */
    @Size(max = 64)
    @Column(name = "quoter_name", length = 64)
    public String getQuoterName() {
        return quoterName;
    }

    public void setQuoterName(String quoterName) {
        this.quoterName = quoterName;
    }

    public SalesOrder quoterName(String quoterName) {
        setQuoterName(quoterName);
        return this;
    }
    // -- [auditorId] ------------------------

    /**
     * 审批人
     */
    @Size(max = 64)
    @Column(name = "auditor_id", length = 64)
    public String getAuditorId() {
        return auditorId;
    }

    public void setAuditorId(String auditorId) {
        this.auditorId = auditorId;
    }

    public SalesOrder auditorId(String auditorId) {
        setAuditorId(auditorId);
        return this;
    }
    // -- [auditorName] ------------------------

    /**
     * 审批人
     */
    @Size(max = 64)
    @Column(name = "auditor_name", length = 64)
    public String getAuditorName() {
        return auditorName;
    }

    public void setAuditorName(String auditorName) {
        this.auditorName = auditorName;
    }

    public SalesOrder auditorName(String auditorName) {
        setAuditorName(auditorName);
        return this;
    }
    // -- [drawingUrl] ------------------------

    /**
     * 图纸
     */
    @Size(max = 512)
    @Column(name = "drawing_url", length = 512)
    public String getDrawingUrl() {
        return drawingUrl;
    }

    public void setDrawingUrl(String drawingUrl) {
        this.drawingUrl = drawingUrl;
    }

    public SalesOrder drawingUrl(String drawingUrl) {
        setDrawingUrl(drawingUrl);
        return this;
    }
    // -- [atProductCode] ------------------------

    /**
     * A&T??
     */
    @Size(max = 256)
    @Column(name = "at_product_code", length = 256)
    public String getAtProductCode() {
        return atProductCode;
    }

    public void setAtProductCode(String atProductCode) {
        this.atProductCode = atProductCode;
    }

    public SalesOrder atProductCode(String atProductCode) {
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

    public SalesOrder brand(String brand) {
        setBrand(brand);
        return this;
    }
    
    @Size(max = 256)
    @Column(name = "supplier_name", length = 256)
    public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}
    
    // -- [costPrice] ------------------------

    /**
     * 成本价格
     */
    @Digits(integer = 11, fraction = 4)
    @Column(name = "cost_price", precision = 15, scale = 4)
    public BigDecimal getCostPrice() {
        return costPrice;
    }


	public void setCostPrice(BigDecimal costPrice) {
        this.costPrice = costPrice;
    }

    public SalesOrder costPrice(BigDecimal costPrice) {
        setCostPrice(costPrice);
        return this;
    }
    // -- [factoryPrice] ------------------------

    /**
     * 出厂价格
     */
    @Digits(integer = 11, fraction = 4)
    @Column(name = "factory_price", precision = 15, scale = 4)
    public BigDecimal getFactoryPrice() {
        return factoryPrice;
    }

    public void setFactoryPrice(BigDecimal factoryPrice) {
        this.factoryPrice = factoryPrice;
    }

    public SalesOrder factoryPrice(BigDecimal factoryPrice) {
        setFactoryPrice(factoryPrice);
        return this;
    }
    // -- [needProc] ------------------------

    /**
     * 是否需要询价处理
     */
    @Column(name = "need_proc", length = 1)
    public Boolean getNeedProc() {
        return needProc;
    }

    public void setNeedProc(Boolean needProc) {
        this.needProc = needProc;
    }

    public SalesOrder needProc(Boolean needProc) {
        setNeedProc(needProc);
        return this;
    }
    
    // -- [comment] ------------------------

    @Size(max = 512)
    @Column(name = "`comment`", length = 512)
    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public SalesOrder comment(String comment) {
        setComment(comment);
        return this;
    }

	/**
     * Apply the default values.
     */
    public SalesOrder withDefaults() {
        return this;
    }

    /**
     * Equals implementation using a business key.
     */
    @Override
    public boolean equals(Object other) {
        return this == other || (other instanceof SalesOrder && hashCode() == other.hashCode());
    }


    /**
     * Construct a readable string representation for this SalesOrder instance.
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this) //
                .add("id", getId()) //
                .add("formInstanceId", getFormInstanceId()) //
                .add("categoryCode", getCategoryCode()) //
                .add("categoryName", getCategoryName()) //
                .add("seriesCode", getSeriesCode()) //
                .add("seriesName", getSeriesName()) //
                .add("productCode", getProductCode()) //
                .add("productName", getProductName()) //
                .add("processType", getProcessType()) //
                .add("deliveryDate", getDeliveryDate()) //
                .add("amount", getAmount()) //
                .add("comment", getComment()) //
                .toString();
    }
}
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
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;
import org.hibernate.validator.constraints.URL;

import com.google.common.base.MoreObjects;
import com.google.common.base.Objects;

@Entity
@Table(name = "series")
public class Series implements Serializable {
    private static final long serialVersionUID = 1L;
    private static final Logger log = Logger.getLogger(Series.class.getName());

    // Raw attributes
    private String id;
    private String seriesName;
    private String seriesUrl;
    private String brdName;
    private String brdCode;
    private String categoryCode;
    private String procBy;
    private Boolean procFlag;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;

    public String entityClassName() {
        return Series.class.getSimpleName();
    }

    // -- [id] ------------------------

    @NotEmpty
    @Size(max = 128)
    @Column(name = "series_code", length = 128)
    @Id
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Series id(String id) {
        setId(id);
        return this;
    }

    @Transient
    public boolean isIdSet() {
        return id != null && !id.isEmpty();
    }
    // -- [seriesName] ------------------------

    @NotEmpty
    @Size(max = 256)
    @Column(name = "series_name", nullable = false, length = 256)
    public String getSeriesName() {
        return seriesName;
    }

    public void setSeriesName(String seriesName) {
        this.seriesName = seriesName;
    }

    public Series seriesName(String seriesName) {
        setSeriesName(seriesName);
        return this;
    }
    // -- [seriesUrl] ------------------------

    @NotEmpty
    @Size(max = 512)
    @URL
    @Column(name = "series_url", nullable = false, length = 512)
    public String getSeriesUrl() {
        return seriesUrl;
    }

    public void setSeriesUrl(String seriesUrl) {
        this.seriesUrl = seriesUrl;
    }

    public Series seriesUrl(String seriesUrl) {
        setSeriesUrl(seriesUrl);
        return this;
    }
    // -- [brdName] ------------------------

    @Size(max = 256)
    @Column(name = "brd_name", length = 256)
    public String getBrdName() {
        return brdName;
    }

    public void setBrdName(String brdName) {
        this.brdName = brdName;
    }

    public Series brdName(String brdName) {
        setBrdName(brdName);
        return this;
    }
    // -- [brdCode] ------------------------

    @Size(max = 256)
    @Column(name = "brd_code", length = 256)
    public String getBrdCode() {
        return brdCode;
    }

    public void setBrdCode(String brdCode) {
        this.brdCode = brdCode;
    }

    public Series brdCode(String brdCode) {
        setBrdCode(brdCode);
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

    public Series categoryCode(String categoryCode) {
        setCategoryCode(categoryCode);
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

    public Series procBy(String procBy) {
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

    public Series procFlag(Boolean procFlag) {
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

    public Series createDate(LocalDateTime createDate) {
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

    public Series updateDate(LocalDateTime updateDate) {
        setUpdateDate(updateDate);
        return this;
    }

    /**
     * Apply the default values.
     */
    public Series withDefaults() {
        return this;
    }

    /**
     * Equals implementation using a business key.
     */
    @Override
    public boolean equals(Object other) {
        return this == other || (other instanceof Series && hashCode() == other.hashCode());
    }

    /**
     * Construct a readable string representation for this Series instance.
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this) //
                .add("id", getId()) //
                .add("seriesName", getSeriesName()) //
                .add("seriesUrl", getSeriesUrl()) //
                .add("brdName", getBrdName()) //
                .add("brdCode", getBrdCode()) //
                .add("categoryCode", getCategoryCode()) //
                .add("procBy", getProcBy()) //
                .add("procFlag", getProcFlag()) //
                .add("createDate", getCreateDate()) //
                .add("updateDate", getUpdateDate()) //
                .toString();
    }
}
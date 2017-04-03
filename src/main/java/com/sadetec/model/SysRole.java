package com.sadetec.model;

import static javax.persistence.GenerationType.IDENTITY;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.logging.Logger;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;

import com.google.common.base.MoreObjects;
import com.google.common.base.Objects;

@Entity
@Table(name = "sys_role")
public class SysRole implements Serializable {
    private static final long serialVersionUID = 1L;
    private static final Logger log = Logger.getLogger(SysRole.class.getName());

    // Raw attributes
    private Integer id;
    private String name;
    private String enabled;
    private String remarks;
    private Date createDate;
    private Date updateDate;
    private String delFlag;

    public String entityClassName() {
        return SysRole.class.getSimpleName();
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

    public SysRole id(Integer id) {
        setId(id);
        return this;
    }

    @Transient
    public boolean isIdSet() {
        return id != null;
    }
    // -- [name] ------------------------

    /**
     * 角色名称
     */
    @NotEmpty
    @Size(max = 100)
    @Column(name = "name", nullable = false, unique = true, length = 100)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SysRole name(String name) {
        setName(name);
        return this;
    }
    // -- [enabled] ------------------------

    /**
     * 是否可用 1：可用 0：停用
     */
    @Column(name = "enabled", length = 1)
    public String getEnabled() {
        return enabled;
    }

    public void setEnabled(String enabled) {
        this.enabled = enabled;
    }

    public SysRole enabled(String enabled) {
        setEnabled(enabled);
        return this;
    }
    // -- [remarks] ------------------------

    /**
     * 备注
     */
    @Size(max = 255)
    @Column(name = "remarks")
    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public SysRole remarks(String remarks) {
        setRemarks(remarks);
        return this;
    }
    // -- [createDate] ------------------------

    /**
     * 创建时间
     */
    @Column(name = "create_date", length = 19)
    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public SysRole createDate(Date createDate) {
        setCreateDate(createDate);
        return this;
    }
    // -- [updateDate] ------------------------

    /**
     * 更新时间
     */
    @Column(name = "update_date", length = 19)
    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public SysRole updateDate(Date updateDate) {
        setUpdateDate(updateDate);
        return this;
    }
    // -- [delFlag] ------------------------

    /**
     * 删除标记 1：删除 0：未删除
     */
    @Column(name = "del_flag", length = 1)
    public String getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(String delFlag) {
        this.delFlag = delFlag;
    }

    public SysRole delFlag(String delFlag) {
        setDelFlag(delFlag);
        return this;
    }

    /**
     * Apply the default values.
     */
    public SysRole withDefaults() {
        setEnabled("1");
        setDelFlag("0");
        return this;
    }

    /**
     * Equals implementation using a business key.
     */
    @Override
    public boolean equals(Object other) {
        return this == other || (other instanceof SysRole && hashCode() == other.hashCode());
    }

    private volatile int previousHashCode = 0;

    @Override
    public int hashCode() {
        int hashCode = Objects.hashCode(getName());

        if (previousHashCode != 0 && previousHashCode != hashCode) {
            log.warning("DEVELOPER: hashCode has changed!." //
                    + "If you encounter this message you should take the time to carefuly review equals/hashCode for: " //
                    + getClass().getCanonicalName());
        }

        previousHashCode = hashCode;
        return hashCode;
    }

    /**
     * Construct a readable string representation for this SysRole instance.
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this) //
                .add("id", getId()) //
                .add("name", getName()) //
                .add("enabled", getEnabled()) //
                .add("remarks", getRemarks()) //
                .add("createDate", getCreateDate()) //
                .add("updateDate", getUpdateDate()) //
                .add("delFlag", getDelFlag()) //
                .toString();
    }
}
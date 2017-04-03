package com.sadetec.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Transient;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;

import org.springframework.util.StringUtils;

import com.google.common.base.Objects;

@Embeddable

public class SysUserRolePk implements Comparable<SysUserRolePk>, Serializable {
    private static final long serialVersionUID = 1L;

    private Integer roleId;
    private Integer userId;

    public SysUserRolePk() {
    }

    public SysUserRolePk(Integer roleId, Integer userId) {
        this.roleId = roleId;
        this.userId = userId;
    }

    /**
     * Helper to determine if this composite primary key is fully set.
     */
    @Transient
    public boolean areFieldsSet() {
        return isRoleIdSet() && isUserIdSet();
    }

    /**
     * Helper method to determine if this instance is considered empty, that is,
     * if all the non primary key columns are null.
     */
    @Transient
    public boolean isEmpty() {
        return !isRoleIdSet() && !isUserIdSet();
    }

    //-- [roleId] ------------------------------

    /**
     * 角色ID
     */
    @Digits(integer = 10, fraction = 0)
    @NotNull
    @Column(name = "role_id", nullable = false, precision = 10)
    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public SysUserRolePk roleId(Integer roleId) {
        setRoleId(roleId);
        return this;
    }

    /**
     * Helper that determines if this attribute is set or not.
     */
    @Transient
    public boolean isRoleIdSet() {
        return getRoleId() != null;
    }

    //-- [userId] ------------------------------

    /**
     * 用户ID
     */
    @Digits(integer = 10, fraction = 0)
    @NotNull
    @Column(name = "user_id", nullable = false, precision = 10)
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public SysUserRolePk userId(Integer userId) {
        setUserId(userId);
        return this;
    }

    /**
     * Helper that determines if this attribute is set or not.
     */
    @Transient
    public boolean isUserIdSet() {
        return getUserId() != null;
    }

    @Override
    public boolean equals(Object other) {
        return this == other || (other instanceof SysUserRolePk && hashCode() == other.hashCode());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getRoleId(), //
                getUserId());
    }

    @Override
    public int compareTo(SysUserRolePk other) {
        return other == null ? -1 : hashCode() - other.hashCode();
    }

    /**
    * Return the string representation of the composite primary key, it should be reversable by version produced by the {@link #String()} method
    */
    @Override
    public String toString() {
        StringBuilder result = new StringBuilder();
        if (isRoleIdSet()) {
            result.append(getRoleId());
        }
        result.append("_");
        if (isUserIdSet()) {
            result.append(getUserId());
        }

        return result.toString();
    }

    /**
     * Build an instance from a string version produced by the {@link #toString()} method
     */
    public static SysUserRolePk fromString(String string) {
        SysUserRolePk result = new SysUserRolePk();
        String[] values = string.split("_");
        if (!StringUtils.isEmpty(values[0])) {
            result.setRoleId(Integer.valueOf(values[0]));
        }
        if (!StringUtils.isEmpty(values[1])) {
            result.setUserId(Integer.valueOf(values[1]));
        }

        return result;
    }
}

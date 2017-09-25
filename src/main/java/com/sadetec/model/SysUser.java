package com.sadetec.model;

import static javax.persistence.GenerationType.IDENTITY;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Logger;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.http.converter.HttpMessageNotReadableException;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.MoreObjects;
import com.google.common.base.Objects;

@Entity
@Table(name = "sys_user")
public class SysUser implements Serializable {
    private static final long serialVersionUID = 1L;
    private static final Logger log = Logger.getLogger(SysUser.class.getName());

    // Raw attributes
    private Integer id;
    private Integer companyId;
    private Integer sequence;
    private String loginName;
    private String password;
    private String name;
    private String email;
    private String phone;
    private String mobile;
    private String enabled;
    private String remarks;
    private String delFlag;

    public String entityClassName() {
        return SysUser.class.getSimpleName();
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

    public SysUser id(Integer id) {
        setId(id);
        return this;
    }

    @Transient
    public boolean isIdSet() {
        return id != null;
    }
    
    // -- [company_id] ------------------------

    @Column(name = "company_id", precision = 10)
    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public SysUser companyId(Integer companyId) {
        setId(companyId);
        return this;
    }
    
    // -- [sequence] ------------------------

    @Column(name = "sequence", precision = 10)
    public Integer getSequence() {
        return sequence;
    }

    public void setSequence(Integer sequence) {
        this.sequence = sequence;
    }
    
    // -- [loginName] ------------------------

    /**
     * 登录名
     */
    @NotEmpty
    @Size(max = 100)
    @Column(name = "login_name", nullable = false, unique = true, length = 100)
    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public SysUser loginName(String loginName) {
        setLoginName(loginName);
        return this;
    }
    // -- [password] ------------------------

    /**
     * 密码
     */
    @NotEmpty
    @Size(max = 100)
    @Column(name = "`password`", nullable = false, length = 100)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public SysUser password(String password) {
        setPassword(password);
        return this;
    }
    // -- [name] ------------------------

    /**
     * 姓名
     */
    @NotEmpty
    @Size(max = 100)
    @Column(name = "name", nullable = false, length = 100)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SysUser name(String name) {
        setName(name);
        return this;
    }
    // -- [email] ------------------------

    /**
     * 邮件
     */
    @Email
    @Size(max = 200)
    @Column(name = "email", length = 200)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public SysUser email(String email) {
        setEmail(email);
        return this;
    }
    // -- [phone] ------------------------

    /**
     * 电话
     */
    @Size(max = 200)
    @Column(name = "phone", length = 200)
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public SysUser phone(String phone) {
        setPhone(phone);
        return this;
    }
    // -- [mobile] ------------------------

    /**
     * 手机
     */
    @Size(max = 200)
    @Column(name = "mobile", length = 200)
    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public SysUser mobile(String mobile) {
        setMobile(mobile);
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

    public SysUser enabled(String enabled) {
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

    public SysUser remarks(String remarks) {
        setRemarks(remarks);
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

    public SysUser delFlag(String delFlag) {
        setDelFlag(delFlag);
        return this;
    }

    /**
     * Apply the default values.
     */
    public SysUser withDefaults() {
        setEnabled("1");
        setDelFlag("0");
        return this;
    }

    /**
     * Equals implementation using a business key.
     */
    @Override
    public boolean equals(Object other) {
        return this == other || (other instanceof SysUser && hashCode() == other.hashCode());
    }

    private volatile int previousHashCode = 0;

    @Override
    public int hashCode() {
        int hashCode = Objects.hashCode(getLoginName());

        if (previousHashCode != 0 && previousHashCode != hashCode) {
            log.warning("DEVELOPER: hashCode has changed!." //
                    + "If you encounter this message you should take the time to carefuly review equals/hashCode for: " //
                    + getClass().getCanonicalName());
        }

        previousHashCode = hashCode;
        return hashCode;
    }

    /**
     * Construct a readable string representation for this SysUser instance.
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this) //
                .add("id", getId()) //
                .add("loginName", getLoginName()) //
                .add("password", "XXXX") //
                .add("name", getName()) //
                .add("email", getEmail()) //
                .add("phone", getPhone()) //
                .add("mobile", getMobile()) //
                .add("enabled", getEnabled()) //
                .add("remarks", getRemarks()) //
                .add("delFlag", getDelFlag()) //
                .toString();
    }
    
	public static List<SysUser> fromJsonToSysUser(String json) {
        List<SysUser> temps = new ArrayList<SysUser>();
        ObjectMapper mapper = new ObjectMapper();
        TypeReference<List<SysUser>> typeRef = new TypeReference<List<SysUser>>(){};
        try {
            JsonNode data = mapper.readValue(json, JsonNode.class);
            Iterator<JsonNode> iterator = data.iterator();
            while (iterator.hasNext()) {
                JsonNode tempJson = iterator.next();
                if (tempJson.isArray()) {
                    temps = mapper.convertValue(tempJson, typeRef);
                } else {
                	SysUser temp = mapper.convertValue(tempJson, SysUser.class);
                    temps.add(temp);
                }
            }
        }catch (Exception ex) {
            throw new HttpMessageNotReadableException("Could not read JSON: " + ex.getMessage(), ex);
        }
        return temps;
    }
}
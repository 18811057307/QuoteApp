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
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

import com.google.common.base.MoreObjects;

@Entity
@Table(name = "form_instance")
public class FormInstance implements Serializable {
    private static final long serialVersionUID = 1L;
    private static final Logger log = Logger.getLogger(FormInstance.class.getName());

    // Raw attributes
    private Integer id;
    private String title;
    private String seqNumber;
    private String drafterId;
    private String drafter;
    private String draftOrg;
    
    private String salesId;
    private String sales;
    private String salesOrg;
    private String mobile;
    private String dealStatus;
    
    private String comment;
    private String description;
    
	@Temporal(TemporalType.TIMESTAMP)
	@DateTimeFormat(style = "S-")
    private Date createDate;
	
    private Date lastModified;
    private String processInstanceId;
    private String processDefinitionId;
    private String document;
    private Integer priority;

    public String entityClassName() {
        return FormInstance.class.getSimpleName();
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

    public FormInstance id(Integer id) {
        setId(id);
        return this;
    }

    @Transient
    public boolean isIdSet() {
        return id != null;
    }
    // -- [title] ------------------------

    @Size(max = 256)
    @Column(name = "title", length = 256)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public FormInstance title(String title) {
        setTitle(title);
        return this;
    }
    // -- [seqNumber] ------------------------

    @Size(max = 256)
    @Column(name = "seq_number", length = 256)
    public String getSeqNumber() {
        return seqNumber;
    }

    public void setSeqNumber(String seqNumber) {
        this.seqNumber = seqNumber;
    }

    public FormInstance seqNumber(String seqNumber) {
        setSeqNumber(seqNumber);
        return this;
    }
    // -- [drafterId] ------------------------

    @Size(max = 512)
    @Column(name = "drafter_id", length = 512)
    public String getDrafterId() {
        return drafterId;
    }

    public void setDrafterId(String drafterId) {
        this.drafterId = drafterId;
    }

    public FormInstance drafterId(String drafterId) {
        setDrafterId(drafterId);
        return this;
    }
    // -- [drafter] ------------------------

    @Size(max = 256)
    @Column(name = "drafter", length = 256)
    public String getDrafter() {
        return drafter;
    }

    public void setDrafter(String drafter) {
        this.drafter = drafter;
    }

    public FormInstance drafter(String drafter) {
        setDrafter(drafter);
        return this;
    }
    // -- [draftOrg] ------------------------

    @Size(max = 256)
    @Column(name = "draft_org", length = 256)
    public String getDraftOrg() {
        return draftOrg;
    }

    public void setDraftOrg(String draftOrg) {
        this.draftOrg = draftOrg;
    }

    public FormInstance draftOrg(String draftOrg) {
        setDraftOrg(draftOrg);
        return this;
    }
    
    // -- [comment] ------------------------
    @Size(max = 256)
    @Column(name = "sales_id", length = 256)    
    public String getSalesId() {
		return salesId;
	}

	public void setSalesId(String salesId) {
		this.salesId = salesId;
	}

    @Size(max = 256)
    @Column(name = "sales", length = 256) 
	public String getSales() {
		return sales;
	}

	public void setSales(String sales) {
		this.sales = sales;
	}

    @Size(max = 256)
    @Column(name = "sales_org", length = 256) 
	public String getSalesOrg() {
		return salesOrg;
	}

	public void setSalesOrg(String salesOrg) {
		this.salesOrg = salesOrg;
	}

    @Size(max = 256)
    @Column(name = "mobile", length = 256) 
	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getDealStatus() {
		return dealStatus;
	}

	public void setDealStatus(String dealStatus) {
		this.dealStatus = dealStatus;
	}

	@Size(max = 512)
    @Column(name = "`comment`", length = 512)
    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public FormInstance comment(String comment) {
        setComment(comment);
        return this;
    }
    // -- [description] ------------------------

    @Size(max = 512)
    @Column(name = "description", length = 512)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public FormInstance description(String description) {
        setDescription(description);
        return this;
    }
    // -- [createDate] ------------------------

    @Column(name = "create_date", length = 19)
    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public FormInstance createDate(Date createDate) {
        setCreateDate(createDate);
        return this;
    }
    // -- [lastModified] ------------------------

    @Column(name = "last_modified", length = 19)
    public Date getLastModified() {
        return lastModified;
    }

    public void setLastModified(Date lastModified) {
        this.lastModified = lastModified;
    }

    public FormInstance lastModified(Date lastModified) {
        setLastModified(lastModified);
        return this;
    }
    // -- [processInstanceId] ------------------------

    @Size(max = 256)
    @Column(name = "process_instance_id", length = 256)
    public String getProcessInstanceId() {
        return processInstanceId;
    }

    public void setProcessInstanceId(String processInstanceId) {
        this.processInstanceId = processInstanceId;
    }

    public FormInstance processInstanceId(String processInstanceId) {
        setProcessInstanceId(processInstanceId);
        return this;
    }
    // -- [processDefinitionId] ------------------------

    @Size(max = 256)
    @Column(name = "process_definition_id", length = 256)
    public String getProcessDefinitionId() {
        return processDefinitionId;
    }

    public void setProcessDefinitionId(String processDefinitionId) {
        this.processDefinitionId = processDefinitionId;
    }

    public FormInstance processDefinitionId(String processDefinitionId) {
        setProcessDefinitionId(processDefinitionId);
        return this;
    }
    // -- [document] ------------------------

    @Size(max = 65535)
    @Column(name = "document", length = 65535)
    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    public FormInstance document(String document) {
        setDocument(document);
        return this;
    }
    // -- [priority] ------------------------

    @Digits(integer = 10, fraction = 0)
    @Column(name = "priority", precision = 10)
    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public FormInstance priority(Integer priority) {
        setPriority(priority);
        return this;
    }

    /**
     * Apply the default values.
     */
    public FormInstance withDefaults() {
        return this;
    }

    /**
     * Equals implementation using a business key.
     */
    @Override
    public boolean equals(Object other) {
        return this == other || (other instanceof FormInstance && hashCode() == other.hashCode());
    }

    /**
     * Construct a readable string representation for this FormInstance instance.
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this) //
                .add("id", getId()) //
                .add("title", getTitle()) //
                .add("seqNumber", getSeqNumber()) //
                .add("drafterId", getDrafterId()) //
                .add("drafter", getDrafter()) //
                .add("draftOrg", getDraftOrg()) //
                .add("comment", getComment()) //
                .add("description", getDescription()) //
                .add("createDate", getCreateDate()) //
                .add("lastModified", getLastModified()) //
                .add("processInstanceId", getProcessInstanceId()) //
                .add("processDefinitionId", getProcessDefinitionId()) //
                .add("document", getDocument()) //
                .add("priority", getPriority()) //
                .toString();
    }
}
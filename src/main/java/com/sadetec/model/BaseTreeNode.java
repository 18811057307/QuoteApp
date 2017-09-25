package com.sadetec.model;

import java.util.List;

public class BaseTreeNode {

	private String id;
	private String text;
	private Boolean leaf;
	private String iconCls;
	private String cls;
	private String qtip;
	private Boolean expanded;
	private List<BaseTreeNode> children;

	public BaseTreeNode(String id, String text, Boolean leaf, String iconCls, String cls, String qtip) {
		this.id = id;
		this.text = text;
		this.leaf = leaf;
		this.iconCls = iconCls;
		this.cls = cls;
		this.qtip = qtip;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Boolean getLeaf() {
		return leaf;
	}

	public void setLeaf(Boolean leaf) {
		this.leaf = leaf;
	}

	public String getIconCls() {
		return iconCls;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}

	public String getQtip() {
		return qtip;
	}

	public void setQtip(String qtip) {
		this.qtip = qtip;
	}

	public String getCls() {
		return cls;
	}

	public void setCls(String cls) {
		this.cls = cls;
	}
	
	public Boolean getExpanded() {
		return expanded;
	}

	public void setExpanded(Boolean expanded) {
		this.expanded = expanded;
	}

	public List<BaseTreeNode> getChildren() {
		return children;
	}

	public void setChildren(List<BaseTreeNode> children) {
		this.children = children;
	}
	
}

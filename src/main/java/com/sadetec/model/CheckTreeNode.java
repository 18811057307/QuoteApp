package com.sadetec.model;

public class CheckTreeNode {
	
	private Integer id;
	private String text;
	private Boolean leaf;
	private Boolean checked;
	
	public CheckTreeNode(Integer id,String text,Boolean leaf, Boolean checked) {
		this.id = id;
		this.text = text;
		this.leaf = leaf;
		this.checked = checked;
		
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
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
	public Boolean getChecked() {
		return checked;
	}
	public void setChecked(Boolean checked) {
		this.checked = checked;
	}
	
	
	
}

package com.sadetec.model;

public class CategoryTreeNode {
	
	private String id;
	private String text;
	private Boolean leaf;
	private Category category;
	
	public CategoryTreeNode(String id,String text,Boolean leaf, Category data) {
		this.id = id;
		this.text = text;
		this.leaf = leaf;
		this.category = data;
		
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

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}	
	
	
}

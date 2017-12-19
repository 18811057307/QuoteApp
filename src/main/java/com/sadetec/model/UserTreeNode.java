package com.sadetec.model;

public class UserTreeNode extends BaseTreeNode {

	private String mobile; 
	
	public UserTreeNode(String id, String text, Boolean leaf, String iconCls, String cls, String qtip) {
		super(id, text, leaf, iconCls, cls, qtip);
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	
	

}

package com.sadetec.model;

/**
 * 通过权限控制页面显示的桌面快捷,该类用于返回数据封装.
 * @author gtqin
 *
 */
public class Shortcut {
	private String name;
	private String iconCls;
	private String module;
	
	public Shortcut(String name, String iconCls, String module) {
		this.name = name;
		this.iconCls = iconCls;
		this.module = module;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getIconCls() {
		return iconCls;
	}
	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
	public String getModule() {
		return module;
	}
	public void setModule(String module) {
		this.module = module;
	}
	
}

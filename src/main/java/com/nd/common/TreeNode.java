package com.nd.common;

import java.util.List;
/**
 * 
 * @author lishude
 *
 */
public class TreeNode {
	
	private int id;//树ID

	private String text;//树文本
	
	private int pid;
	
	private TreeNodeCustomAttrs attributes;//自定义属性

	private List<TreeNode> children;//子节点

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}


	public List<TreeNode> getChildren() {
		return children;
	}

	public void setChildren(List<TreeNode> children) {
		this.children = children;
	}

	

	public TreeNodeCustomAttrs getAttributes() {
		return attributes;
	}

	public void setAttributes(TreeNodeCustomAttrs attributes) {
		this.attributes = attributes;
	}

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

}

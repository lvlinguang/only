package com.only.model.xgui;

import java.util.List;

/**
 * 树
 * 
 * @author lvlinguang
 * 
 */
public class Tree {

	// 节点的ID
	private int id;

	// 节点显示的文字
	private String text;

	// 定义了一些子节点的节点数组
	private List<Tree> children;

	// 定义该节点的父节点
	private int pid;

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

	public List<Tree> getChildren() {
		return children;
	}

	public void setChildren(List<Tree> children) {
		this.children = children;
	}

	public int getPid() {
		return pid;
	}

	public void setPid(int pid) {
		this.pid = pid;
	}

}

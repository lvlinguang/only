package com.only.model;

/**
 * 自定义用户
 * 
 * @author lvlinguang
 * 
 */
public class UserCustom extends User {

	// 角色id
	private int roleid;

	// 角色名
	private String rolename;

	public String getRolename() {
		return rolename;
	}

	public int getRoleid() {
		return roleid;
	}

	public void setRoleid(int roleid) {
		this.roleid = roleid;
	}

	public void setRolename(String rolename) {
		this.rolename = rolename;
	}

}

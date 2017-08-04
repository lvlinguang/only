package com.only.entity;

/**
 * 用户查询包装类
 * 
 * @author lvlinguang
 * 
 */
public class UserQueryVo {

	// 用户
	private UserCustom userCustom;

	// 角色
	private Role role;

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public UserCustom getUserCustom() {
		return userCustom;
	}

	public void setUserCustom(UserCustom userCustom) {
		this.userCustom = userCustom;
	}

}

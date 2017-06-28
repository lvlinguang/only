package com.only.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.only.mapper.UserRoleMapper;
import com.only.model.UserRole;
import com.only.service.UserRoleService;

/**
 * 用户角色
 * 
 * @author lvlinguang
 * 
 */
public class UserRoleServiceImpl implements UserRoleService {

	@Autowired
	private UserRoleMapper userRoleMapper;

	/**
	 * 添加用户角色
	 */
	public void addUserRole(int userid, int roleid) throws Exception {

		userRoleMapper.addUserRole(userid, roleid);
	}

	/**
	 * 修改用户角色
	 */
	public void updateUserRole(int userid, int roleid) throws Exception {

		userRoleMapper.updateUserRole(userid, roleid);
	}

	/**
	 * 得到用户角色
	 */
	public UserRole getUserRoleByUser(int userid) throws Exception {

		return userRoleMapper.getUserRoleByUser(userid);
	}

}

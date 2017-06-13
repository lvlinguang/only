package com.only.service;

import org.apache.ibatis.annotations.Param;

/**
 * 用户角色
 * 
 * @author lvlinguang
 * 
 */
public interface UserRoleService {

	/**
	 * 添加用户角色
	 * 
	 * @param userid
	 * @param roleid
	 * @throws Exception
	 */
	public void addUserRole(Integer userid, Integer roleid) throws Exception;

	/**
	 * 修改用户角色
	 * 
	 * @param userid
	 * @param roleid
	 * @throws Exception
	 */
	public void updateUserRole(Integer userid, Integer roleid) throws Exception;
}

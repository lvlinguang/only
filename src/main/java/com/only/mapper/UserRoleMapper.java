package com.only.mapper;

import org.apache.ibatis.annotations.Param;

import com.only.model.UserRole;

/**
 * 用户角色管理
 * 
 * @author lvlinguang
 * 
 */
public interface UserRoleMapper {

	/**
	 * 添加用户角色
	 * 
	 * @param userid
	 * @param roleid
	 * @throws Exception
	 */
	public void addUserRole(@Param("userid") Integer userid,
			@Param("roleid") Integer roleid) throws Exception;

	/**
	 * 修改用户角色
	 * 
	 * @param userid
	 * @param roleid
	 * @throws Exception
	 */
	public void updateUserRole(@Param("userid") Integer userid,
			@Param("roleid") Integer roleid) throws Exception;

	/**
	 * 得到用户角色
	 * 
	 * @param userid
	 * @throws Exception
	 */
	public UserRole getUserRoleByUser(int userid) throws Exception;
	
}
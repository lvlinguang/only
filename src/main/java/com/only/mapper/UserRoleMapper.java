package com.only.mapper;

import org.apache.ibatis.annotations.Param;

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
}
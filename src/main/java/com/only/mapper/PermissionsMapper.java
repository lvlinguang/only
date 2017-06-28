package com.only.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.only.model.Permissions;

/**
 * 权限管理
 * 
 * @author lvlinguang
 * 
 */
public interface PermissionsMapper {

	/**
	 * 权限列表
	 * 
	 * @return
	 * @throws Exception
	 */
	public List<Permissions> getPermissionsList() throws Exception;

	/**
	 * 添加角色权限
	 * 
	 * @param rolepermissions
	 * @throws Exception
	 */
	public void addRolePermissions(@Param("roleid") Integer roleid,
			@Param("permissionid") Integer permissionid) throws Exception;

	/**
	 * 删除角色权限
	 * 
	 * @param roleid
	 * @throws Exception
	 */
	public void deleteRolePermissions(Integer roleid) throws Exception;

	/**
	 * 角色权限列表
	 * 
	 * @return
	 * @throws Exception
	 */
	public List<Permissions> getRolePermissionsList(
			@Param("roleid") Integer roleid) throws Exception;

	/**
	 * 添加用户权限
	 * 
	 * @param rolepermissions
	 * @throws Exception
	 */
	public void addUserPermissions(@Param("userid") Integer userid,
			@Param("permissionid") Integer permissionid) throws Exception;

	/**
	 * 删除用户权限
	 * 
	 * @param userid
	 * @throws Exception
	 */
	public void deleteUserPermissions(Integer userid) throws Exception;

	/**
	 * 用户权限列表
	 * 
	 * @param userid
	 * @return
	 * @throws Exception
	 */
	public List<Permissions> getUserPrmissionsList(
			@Param("userid") Integer userid) throws Exception;

}
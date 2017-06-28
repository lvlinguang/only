package com.only.service;

import java.util.List;

import com.only.model.Permissions;

/**
 * 权限
 * 
 * @author lvlinguang
 * 
 */
public interface PermissionsService {

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
	public void addRolePermissions(int roleid, String permissionid) throws Exception;

	/**
	 * 删除角色权限
	 * 
	 * @param roleid
	 * @throws Exception
	 */
	public void deleteRolePermissions(int roleid) throws Exception;

	/**
	 * 角色权限列表
	 * 
	 * @return
	 * @throws Exception
	 */
	public List<Permissions> getRolePermissionsList(int roleid) throws Exception;

	/**
	 * 添加用户权限
	 * 
	 * @param rolepermissions
	 * @throws Exception
	 */
	public void addUserPermissions(int userid, String permissionid) throws Exception;

	/**
	 * 删除用户权限
	 * 
	 * @param userid
	 * @throws Exception
	 */
	public void deleteUserPermissions(int userid) throws Exception;

	/**
	 * 用户权限列表
	 * 
	 * @param userid
	 * @return
	 * @throws Exception
	 */
	public List<Permissions> getUserPrmissionsList(int userid) throws Exception;
}

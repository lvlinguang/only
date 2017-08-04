package com.only.service;

import java.util.List;

import com.only.entity.Permissions;

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
	public void addRolePermissions(Integer roleid, String permissionid) throws Exception;

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
	public List<Permissions> getRolePermissionsList(Integer roleid) throws Exception;

	/**
	 * 添加用户权限
	 * 
	 * @param rolepermissions
	 * @throws Exception
	 */
	public void addUserPermissions(Integer userid, String permissionid) throws Exception;

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
	public List<Permissions> getUserPrmissionsList(Integer userid) throws Exception;
}

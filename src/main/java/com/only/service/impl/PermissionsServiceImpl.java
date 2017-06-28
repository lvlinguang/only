package com.only.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.only.mapper.PermissionsMapper;
import com.only.model.Permissions;
import com.only.service.PermissionsService;

/**
 * 权限管理
 * 
 * @author lvlinguang
 * 
 */
public class PermissionsServiceImpl implements PermissionsService {

	@Autowired
	private PermissionsMapper permissionsMapper;

	/**
	 * 权限列表
	 */
	public List<Permissions> getPermissionsList() throws Exception {

		return permissionsMapper.getPermissionsList();
	}

	/**
	 * 添加角色权限
	 */
	public void addRolePermissions(int roleid, String permissionid) throws Exception {

		// 添加权限
		String[] array = permissionid.split(",");

		for (String strid : array) {

			int id = Integer.parseInt(strid);

			// 添加角色权限
			permissionsMapper.addRolePermissions(roleid, id);
		}
	}

	/**
	 * 删除角色权限
	 */
	public void deleteRolePermissions(int roleid) throws Exception {

		permissionsMapper.deleteRolePermissions(roleid);
	}

	/**
	 * 角色权限列表
	 */
	public List<Permissions> getRolePermissionsList(int roleid) throws Exception {

		return permissionsMapper.getRolePermissionsList(roleid);
	}

	/**
	 * 添加用户权限
	 */
	public void addUserPermissions(int userid, String permissionid) throws Exception {

		// 添加权限
		String[] array = permissionid.split(",");

		for (String strid : array) {

			int id = Integer.parseInt(strid);

			// 添加用户权限
			permissionsMapper.addUserPermissions(userid, id);
		}
	}

	/**
	 * 删除用户权限
	 */
	public void deleteUserPermissions(int userid) throws Exception {

		permissionsMapper.deleteUserPermissions(userid);
	}

	/**
	 * 用户权限列表
	 */
	public List<Permissions> getUserPrmissionsList(int userid) throws Exception {

		return permissionsMapper.getUserPrmissionsList(userid);
	}

}

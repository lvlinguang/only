package com.only.service;

import java.util.List;

import com.only.entity.Role;
import com.only.model.common.PageHelper;

/**
 * 角色
 * 
 * @author lvlinguang
 * 
 */
public interface RoleService {

	/**
	 * 添加角色
	 * 
	 * @param role
	 * @throws Exception
	 */
	public void addRole(Role role) throws Exception;

	/**
	 * 修改角色
	 * 
	 * @param role
	 * @throws Exception
	 */
	public void updateRole(Role role) throws Exception;

	/**
	 * 删除角色
	 * 
	 * @param id
	 * @throws Exception
	 */
	public void deleteRole(Integer id) throws Exception;

	/**
	 * 角色详情
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public Role getRoleByID(Integer id) throws Exception;

	/**
	 * 角色列表条数
	 * 
	 * @param name
	 * @return
	 * @throws Exception
	 */
	public int getRoleListTotal(String name) throws Exception;

	/**
	 * 角色列表
	 * 
	 * @param page
	 * @param name
	 * @return
	 * @throws Exception
	 */
	public List<Role> getRoleList(PageHelper page, String name) throws Exception;

}

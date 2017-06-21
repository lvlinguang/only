package com.only.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.only.model.Role;
import com.only.model.xgui.PageHelper;

/**
 * 角色
 * 
 * @author lvlinguang
 * 
 */
public interface RoleMapper {

	/**
	 * 添加角色
	 * 
	 * @param role
	 *            数据
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
	public void deleteRole(int id) throws Exception;

	/**
	 * 角色详情
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public Role getRoleByID(int id) throws Exception;

	/**
	 * 角色列表条数
	 * 
	 * @param name
	 *            关键字
	 * @return
	 * @throws Exception
	 */
	public int getRoleListTotal(@Param("name") String name) throws Exception;

	/**
	 * 角色列表
	 * 
	 * @param page
	 *            分页
	 * @param name
	 *            关键字
	 * @return
	 * @throws Exception
	 */
	public List<Role> getRoleList(@Param("page") PageHelper page,
			@Param("name") String name) throws Exception;

}
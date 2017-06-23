package com.only.service.impl;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;

import com.only.mapper.RoleMapper;
import com.only.model.Role;
import com.only.model.xgui.PageHelper;
import com.only.service.RoleService;

/**
 * 角色
 * 
 * @author lvlinguang
 * 
 */
public class RoleServiceImpl implements RoleService {

	@Autowired
	private RoleMapper roleMapper;

	/**
	 * 添加角色
	 */
	public void addRole(Role role) throws Exception {

		roleMapper.addRole(role);
	}

	/**
	 * 修改角色
	 */
	public void updateRole(Role role) throws Exception {

		roleMapper.updateRole(role);

	}

	/**
	 * 删除角色
	 */
	public void deleteRole(int id) throws Exception {

		roleMapper.deleteRole(id);

	}

	/**
	 * 角色详情
	 */
	public Role getRoleByID(int id) throws Exception {

		return roleMapper.getRoleByID(id);
	}

	/**
	 * 列表条数
	 */
	public int getRoleListTotal(String name) throws Exception {

		return roleMapper.getRoleListTotal(name);
	}

	/**
	 * 角色列表
	 */
	public List<Role> getRoleList(PageHelper page, String name)
			throws Exception {

		if (page != null) {
			
			// 起始条数
			page.setStart((page.getPageIndex() - 1) * page.getPageSize());

			// 结束条数
			// page.setEnd(page.getPageIndex() * page.getPageSize());
			page.setEnd(page.getPageSize());
		}

		return roleMapper.getRoleList(page, name);
	}
}

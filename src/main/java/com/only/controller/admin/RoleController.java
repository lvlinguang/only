package com.only.controller.admin;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.only.model.Permissions;
import com.only.model.Role;
import com.only.model.RolePermissions;
import com.only.model.xgui.DataGrid;
import com.only.model.xgui.Json;
import com.only.model.xgui.PageHelper;
import com.only.model.xgui.Tree;
import com.only.service.PermissionsService;
import com.only.service.RoleService;
import com.only.util.ListDistinct;

/**
 * 角色
 * 
 * @author lvlinguang
 * 
 */
@Controller
@RequestMapping("role")
public class RoleController extends BaseController {

	@Autowired
	private RoleService roleService;

	@Autowired
	private PermissionsService permissionsService;

	/**
	 * 角色首页
	 * 
	 * @return
	 */
	@RequestMapping("/")
	public String Index() {
		return "role/index";
	}

	/**
	 * 添加角色
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/add")
	public ModelAndView Add() throws Exception {
		ModelAndView modelAndView = new ModelAndView();

		// 权限
		List<Permissions> permissions = permissionsService.getPermissionsList();

		// 权限树
		List<Tree> trees = getPermissionTree(permissions);

		modelAndView.addObject("permissions", trees);

		modelAndView.setViewName("role/add");

		return modelAndView;

	}

	/**
	 * 修改角色
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/update")
	public ModelAndView Update(Integer id) throws Exception {

		ModelAndView modelAndView = new ModelAndView();

		// 权限
		List<Permissions> permissions = permissionsService.getPermissionsList();

		// 权限树
		List<Tree> trees = getPermissionTree(permissions);

		// 角色具有的权限
		List<Permissions> rolePermissions = permissionsService
				.getRolePermissionsList(id);

		// 权限树(角色)
		List<Tree> rtrees = getPermissionTree(rolePermissions);

		// 角色详情
		Role role = roleService.getRoleByID(id);

		// 角色详情
		modelAndView.addObject("role", role);

		modelAndView.addObject("permissions", trees);

		modelAndView.addObject("rolePermissions", rtrees);

		modelAndView.setViewName("role/update");

		return modelAndView;

	}

	/**
	 * 创建角色
	 * 
	 * @param roleName
	 * @param permissions
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "add", method = RequestMethod.POST)
	public @ResponseBody
	Json Add(String name, String permissions) throws Exception {

		Role record = new Role();
		record.setName(name);
		record.setIndentation(2);
		record.setDescription(name);

		// 添加角色
		roleService.addRole(record);

		// 添加角色权限
		permissionsService.addRolePermissions(record.getId(), permissions);

		Json json = new Json();

		json.setSuccess(true);
		json.setMsg("操作成功");

		return json;
	}

	/**
	 * 修改角色
	 * 
	 * @param name
	 * @param permissions
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "update", method = RequestMethod.POST)
	public @ResponseBody
	Json Update(Role role, String permissions) throws Exception {

		role.setDescription(role.getName());
		role.setUpdatedate(new Date());

		// 删除角色权限
		permissionsService.deleteRolePermissions(role.getId());

		// 修改角色
		roleService.updateRole(role);

		// 添加角色权限
		permissionsService.addRolePermissions(role.getId(), permissions);

		Json json = new Json();

		json.setSuccess(true);
		json.setMsg("操作成功");

		return json;
	}

	/**
	 * 删除角色
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	public @ResponseBody
	Json Delete(int id) throws Exception {

		roleService.deleteRole(id);

		Json json = new Json();
		json.setSuccess(true);
		json.setMsg("操作成功");

		return json;
	}

	/**
	 * 角色列表
	 * 
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public @ResponseBody
	@RequestMapping("/list")
	DataGrid UserList(PageHelper page) throws Exception {

		// page.setSort("Indentation");

		// page.setOrder("desc");
		// page.setPageIndex(2);

		// page.setPageSize(2);

		DataGrid dataGrid = new DataGrid();

		// 数据
		List<Role> list = roleService.getRoleList(page, "");

		// 设置条数
		dataGrid.setCount(roleService.getRoleListTotal(""));

		dataGrid.setData(list);

		return dataGrid;

	}

	/**
	 * 角色权限
	 * 
	 * @param RoleID
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getRolePermissions")
	public @ResponseBody
	List<Tree> GetRolePermissions(int roleId) throws Exception {
		// 角色具有的权限
		List<Permissions> rolePermissions = permissionsService
				.getRolePermissionsList(roleId);

		// 权限树
		List<Tree> trees = getPermissionTree(rolePermissions);

		return trees;
	}

	/**
	 * 得到权限树
	 * 
	 * @param data
	 * @return
	 */
	public List<Tree> getPermissionTree(List<Permissions> data) {

		List<Tree> resulTrees = new ArrayList<Tree>();

		int i = 0;

		for (Permissions item : data) {

			if (!hasTree(resulTrees, item.getGroupname())) {

				i++;

				Tree t1 = new Tree();

				t1.setId(i);

				t1.setText(item.getGroupname());

				t1.setChildren(getdata(data, item.getGroupname()));

				resulTrees.add(t1);
			}
		}

		return resulTrees;
	}

	/**
	 * 是否存在
	 * 
	 * @param data
	 *            数据
	 * @param name
	 *            名称
	 * @return
	 */
	public boolean hasTree(List<Tree> data, String name) {

		for (int i = 0; i < data.size(); i++) {

			if (data.get(i).getText().equals(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	 * 得到子节点
	 * 
	 * @param data
	 *            权限数据
	 * @param groupName
	 *            分组名称
	 * @return
	 */
	public List<Tree> getdata(List<Permissions> data, String groupName) {

		List<Tree> resulTrees = new ArrayList<Tree>();

		for (Permissions p : data) {

			if (p.getGroupname().equals(groupName)) {
				Tree t1 = new Tree();

				t1.setId(p.getId());
				t1.setText(p.getName());
				resulTrees.add(t1);
			}
		}

		return resulTrees;
	}
}

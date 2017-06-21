package com.only.controller.admin;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.only.mapper.UserMapper;
import com.only.model.Permissions;
import com.only.model.Role;
import com.only.model.User;
import com.only.model.UserCustom;
import com.only.model.UserQueryVo;
import com.only.model.UserRole;
import com.only.model.xgui.DataGrid;
import com.only.model.xgui.Json;
import com.only.model.xgui.PageHelper;
import com.only.model.xgui.Tree;
import com.only.service.PermissionsService;
import com.only.service.RoleService;
import com.only.service.UserRoleService;
import com.only.service.UserService;

/**
 * 用户控制器
 * 
 * @author lvlinguang
 * 
 */
@Controller
@RequestMapping("user")
public class UserController extends BaseController {

	@Autowired
	private UserService userService;

	@Autowired
	private RoleService roleService;

	@Autowired
	private UserRoleService userRoleService;

	@Autowired
	private PermissionsService permissionsService;

	// 登录界面
	@RequestMapping("/login")
	public String Login(HttpSession session) {

		// 得到session用户
		String uString = (String) session.getAttribute("username");

		// 如果已登录中转到首页
		if (uString != null) {
			return "redirect:/";
		}

		return "user/login";
	}

	// 登录验证
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public @ResponseBody
	Json login(HttpSession session, String Account, String PassWord,
			boolean Rememberme) throws Exception {

		// 设置session
		session.setAttribute("username", Account);

		Json json = new Json();

		json.setSuccess(true);
		json.setMsg("验证成功");

		return json;
		//
		// if (code.toLowerCase().equals(
		// request.getSession().getAttribute("RANDOMCODE").toString()
		// .toLowerCase())) {
		// User user = userService.findUserByName(loginname);
		// if (user == null) {
		// log.info("登陆用户名不存在");
		// request.getSession().setAttribute("message", "用户名不存在，请重新登录");
		// return "login";
		// } else {
		// if (user.getPassword().equals(password)) {
		//
		// if (autologinch != null && autologinch.equals("Y")) { //
		// 判断是否要添加到cookie中
		// // 保存用户信息到cookie
		// UserCookieUtil.saveCookie(user, response);
		// }
		//
		// // 保存用信息到session
		// request.getSession().setAttribute(Const.SESSION_USER, user);
		// return "redirect:" + RequestUtil.retrieveSavedRequest();// 跳转至访问页面
		//
		// } else {
		// log.info("登陆密码错误");
		// request.getSession().setAttribute("message",
		// "用户名密码错误，请重新登录");
		// return "login";
		// }
		// }
		// } else {
		// request.getSession().setAttribute("message", "验证码错误，请重新输入");
		// return "login";
		// }
	}

	// 用户注销
	@RequestMapping("/logout")
	public String logout(HttpSession session) {
		// 清除session
		session.invalidate();

		return "redirect:/user/login";
	}

	// 用户首页
	@RequestMapping("/")
	public ModelAndView Index() throws Exception {

		ModelAndView modelAndView = new ModelAndView();

		// 角色
		List<Role> roles = roleService.getRoleList(null, "");

		modelAndView.addObject("role", roles);

		modelAndView.setViewName("user/index");

		return modelAndView;
	}

	// 用户添加
	@RequestMapping("/add")
	public ModelAndView Add() throws Exception {

		ModelAndView modelAndView = new ModelAndView();

		// 用户权限
		List<Permissions> permissions = permissionsService
				.getUserPrmissionsList(UID());

		// 权限树
		List<Tree> trees = getPermissionTree(permissions);

		// 角色
		List<Role> roles = roleService.getRoleList(null, "");

		modelAndView.addObject("roles", roles);

		modelAndView.addObject("permissions", trees);

		modelAndView.setViewName("user/add");

		return modelAndView;
	}

	// 用户修改
	@RequestMapping("/update")
	public ModelAndView Update(Integer id) throws Exception {

		ModelAndView modelAndView = new ModelAndView();

		// 用户权限
		List<Permissions> permissions = permissionsService
				.getUserPrmissionsList(UID());

		// 权限树
		List<Tree> trees = getPermissionTree(permissions);

		// 用户权限
		List<Permissions> userpermissions = permissionsService
				.getUserPrmissionsList(id);

		// 权限树
		List<Tree> usertrees = getPermissionTree(userpermissions);

		// 角色
		List<Role> roles = roleService.getRoleList(null, "");

		// 用户详情
		User user = userService.getUserByID(id);

		// 用户角色
		UserRole userRole = userRoleService.getUserRoleByUser(id);

		modelAndView.addObject("userRole", userRole);

		modelAndView.addObject("roles", roles);

		modelAndView.addObject("user", user);

		modelAndView.addObject("permissions", trees);

		modelAndView.addObject("userpermissions", usertrees);

		modelAndView.setViewName("user/update");

		return modelAndView;
	}

	/**
	 * 添加用户
	 * 
	 * @param user
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/adduser", method = RequestMethod.POST)
	public @ResponseBody
	Json AddUser(User user, Integer roleId, String permissions)
			throws Exception {

		Json json = new Json();

		User checkUser = userService.getUserByAccount(user.getAccount());

		if (checkUser != null) {
			json.setSuccess(false);
			json.setMsg("此帐号已存在！");

			return json;
		}

		// 添加用户
		userService.addUser(user);

		// 添加用户角色
		userRoleService.addUserRole(user.getId(), roleId);

		// 添加用户权限
		permissionsService.addUserPermissions(user.getId(), permissions);

		json.setSuccess(true);
		json.setMsg("操作成功");

		return json;
	}

	/**
	 * 修改用户
	 * 
	 * @param user
	 * @param roleId
	 * @param permissions
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateuser", method = RequestMethod.POST)
	public @ResponseBody
	Json UpdateUser(User user, Integer roleId, String permissions)
			throws Exception {

		Json json = new Json();

		user.setUpdatedate(new Date());

		// 修改用户
		userService.updateUser(user);

		// 修改用户角色
		userRoleService.updateUserRole(user.getId(), roleId);

		// 删除用户权限
		permissionsService.deleteUserPermissions(user.getId());

		// 添加用户权限
		permissionsService.addUserPermissions(user.getId(), permissions);

		json.setSuccess(true);
		json.setMsg("操作成功");

		return json;
	}

	/**
	 * 用户列表
	 * 
	 * @param page
	 * @param roleid
	 * @param name
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "list", method = RequestMethod.POST)
	public @ResponseBody
	DataGrid getUser(PageHelper page, int roleid, String name) throws Exception {

		DataGrid dataGrid = new DataGrid();

		dataGrid.setCount(0);

		List<UserCustom> list = userService.getUserList(page, roleid, name);

		dataGrid.setData(list);

		return dataGrid;
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

package com.only.controller.admin;

import java.net.InetAddress;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.only.model.Permissions;
import com.only.model.Role;
import com.only.model.User;
import com.only.model.UserCustom;
import com.only.model.UserLogon;
import com.only.model.UserRole;
import com.only.model.common.DataGrid;
import com.only.model.common.Json;
import com.only.model.common.PageHelper;
import com.only.model.common.Tree;
import com.only.service.PermissionsService;
import com.only.service.RoleService;
import com.only.service.UserLogonService;
import com.only.service.UserRoleService;
import com.only.service.UserService;
import com.only.util.CookieUtil;
import com.only.util.Encrypt;
import com.only.util.Tool;

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

	@Autowired
	private UserLogonService userLogonService;

	// 登录界面
	@RequestMapping("login")
	public String Login(HttpServletRequest request, HttpSession session) throws NumberFormatException, Exception {

		// 如果已登录中转到首页
		if (IsLogin(request)) {
			return "redirect:/";
		}

		return "user/login";
	}

	// 登录验证
	@RequestMapping(value = "login", method = RequestMethod.POST)
	public @ResponseBody
	Json login(HttpServletRequest request, HttpServletResponse response, HttpSession session, String Account, String PassWord, boolean Rememberme)
			throws Exception {

		Json json = new Json();

		// 验证帐号是否存在
		User user = userService.getUserByAccount(Account);

		if (user == null) {
			json.setSuccess(false);
			json.setMsg("帐号不存在！");
			return json;
		}

		// 密码验证
		String pString = Encrypt.EncodeMD5(PassWord + user.getSalt());

		if (!pString.equals(user.getPassword())) {
			json.setSuccess(false);
			json.setMsg("密码不正确！");
			return json;
		}

		// 用户登录日志
		UserLogon userlogon = userLogonService.getUserLogonByUser(user.getId());

		// 更新用户信息
		if (userlogon != null) {

			User user2 = new User();
			user2.setId(user.getId());
			user2.setLastLogonDate(userlogon.getCreateDate());

			user2.setUpdateDate(new Date());
			userService.updateUser(user2);
		}

		// 删除登录日志
		userLogonService.deleteUserLogon(user.getId());

		// 添加登录日志
		UserLogon data = new UserLogon();
		data.setUserId(user.getId());
		data.setToken(UUID.randomUUID().toString().replace("-", ""));

		// 设置过期时间
		data.setExpiryDate(Tool.getDateAdd(new Date(), Calendar.DATE, 7));

		// ip地址
		String ip = InetAddress.getLocalHost().getHostAddress();

		data.setIpAddress(ip);

		userLogonService.addUserLogon(data);

		// 设置session
		session.setAttribute("user", user);

		// 记住密码
		if (Rememberme) {

			// 设置cookie
			CookieUtil.addCookie(request, response, "uid", user.getId().toString(), 7 * 24 * 3600);

			CookieUtil.addCookie(request, response, "valid", data.getToken(), 7 * 24 * 3600);
		}

		json.setSuccess(true);
		json.setMsg("验证成功");
		return json;

	}

	// 用户注销
	@RequestMapping("logout")
	public String logout(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		// 清除session
		session.invalidate();

		CookieUtil.removeCookie(request, response, "uid");

		CookieUtil.removeCookie(request, response, "valid");

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
	@RequestMapping("add")
	public ModelAndView Add(HttpServletRequest request) throws Exception {

		ModelAndView modelAndView = new ModelAndView();

		// 用户权限
		List<Permissions> permissions = permissionsService.getUserPrmissionsList(UID(request));

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
	@RequestMapping("update")
	public ModelAndView Update(HttpServletRequest request, Integer id) throws Exception {

		ModelAndView modelAndView = new ModelAndView();

		// 用户权限
		List<Permissions> permissions = permissionsService.getUserPrmissionsList(UID(request));

		// 权限树
		List<Tree> trees = getPermissionTree(permissions);

		// 用户权限
		List<Permissions> userpermissions = permissionsService.getUserPrmissionsList(id);

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
	@RequestMapping(value = "adduser", method = RequestMethod.POST)
	public @ResponseBody
	Json AddUser(User user, Integer roleId, String permissions) throws Exception {

		Json json = new Json();

		User checkUser = userService.getUserByAccount(user.getAccount());

		if (checkUser != null) {
			json.setSuccess(false);
			json.setMsg("此帐号已存在！");

			return json;
		}

		String salt = UUID.randomUUID().toString().replace("-", "");

		String hashedPassword = Encrypt.EncodeMD5(user.getPassword() + salt);

		user.setSalt(salt);

		// md5加密
		user.setPassword(hashedPassword);

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
	@RequestMapping(value = "updateuser", method = RequestMethod.POST)
	public @ResponseBody
	Json UpdateUser(User user, Integer roleId, String permissions) throws Exception {

		Json json = new Json();

		user.setUpdateDate(new Date());

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

		page.setSort("create_date");
		page.setOrder("desc");

		DataGrid dataGrid = new DataGrid();

		int count = userService.getUserListTotal(roleid, name);

		dataGrid.setCount(count);

		List<UserCustom> list = userService.getUserList(page, roleid, name);

		dataGrid.setData(list);

		return dataGrid;
	}

	/**
	 * 修改密码
	 * 
	 * @param userid
	 * @param password
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "reset", method = RequestMethod.POST)
	public @ResponseBody
	Json Reset(int id, String password) throws Exception {
		Json json = new Json();

		User user = new User();

		user.setId(id);

		String salt = UUID.randomUUID().toString().replace("-", "");

		String hashedPassword = Encrypt.EncodeMD5(password + salt);

		user.setSalt(salt);

		// md5加密
		user.setPassword(hashedPassword);

		// 修改用户
		userService.updateUser(user);

		json.setSuccess(true);
		json.setMsg("操作成功");

		return json;
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

			if (!hasTree(resulTrees, item.getGroupName())) {

				i++;

				Tree t1 = new Tree();

				t1.setId(i);

				t1.setText(item.getGroupName());

				t1.setChildren(getdata(data, item.getGroupName()));

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

			if (p.getGroupName().equals(groupName)) {
				Tree t1 = new Tree();

				t1.setId(p.getId());
				t1.setText(p.getName());
				resulTrees.add(t1);
			}
		}

		return resulTrees;
	}

}

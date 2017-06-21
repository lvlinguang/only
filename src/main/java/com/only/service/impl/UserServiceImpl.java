package com.only.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.only.mapper.UserMapper;
import com.only.model.User;
import com.only.model.UserCustom;
import com.only.model.UserQueryVo;
import com.only.model.xgui.PageHelper;
import com.only.service.UserService;

/**
 * 用户信息类实现
 * 
 * @author lvlinguang
 * 
 */
public class UserServiceImpl implements UserService {

	@Autowired
	private UserMapper userMapper;

	/**
	 * 添加用户
	 */
	public void addUser(User user) throws Exception {

		userMapper.addUser(user);
	}

	/**
	 * 修改用户
	 */
	public void updateUser(User user) throws Exception {

		userMapper.updateUser(user);
	}

	/**
	 * 根据帐号得到用户
	 */
	public User getUserByAccount(String account) throws Exception {

		return userMapper.getUserByAccount(account);
	}

	/**
	 * 得到用户列表
	 */
	public List<UserCustom> getUserList(PageHelper page, int roleid, String name)
			throws Exception {

		if (page != null) {

			// 起始条数
			page.setStart((page.getPageIndex() - 1) * page.getPageSize());

			// 结束条数
			// page.setEnd(page.getPageIndex() * page.getPageSize());
			page.setEnd(page.getPageSize());
		}

		return userMapper.getUserList(page, roleid, name);
	}

}

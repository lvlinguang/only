package com.only.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.only.mapper.UserMapper;
import com.only.model.User;
import com.only.model.UserCustom;
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

}

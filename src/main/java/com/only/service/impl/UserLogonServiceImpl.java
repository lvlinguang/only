package com.only.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.only.mapper.UserLogonMapper;
import com.only.model.UserLogon;
import com.only.service.UserLogonService;

/**
 * 用户登录日志
 * 
 * @author lvlinguang
 * 
 */
public class UserLogonServiceImpl implements UserLogonService {

	@Autowired
	private UserLogonMapper userlogonMapper;

	/**
	 * 添加登录日志
	 */
	public void addUserLogon(UserLogon userlogon) throws Exception {

		userlogonMapper.addUserLogon(userlogon);

	}

	/**
	 * 删除登录日志
	 */
	public void deleteUserLogon(int userid) throws Exception {

		userlogonMapper.deleteUserLogon(userid);

	}

	/**
	 * 根据用户得到登录日志
	 */
	public UserLogon getUserLogonByUser(int userid) throws Exception {

		return userlogonMapper.getUserLogonByUser(userid);
	}

}

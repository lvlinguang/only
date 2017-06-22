package com.only.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.only.mapper.UserlogonMapper;
import com.only.model.Userlogon;
import com.only.service.UserLogonService;

/**
 * 用户登录日志
 * 
 * @author lvlinguang
 * 
 */
public class UserLogonServiceImpl implements UserLogonService {

	@Autowired
	private UserlogonMapper userlogonMapper;

	/**
	 * 添加登录日志
	 */
	public void addUserLogon(Userlogon userlogon) throws Exception {

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
	public Userlogon getUserLogonByUser(int userid) throws Exception {

		return userlogonMapper.getUserLogonByUser(userid);
	}

}

package com.only.service;

import com.only.entity.UserLogon;

/**
 * 用户登录日志
 * 
 * @author lvlinguang
 * 
 */
public interface UserLogonService {

	/**
	 * 添加登录日志
	 * 
	 * @param userlogon
	 * @throws Exception
	 */
	public void addUserLogon(UserLogon userlogon) throws Exception;

	/**
	 * 删除登录日志
	 * 
	 * @param userid
	 * @throws Exception
	 */
	public void deleteUserLogon(int userid) throws Exception;

	/**
	 * 日志详情
	 * 
	 * @param userid
	 * @return
	 * @throws Exception
	 */
	public UserLogon getUserLogonByUser(int userid) throws Exception;
}

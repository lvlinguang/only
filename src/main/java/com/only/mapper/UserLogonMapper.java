package com.only.mapper;

import com.only.model.UserLogon;

/**
 * 用户登录日志
 * 
 * @author lvlinguang
 * 
 */
public interface UserLogonMapper {

	/**
	 * 添加登录日志
	 * 
	 * @param UserLogon
	 * @throws Exception
	 */
	public void addUserLogon(UserLogon UserLogon)
			throws Exception;

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
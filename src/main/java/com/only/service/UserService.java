package com.only.service;

import com.only.model.User;

/**
 * 用户信息接口
 * 
 * @author lvlinguang
 * 
 */
public interface UserService {

	/**
	 * 添加用户
	 * 
	 * @param user
	 * @throws Exception
	 */
	public void addUser(User user) throws Exception;

	/**
	 * 修改用户
	 * 
	 * @param user
	 * @throws Exception
	 */
	public void updateUser(User user) throws Exception;
}

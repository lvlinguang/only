package com.only.mapper;

import com.only.model.User;

/**
 * 用户管理
 * 
 * @author lvlinguang
 * 
 */
public interface UserMapper {

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
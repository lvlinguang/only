package com.only.service;

import java.util.List;

import com.only.entity.User;
import com.only.entity.UserCustom;
import com.only.model.common.PageHelper;

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

	/**
	 * 根据id得到用户
	 * 
	 * @param id
	 * @return
	 * @throws exception
	 */
	public User getUserByID(int id) throws Exception;

	/**
	 * 根据帐号得到用户
	 * 
	 * @param account
	 * @return
	 * @throws Exception
	 */
	public User getUserByAccount(String account) throws Exception;

	/**
	 * 用户列表条数
	 * 
	 * @param roleid
	 * @param name
	 * @return
	 * @throws Exception
	 */
	public int getUserListTotal(int roleid, String name) throws Exception;

	/**
	 * 得到用户列表
	 * 
	 * @param roleid
	 * @param name
	 * @return
	 * @throws Exception
	 */
	public List<UserCustom> getUserList(PageHelper page, int roleid, String name) throws Exception;
}

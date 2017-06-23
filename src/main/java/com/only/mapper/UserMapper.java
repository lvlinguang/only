package com.only.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.only.model.User;
import com.only.model.UserCustom;
import com.only.model.UserRole;
import com.only.model.common.PageHelper;

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
	public User getUserByAccount(@Param("account") String account)
			throws Exception;

	/**
	 * 用户列表条数
	 * 
	 * @param roleid
	 * @param name
	 * @return
	 * @throws Exception
	 */
	public int getUserListTotal(@Param("roleid") int roleid,
			@Param("name") String name) throws Exception;

	/**
	 * 得到用户列表
	 * 
	 * @param roleid
	 * @param name
	 * @return
	 * @throws Exception
	 */
	public List<UserCustom> getUserList(@Param("page") PageHelper page,
			@Param("roleid") int roleid, @Param("name") String name)
			throws Exception;

}
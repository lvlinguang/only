package com.only.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.only.model.Group;
import com.only.model.common.PageHelper;

/**
 * 分组管理
 * 
 * @author lvlinguang
 * 
 */
public interface GroupMapper {

	/**
	 * 添加分组
	 * 
	 * @param Group
	 * @throws Exception
	 */
	public void addGroup(Group group) throws Exception;

	/**
	 * 修改分组
	 * 
	 * @param Group
	 * @throws Exception
	 */
	public void updateGroup(Group group) throws Exception;

	/**
	 * 删除分组
	 * 
	 * @param id
	 * @throws Exception
	 */
	public void deleteGroup(int id) throws Exception;

	/**
	 * 分组列表数量
	 * 
	 * @param name
	 * @return
	 * @throws Exception
	 */
	public int getGroupListTotal(@Param("name") String name) throws Exception;

	/**
	 * 分组列表
	 * 
	 * @param page
	 * @param name
	 * @return
	 * @throws Exception
	 */
	public List<Group> getGroupList(@Param("page") PageHelper page, @Param("name") String name) throws Exception;
}

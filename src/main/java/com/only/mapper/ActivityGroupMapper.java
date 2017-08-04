package com.only.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.only.entity.ActivityGroup;
import com.only.model.common.PageHelper;

/**
 * 分组管理
 * 
 * @author lvlinguang
 * 
 */
public interface ActivityGroupMapper {

	/**
	 * 添加分组
	 * 
	 * @param ActivityGroup
	 * @throws Exception
	 */
	public void addActivityGroup(ActivityGroup activityGroup) throws Exception;

	/**
	 * 修改分组
	 * 
	 * @param ActivityGroup
	 * @throws Exception
	 */
	public void updateActivityGroup(ActivityGroup activityGroup) throws Exception;

	/**
	 * 删除分组
	 * 
	 * @param id
	 * @throws Exception
	 */
	public void deleteActivityGroup(int id) throws Exception;

	/**
	 * 分组列表数量
	 * 
	 * @param name
	 * @return
	 * @throws Exception
	 */
	public int getActivityGroupListTotal(@Param("name") String name) throws Exception;

	/**
	 * 分组列表
	 * 
	 * @param page
	 * @param name
	 * @return
	 * @throws Exception
	 */
	public List<ActivityGroup> getActivityGroupList(@Param("page") PageHelper page, @Param("name") String name) throws Exception;
}

package com.only.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.only.entity.ActivityGroup;
import com.only.mapper.ActivityGroupMapper;
import com.only.model.common.PageHelper;
import com.only.service.ActivityGroupService;

/**
 * 活动分组
 * 
 * @author lvlinguang
 * 
 */
public class ActivityGroupServiceImpl implements ActivityGroupService {

	@Autowired
	private ActivityGroupMapper activityGroupMapper;

	/**
	 * 添加分组
	 */
	public void addActivityGroup(ActivityGroup activityGroup) throws Exception {

		activityGroupMapper.addActivityGroup(activityGroup);
	}

	/**
	 * 修改分组
	 */
	public void updateActivityGroup(ActivityGroup activityGroup) throws Exception {

		activityGroupMapper.updateActivityGroup(activityGroup);

	}

	/**
	 * 删除分组
	 */
	public void deleteActivityGroup(Integer id) throws Exception {

		activityGroupMapper.deleteActivityGroup(id);

	}

	/**
	 * 分组列表统计
	 */
	public int getActivityGroupListTotal(String name) throws Exception {

		return activityGroupMapper.getActivityGroupListTotal(name);
	}

	/**
	 * 分组列表
	 */
	public List<ActivityGroup> getActivityGroupList(PageHelper page, String name) throws Exception {

		if (page != null) {

			// 起始条数
			page.setStart((page.getPageIndex() - 1) * page.getPageSize());

			// 结束条数
			page.setEnd(page.getPageSize());
		}

		return activityGroupMapper.getActivityGroupList(page, name);
	}

}

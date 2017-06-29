package com.only.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.only.model.ActivityGroup;
import com.only.model.common.DataGrid;
import com.only.model.common.Json;
import com.only.model.common.PageHelper;
import com.only.service.ActivityGroupService;

/**
 * 商品分组
 * 
 * @author lvlinguang
 * 
 */
@Controller
@RequestMapping("group")
public class GroupController {

	@Autowired
	private ActivityGroupService activityGroupService;

	/**
	 * 分组主页
	 * 
	 * @return
	 */
	@RequestMapping("/")
	public String index() {

		return "group/index";
	}

	/**
	 * 创建分组
	 * 
	 * @param activityGroup
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "add", method = RequestMethod.POST)
	public @ResponseBody
	Json Add(ActivityGroup activityGroup) throws Exception {

		activityGroupService.addActivityGroup(activityGroup);

		Json json = new Json();

		json.setSuccess(true);
		json.setMsg("操作成功");

		return json;
	}

	/**
	 * 修改分组
	 * 
	 * @param activityGroup
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "update", method = RequestMethod.POST)
	public @ResponseBody
	Json Update(ActivityGroup activityGroup) throws Exception {

		activityGroupService.updateActivityGroup(activityGroup);

		Json json = new Json();

		json.setSuccess(true);
		json.setMsg("操作成功");

		return json;
	}

	/**
	 * 删除分组
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	public @ResponseBody
	Json Delete(int id) throws Exception {

		activityGroupService.deleteActivityGroup(id);

		Json json = new Json();
		json.setSuccess(true);
		json.setMsg("操作成功");

		return json;
	}

	/**
	 * 分组列表
	 * 
	 * @param page
	 * @param keyWord
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("list")
	public @ResponseBody
	DataGrid UserList(PageHelper page, String keyWord) throws Exception {

		DataGrid dataGrid = new DataGrid();

		// 数据
		List<ActivityGroup> list = activityGroupService.getActivityGroupList(page, keyWord);

		// 设置条数
		dataGrid.setCount(activityGroupService.getActivityGroupListTotal(keyWord));

		dataGrid.setData(list);

		return dataGrid;

	}

}

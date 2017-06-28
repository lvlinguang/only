package com.only.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.only.model.ProductCategory;
import com.only.model.common.DataGrid;
import com.only.model.common.Json;
import com.only.model.common.PageHelper;
import com.only.service.ProductCategoryService;

/**
 * 分类
 * 
 * @author lvlinguang
 * 
 */
@Controller
@RequestMapping("category")
public class CategoryController extends BaseController {

	@Autowired
	private ProductCategoryService productCategoryService;

	/**
	 * 分类主页
	 * 
	 * @return
	 */
	@RequestMapping("/")
	public String index() {

		return "category/index";
	}

	/**
	 * 创建分类
	 * 
	 * @param productCategory
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "add", method = RequestMethod.POST)
	public @ResponseBody
	Json Add(ProductCategory productCategory) throws Exception {

		productCategory.setCanshow(true);

		productCategoryService.addCategory(productCategory);

		Json json = new Json();

		json.setSuccess(true);
		json.setMsg("操作成功");

		return json;
	}

	/**
	 * 修改分类
	 * 
	 * @param productCategory
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "update", method = RequestMethod.POST)
	public @ResponseBody
	Json Update(ProductCategory productCategory) throws Exception {

		productCategoryService.updateCategory(productCategory);

		Json json = new Json();

		json.setSuccess(true);
		json.setMsg("操作成功");

		return json;
	}

	/**
	 * 删除分类
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	public @ResponseBody
	Json Delete(int id) throws Exception {

		productCategoryService.deleteCategory(id);

		Json json = new Json();
		json.setSuccess(true);
		json.setMsg("操作成功");

		return json;
	}

	/**
	 * 分类列表
	 * 
	 * @param page
	 * @return
	 * @throws Exception
	 */
	public @ResponseBody
	@RequestMapping("list")
	DataGrid UserList(PageHelper page, String keyWord) throws Exception {

		// page.setSort("Indentation");

		// page.setOrder("desc");
		// page.setPageIndex(2);

		// page.setPageSize(2);

		DataGrid dataGrid = new DataGrid();

		// 数据
		List<ProductCategory> list = productCategoryService.getCategoryList(page, keyWord);

		// 设置条数
		dataGrid.setCount(productCategoryService.getCategoryListTotal(keyWord));

		dataGrid.setData(list);

		return dataGrid;

	}
}

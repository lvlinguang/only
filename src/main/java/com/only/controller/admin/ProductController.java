package com.only.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.only.entity.Product;
import com.only.entity.ProductCustom;
import com.only.model.common.DataGrid;
import com.only.model.common.Json;
import com.only.model.common.PageHelper;
import com.only.service.ProductService;

/**
 * 商品管理
 * 
 * @author lvlinguang
 * 
 */
@Controller
@RequestMapping("product")
public class ProductController extends BaseController {

	@Autowired
	private ProductService productService;

	/*
	 * 首页
	 */
	@RequestMapping("")
	public String index() {

		return "product/index";
	}

	/*
	 * 添加商品
	 */
	@RequestMapping(value = "add", method = RequestMethod.GET)
	public String add() {

		return "product/add";
	}

	/*
	 * 修改商品
	 */
	@RequestMapping(value = "update", method = RequestMethod.GET)
	public String update() {

		return "product/update";
	}

	/**
	 * 添加商品
	 * 
	 * @param product
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "add", method = RequestMethod.POST)
	public @ResponseBody
	Json add(Product product) throws Exception {

		productService.addProduct(product);

		Json json = new Json();

		json.setSuccess(true);
		json.setMsg("操作成功");
		return json;
	}

	/**
	 * 修改商品
	 * 
	 * @param product
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "update", method = RequestMethod.POST)
	public @ResponseBody
	Json update(Product product) throws Exception {

		productService.updateProduct(product);

		Json json = new Json();

		json.setSuccess(true);
		json.setMsg("操作成功");
		return json;
	}

	/**
	 * 删除商品
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	public @ResponseBody
	Json Delete(int id) throws Exception {

		productService.deleteProduct(id);

		Json json = new Json();

		json.setSuccess(true);
		json.setMsg("操作成功");
		return json;
	}

	/**
	 * 商品上架/下架
	 * 
	 * @param id
	 * @param flag
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "upanddown", method = RequestMethod.POST)
	public @ResponseBody
	Json upAndDown(int id, int flag) throws Exception {

		productService.upAndDownProduct(id, flag);

		Json json = new Json();

		json.setSuccess(true);
		json.setMsg("操作成功");
		return json;
	}

	/**
	 * 商品列表
	 * 
	 * @param page
	 * @param category_id
	 * @param name
	 * @param flag
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "list", method = RequestMethod.POST)
	public @ResponseBody
	DataGrid ProductList(PageHelper page, int category_id, String name, int flag) throws Exception {

		DataGrid dataGrid = new DataGrid();

		List<ProductCustom> list = productService.getproductList(page, category_id, name, flag);

		dataGrid.setCount(productService.getproductTotal(category_id, name, flag));

		dataGrid.setData(list);

		return dataGrid;
	}
}

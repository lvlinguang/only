package com.only.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

import com.only.service.CategoryService;

/**
 * 分类
 * 
 * @author lvlinguang
 * 
 */
@RequestMapping("/category")
public class CategoryController extends BaseController {

	@Autowired
	private CategoryService categoryService;

	/**
	 * 分类主页
	 * 
	 * @return
	 */
	@RequestMapping("/")
	public String index() {

		return "category/index";
	}
}

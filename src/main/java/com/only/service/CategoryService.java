package com.only.service;

import java.util.List;

import com.only.model.Category;
import com.only.model.common.PageHelper;

/**
 * 分类管理
 * 
 * @author lvlinguang
 * 
 */
public interface CategoryService {

	/**
	 * 添加分类
	 * 
	 * @param category
	 * @throws Exception
	 */
	public void addCategory(Category category) throws Exception;

	/**
	 * 修改分类
	 * 
	 * @param category
	 * @throws Exception
	 */
	public void updateCategory(Category category) throws Exception;

	/**
	 * 删除分类
	 * 
	 * @param id
	 * @throws Exception
	 */
	public void deleteCategory(int id) throws Exception;

	/**
	 * 分类列表数量
	 * 
	 * @param name
	 * @return
	 * @throws Exception
	 */
	public int getCategoryListTotal(String name) throws Exception;

	/**
	 * 分类列表
	 * 
	 * @param page
	 * @param name
	 * @return
	 * @throws Exception
	 */
	public List<Category> getCategoryList(PageHelper page, String name) throws Exception;
}

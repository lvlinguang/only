package com.only.service;

import java.util.List;

import com.only.entity.ProductCategory;
import com.only.model.common.PageHelper;

/**
 * 分类管理
 * 
 * @author lvlinguang
 * 
 */
public interface ProductCategoryService {

	/**
	 * 添加分类
	 * 
	 * @param category
	 * @throws Exception
	 */
	public void addCategory(ProductCategory productCategory) throws Exception;

	/**
	 * 修改分类
	 * 
	 * @param category
	 * @throws Exception
	 */
	public void updateCategory(ProductCategory productCategory) throws Exception;

	/**
	 * 删除分类
	 * 
	 * @param id
	 * @throws Exception
	 */
	public void deleteCategory(Integer id) throws Exception;

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
	public List<ProductCategory> getCategoryList(PageHelper page, String name) throws Exception;
}

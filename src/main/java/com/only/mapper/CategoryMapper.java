package com.only.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.only.model.Category;
import com.only.model.common.PageHelper;

/**
 * 分类
 * 
 * @author lvlinguang
 * 
 */
public interface CategoryMapper {

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
	public int getCategoryListTotal(@Param("name") String name) throws Exception;

	/**
	 * 分类列表
	 * 
	 * @param page
	 * @param name
	 * @return
	 * @throws Exception
	 */
	public List<Category> getCategoryList(@Param("page") PageHelper page, @Param("name") String name) throws Exception;
}

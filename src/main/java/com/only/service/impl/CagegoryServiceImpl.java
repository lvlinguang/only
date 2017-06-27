package com.only.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.only.mapper.CategoryMapper;
import com.only.model.Category;
import com.only.model.common.PageHelper;
import com.only.service.CategoryService;

/**
 * 分类管理
 * 
 * @author lvlinguang
 * 
 */
public class CagegoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryMapper categoryMapper;

	/**
	 * 添加分类
	 */
	public void addCategory(Category category) throws Exception {

		categoryMapper.addCategory(category);

	}

	/**
	 * 修改分类
	 */
	public void updateCategory(Category category) throws Exception {
		categoryMapper.updateCategory(category);

	}

	/**
	 * 删除分类
	 */
	public void deleteCategory(int id) throws Exception {
		categoryMapper.deleteCategory(id);

	}

	/**
	 * 分类条数
	 */
	public int getCategoryListTotal(String name) throws Exception {

		return categoryMapper.getCategoryListTotal(name);
	}

	/**
	 * 分类列表
	 */
	public List<Category> getCategoryList(PageHelper page, String name) throws Exception {

		if (page != null) {

			// 起始条数
			page.setStart((page.getPageIndex() - 1) * page.getPageSize());

			// 结束条数
			page.setEnd(page.getPageSize());
		}

		return categoryMapper.getCategoryList(page, name);
	}

}

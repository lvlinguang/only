package com.only.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.only.mapper.ProductCategoryMapper;
import com.only.model.ProductCategory;
import com.only.model.common.PageHelper;
import com.only.service.ProductCategoryService;

/**
 * 分类管理
 * 
 * @author lvlinguang
 * 
 */
public class ProductCagegoryServiceImpl implements ProductCategoryService {

	@Autowired
	private ProductCategoryMapper productCategoryMapper;

	/**
	 * 添加分类
	 */
	public void addCategory(ProductCategory productCategory) throws Exception {

		productCategoryMapper.addProductCategory(productCategory);

	}

	/**
	 * 修改分类
	 */
	public void updateCategory(ProductCategory productCategory) throws Exception {
		productCategoryMapper.updateProductCategory(productCategory);

	}

	/**
	 * 删除分类
	 */
	public void deleteCategory(int id) throws Exception {

		productCategoryMapper.deleteProductCategory(id);

	}

	/**
	 * 分类条数
	 */
	public int getCategoryListTotal(String name) throws Exception {

		return productCategoryMapper.getProductCategoryListTotal(name);
	}

	/**
	 * 分类列表
	 */
	public List<ProductCategory> getCategoryList(PageHelper page, String name) throws Exception {

		if (page != null) {

			// 起始条数
			page.setStart((page.getPageIndex() - 1) * page.getPageSize());

			// 结束条数
			page.setEnd(page.getPageSize());
		}

		return productCategoryMapper.getProductCategoryList(page, name);
	}

}

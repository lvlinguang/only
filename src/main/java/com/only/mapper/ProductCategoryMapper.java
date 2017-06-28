package com.only.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.only.model.ProductCategory;
import com.only.model.common.PageHelper;

/**
 * 分类
 * 
 * @author lvlinguang
 * 
 */
public interface ProductCategoryMapper {

	/**
	 * 添加分类
	 * 
	 * @param ProductCategory
	 * @throws Exception
	 */
	public void addProductCategory(ProductCategory productCategory) throws Exception;

	/**
	 * 修改分类
	 * 
	 * @param ProductCategory
	 * @throws Exception
	 */
	public void updateProductCategory(ProductCategory productCategory) throws Exception;

	/**
	 * 删除分类
	 * 
	 * @param id
	 * @throws Exception
	 */
	public void deleteProductCategory(int id) throws Exception;

	/**
	 * 分类列表数量
	 * 
	 * @param name
	 * @return
	 * @throws Exception
	 */
	public int getProductCategoryListTotal(@Param("name") String name) throws Exception;

	/**
	 * 分类列表
	 * 
	 * @param page
	 * @param name
	 * @return
	 * @throws Exception
	 */
	public List<ProductCategory> getProductCategoryList(@Param("page") PageHelper page, @Param("name") String name) throws Exception;
}

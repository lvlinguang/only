package com.only.service;

import java.util.List;

import com.only.entity.Product;
import com.only.entity.ProductCustom;
import com.only.model.common.PageHelper;

/**
 * 商品管理
 * 
 * @author lvlinguang
 * 
 */
public interface ProductService {

	/**
	 * 添加商品
	 * 
	 * @param product
	 * @throws Exception
	 */
	public void addProduct(Product product) throws Exception;

	/**
	 * 修改商品
	 * 
	 * @param product
	 * @throws Exception
	 */
	public void updateProduct(Product product) throws Exception;

	/**
	 * 商品上架/下架
	 * 
	 * @param id
	 * @param flag
	 * @throws Exception
	 */
	public void upAndDownProduct(Integer id, int flag) throws Exception;

	/**
	 * 删除商品
	 * 
	 * @param id
	 * @throws Exception
	 */
	public void deleteProduct(Integer id) throws Exception;

	/**
	 * 商品列表条数
	 * 
	 * @param category_id
	 * @param name
	 * @param flag
	 * @return
	 */
	public int getproductTotal(Integer category_id, String name, Integer flag) throws Exception;

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
	public List<ProductCustom> getproductList(PageHelper page, Integer category_id, String name, Integer flag) throws Exception;
}

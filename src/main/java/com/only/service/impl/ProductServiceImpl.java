package com.only.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.only.entity.Product;
import com.only.entity.ProductCustom;
import com.only.mapper.ProductMapper;
import com.only.model.common.PageHelper;
import com.only.service.ProductService;

/**
 * 商品
 * 
 * @author lvlinguang
 * 
 */
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductMapper productMapper;

	/**
	 * 添加商品
	 */
	public void addProduct(Product product) throws Exception {

		productMapper.addProduct(product);
	}

	/**
	 * 修改商品
	 */
	public void updateProduct(Product product) throws Exception {

		productMapper.updateProduct(product);
	}

	/**
	 * 商品上架/下架
	 */
	public void upAndDownProduct(Integer id, int flag) throws Exception {

		productMapper.upAndDownProduct(id, flag);
	}

	/**
	 * 删除商品
	 */
	public void deleteProduct(Integer id) throws Exception {

		productMapper.deleteProduct(id);
	}

	/**
	 * 商品列表数量
	 */
	public int getproductTotal(Integer category_id, String name, Integer flag) throws Exception {

		return productMapper.getproductTotal(category_id, name, flag);
	}

	/**
	 * 商品列表
	 */
	public List<ProductCustom> getproductList(PageHelper page, Integer category_id, String name, Integer flag) throws Exception {

		return productMapper.getproductList(page, category_id, name, flag);
	}
}

package com.only.model.common;

/**
 * 分页
 * 
 * @author lvlinguang
 * 
 */
public class PageHelper {

	// 当前页
	private int pageIndex;

	// 每页大小
	private int pageSize;

	// 排序字段名
	private String sort = null;

	// 按什么排序（asc desc）
	private String order = "asc";

	// 起始条数
	private int start;

	// 结束条数
	private int end;

	public int getPageIndex() {
		return pageIndex;
	}

	public void setPageIndex(int pageIndex) {
		this.pageIndex = pageIndex;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public String getOrder() {
		return order;
	}

	public void setOrder(String order) {
		this.order = order;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getEnd() {
		return end;
	}

	public void setEnd(int end) {
		this.end = end;
	}

}

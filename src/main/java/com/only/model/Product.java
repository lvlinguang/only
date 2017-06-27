package com.only.model;

import java.util.Date;

/**
 * 商品管理
 * 
 * @author lvlinguang
 * 
 */
public class Product {
	private Integer id;

	private String name;

	private Integer categoryid;

	private String thumbnail;

	private Long price;

	private String artnamber;

	private Date puttime;

	private Date intime;

	private Date undertime;

	private Integer uid;

	private Date createdate;

	private Date updatedate;

	private Integer flag;

	private Integer cityid;

	private Boolean enalble;

	private String description;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name == null ? null : name.trim();
	}

	public Integer getCategoryid() {
		return categoryid;
	}

	public void setCategoryid(Integer categoryid) {
		this.categoryid = categoryid;
	}

	public String getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail == null ? null : thumbnail.trim();
	}

	public Long getPrice() {
		return price;
	}

	public void setPrice(Long price) {
		this.price = price;
	}

	public String getArtnamber() {
		return artnamber;
	}

	public void setArtnamber(String artnamber) {
		this.artnamber = artnamber == null ? null : artnamber.trim();
	}

	public Date getPuttime() {
		return puttime;
	}

	public void setPuttime(Date puttime) {
		this.puttime = puttime;
	}

	public Date getIntime() {
		return intime;
	}

	public void setIntime(Date intime) {
		this.intime = intime;
	}

	public Date getUndertime() {
		return undertime;
	}

	public void setUndertime(Date undertime) {
		this.undertime = undertime;
	}

	public Integer getUid() {
		return uid;
	}

	public void setUid(Integer uid) {
		this.uid = uid;
	}

	public Date getCreatedate() {
		return createdate;
	}

	public void setCreatedate(Date createdate) {
		this.createdate = createdate;
	}

	public Date getUpdatedate() {
		return updatedate;
	}

	public void setUpdatedate(Date updatedate) {
		this.updatedate = updatedate;
	}

	public Integer getFlag() {
		return flag;
	}

	public void setFlag(Integer flag) {
		this.flag = flag;
	}

	public Integer getCityid() {
		return cityid;
	}

	public void setCityid(Integer cityid) {
		this.cityid = cityid;
	}

	public Boolean getEnalble() {
		return enalble;
	}

	public void setEnalble(Boolean enalble) {
		this.enalble = enalble;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description == null ? null : description.trim();
	}
}
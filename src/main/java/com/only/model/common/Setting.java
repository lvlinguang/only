package com.only.model.common;

import java.io.Serializable;

/**
 * 系统配置
 * 
 * @author lvlinguang
 * 
 */
public class Setting implements Serializable {

	/** 网站名称 */
	private String siteName;

	/** 网站网址 */
	private String siteUrl;

	/** 联系地址 */
	private String address;

	/** 联系电话 */
	private String phone;

	/** E-mail */
	private String email;

	/** 备案编号 */
	private String certtext;

	/** 上传文件最大限制 */
	private Integer uploadMaxSize;

	/** 允许上传图片扩展名 */
	private String uploadImageExtension;

	/** 允许上传文件扩展名 */
	private String uploadFileExtension;

	/** 图片上传路径 */
	private String imageUploadPath;

	/** 是否开启开发模式 */
	private Boolean isDevelopmentEnabled;

	/** Cookie路径 */
	private String cookiePath;

	/** Cookie作用域 */
	private String cookieDomain;

	/**
	 * 网站名称
	 * 
	 * @return
	 */
	public String getSiteName() {
		return siteName;
	}

	/**
	 * 设置网站名称
	 * 
	 * @param siteName
	 *            网站名称
	 */
	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}

	/**
	 * 得到网站地址
	 * 
	 * @return
	 */
	public String getSiteUrl() {
		return siteUrl;
	}

	/**
	 * 设置网站地址
	 * 
	 * @param siteUrl
	 *            网站地址
	 */
	public void setSiteUrl(String siteUrl) {
		this.siteUrl = siteUrl;
	}

	/**
	 * 得到公司地址
	 * 
	 * @return
	 */
	public String getAddress() {
		return address;
	}

	/**
	 * 设置公司地址
	 * 
	 * @param address
	 */
	public void setAddress(String address) {
		this.address = address;
	}

	/**
	 * 得到联系电话
	 * 
	 * @return
	 */
	public String getPhone() {
		return phone;
	}

	/**
	 * 设置联系电话
	 * 
	 * @param phone
	 *            电话
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}

	/**
	 * 得到邮件
	 * 
	 * @return
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * 设置邮件
	 * 
	 * @param email
	 *            邮件
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * 得到备案编号
	 * 
	 * @return
	 */
	public String getCerttext() {
		return certtext;
	}

	/**
	 * 设置备案号
	 * 
	 * @param certtext
	 */
	public void setCerttext(String certtext) {
		this.certtext = certtext;
	}

	/**
	 * 得到上传文件最大限制
	 * 
	 * @return
	 */
	public Integer getUploadMaxSize() {
		return uploadMaxSize;
	}

	/**
	 * 设置上传文件最大限制
	 * 
	 * @param uploadMaxSize
	 */
	public void setUploadMaxSize(Integer uploadMaxSize) {
		this.uploadMaxSize = uploadMaxSize;
	}

	/**
	 * 得到允许上传图片扩展名
	 * 
	 * @return
	 */
	public String getUploadImageExtension() {
		return uploadImageExtension;
	}

	/**
	 * 设置允许上传图片扩展名
	 * 
	 * @param uploadImageExtension
	 */
	public void setUploadImageExtension(String uploadImageExtension) {
		this.uploadImageExtension = uploadImageExtension;
	}

	/**
	 * 得到允许上传文件扩展名
	 * 
	 * @return
	 */
	public String getUploadFileExtension() {
		return uploadFileExtension;
	}

	/**
	 * 设置允许上传文件扩展名
	 * 
	 * @param uploadFileExtension
	 */
	public void setUploadFileExtension(String uploadFileExtension) {
		this.uploadFileExtension = uploadFileExtension;
	}

	/**
	 * 图片上传路径
	 * 
	 * @return
	 */
	public String getImageUploadPath() {
		return imageUploadPath;
	}

	/**
	 * 图片上传路径
	 * 
	 * @param imageUploadPath
	 */
	public void setImageUploadPath(String imageUploadPath) {
		this.imageUploadPath = imageUploadPath;
	}

	/**
	 * 是否开启开发模式
	 * 
	 * @return
	 */
	public Boolean getIsDevelopmentEnabled() {
		return isDevelopmentEnabled;
	}

	/**
	 * 是否开启开发模式
	 * 
	 * @param isDevelopmentEnabled
	 */
	public void setIsDevelopmentEnabled(Boolean isDevelopmentEnabled) {
		this.isDevelopmentEnabled = isDevelopmentEnabled;
	}

	/**
	 * Cookie路径
	 * 
	 * @return
	 */
	public String getCookiePath() {
		return cookiePath;
	}

	/**
	 * Cookie路径
	 * 
	 * @param cookiePath
	 */
	public void setCookiePath(String cookiePath) {
		this.cookiePath = cookiePath;
	}

	/**
	 * Cookie作用域
	 * 
	 * @return
	 */
	public String getCookieDomain() {
		return cookieDomain;
	}

	/**
	 * Cookie作用域
	 * 
	 * @param cookieDomain
	 */
	public void setCookieDomain(String cookieDomain) {
		this.cookieDomain = cookieDomain;
	}

}

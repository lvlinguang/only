package com.only.model;

import java.util.Date;

/**
 * 活动管理
 * 
 * @author lvlinguang
 * 
 */
public class Activity {

	private Integer id;

	private Integer productid;

	private Integer groupid;

	private Integer totalcount;

	private Integer periods;

	private Integer status;

	private Date startdate;

	private Integer uid;

	private Date createdate;

	private Date updatedate;

	private Integer audituid;

	private Date auditdate;

	private Integer auditstatus;

	private Long price;

	private Integer lssuenumber;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getProductid() {
		return productid;
	}

	public void setProductid(Integer productid) {
		this.productid = productid;
	}

	public Integer getGroupid() {
		return groupid;
	}

	public void setGroupid(Integer groupid) {
		this.groupid = groupid;
	}

	public Integer getTotalcount() {
		return totalcount;
	}

	public void setTotalcount(Integer totalcount) {
		this.totalcount = totalcount;
	}

	public Integer getPeriods() {
		return periods;
	}

	public void setPeriods(Integer periods) {
		this.periods = periods;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Date getStartdate() {
		return startdate;
	}

	public void setStartdate(Date startdate) {
		this.startdate = startdate;
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

	public Integer getAudituid() {
		return audituid;
	}

	public void setAudituid(Integer audituid) {
		this.audituid = audituid;
	}

	public Date getAuditdate() {
		return auditdate;
	}

	public void setAuditdate(Date auditdate) {
		this.auditdate = auditdate;
	}

	public Integer getAuditstatus() {
		return auditstatus;
	}

	public void setAuditstatus(Integer auditstatus) {
		this.auditstatus = auditstatus;
	}

	public Long getPrice() {
		return price;
	}

	public void setPrice(Long price) {
		this.price = price;
	}

	public Integer getLssuenumber() {
		return lssuenumber;
	}

	public void setLssuenumber(Integer lssuenumber) {
		this.lssuenumber = lssuenumber;
	}
}
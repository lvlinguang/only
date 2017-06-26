package com.only.util;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

/**
 * 工具类
 * 
 * @author lvlinguang
 * 
 */
public class Tool {

	/**
	 * 得到日期增减
	 * 
	 * @param date
	 *            时间
	 * @param field
	 *            类型（天：calendar.DATE）
	 * @param amount
	 *            天数、月数、年数
	 * @return
	 */
	public static Date getDateAdd(Date date, int field, int amount) {

		Calendar calendar = new GregorianCalendar();

		calendar.setTime(date);
		calendar.add(field, amount);

		return calendar.getTime();
	}

}

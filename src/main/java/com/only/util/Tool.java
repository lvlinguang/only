package com.only.util;

import java.io.File;
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

		Calendar calendar = Calendar.getInstance();

		calendar.setTime(date);
		calendar.add(field, amount);

		return calendar.getTime();
	}

	/**
	 * 递归删除文件及目录
	 * 
	 * @param file
	 */
	public static void deleteFile(File file) {

		// 是目录
		if (file.isDirectory()) {

			File[] subs = file.listFiles();

			if (subs.length > 0) {
				for (File sub : subs) {

					// 递归
					deleteFile(sub);
				}
			} else {
				file.delete();
			}
		}

		file.delete();
	}

}

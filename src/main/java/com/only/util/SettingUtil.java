package com.only.util;

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.util.Date;
import java.util.List;

import org.apache.commons.beanutils.BeanUtilsBean;
import org.apache.commons.beanutils.ConvertUtilsBean;
import org.apache.commons.beanutils.PropertyUtilsBean;
import org.apache.commons.beanutils.converters.DateConverter;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.springframework.core.io.ClassPathResource;

import com.only.model.common.Setting;

/**
 * 系统设置
 * 
 * @author lvlinguang
 * 
 */
public class SettingUtil {

	/** BeanUtilsBean */
	private static final BeanUtilsBean beanUtils;

	static {

		ConvertUtilsBean convertUtils = new ConvertUtilsBean();

		DateConverter dateConverter = new DateConverter();

		convertUtils.register(dateConverter, Date.class);

		beanUtils = new BeanUtilsBean(convertUtils, new PropertyUtilsBean());
	}

	/**
	 * 获取系统设置
	 * 
	 * @return 系统设置
	 */
	public static Setting get() {

		// 得到缓存
		// Ehcache cache = cacheManager.getEhcache(Setting.CACHE_NAME);

		// 得到数据
		// net.sf.ehcache.Element cacheElement = cache.get(Setting.CACHE_KEY);

		Setting setting;

		// // 返回缓存数据
		// if (cacheElement != null) {
		// setting = (Setting) cacheElement.getObjectValue();
		// }
		// // 载入xml数据
		// else {
		setting = new Setting();

		try {

			// 得到xml文件
			File shopXmlFile = new ClassPathResource("/only.xml").getFile();

			Document document = new SAXReader().read(shopXmlFile);

			// 获取根元素
			Element root = document.getRootElement();

			// 获取所有子元素
			List<Element> elements = root.elements("setting");

			for (Element element : elements) {

				// 名称
				String name = element.attributeValue("name");

				// 值
				String value = element.attributeValue("value");

				try {

					// 设置数据
					beanUtils.setProperty(setting, name, value);

				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					e.printStackTrace();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		// 设置缓存数据
		// cache.put(new net.sf.ehcache.Element(Setting.CACHE_KEY, setting));
		// }
		return setting;
	}

}

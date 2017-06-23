package com.only.exception;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

/**
 * 全局异常处理器
 * 
 * @author lvlinguang
 * 
 */
public class CustomExceptionResolver implements HandlerExceptionResolver {

	public ModelAndView resolveException(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex) {

		CustomException customException = null;

		// instanceof 运算符是用来在运行时指出对象是否是特定类的一个实例

		// 自定义错误
		if (ex instanceof CustomException) {

			customException = (CustomException) ex;
		}
		// 系统未知错误
		else {

			customException = new CustomException("未知错误，请与系统管理 员联系！");
		}

		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("message", customException.getMessage());
		modelAndView.setViewName("error");

		return modelAndView;
	}
}

package com.only.interceptor;

import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.only.model.User;

/**
 * 登录控制
 * 
 * @author lvlinguang
 * 
 */
public class LoginInterceptor implements HandlerInterceptor {

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

		// 获取请求的url
		String url = request.getRequestURI();

		// 判断url是否是公开 地址（实际使用时将公开 地址配置配置文件中）
		// 这里公开地址是登陆提交的地址
		// if (url.indexOf("login") >= 0) {
		//
		// // 如果进行登陆提交，放行
		// return true;
		// }

		// 判断session
		HttpSession session = request.getSession();

		// 从session中取出用户身份信息
		User username = (User) session.getAttribute("user");

		if (username != null) {
			// 身份存在，放行
			return true;
		}

		if (request.getMethod().equalsIgnoreCase("GET")) {

			// 跳转地址
			String redirectUrl = request.getQueryString() != null ? request.getRequestURI() + "?" + request.getQueryString() : request.getRequestURI();

			// 重定向
			response.sendRedirect(request.getContextPath() + "/user/login?backurl=" + URLEncoder.encode(redirectUrl, "utf-8"));
		} else {
			response.sendRedirect(request.getContextPath() + "/user/login");
		}

		return false;

		// 执行这里表示用户身份需要认证，跳转登陆页面
		// request.getRequestDispatcher("/WEB-INF/jsp/user/login.jsp").forward(
		// request, response);

	}

	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub

	}

	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
		// TODO Auto-generated method stub

	}

}

package com.only.controller.admin;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.only.entity.User;
import com.only.entity.UserLogon;
import com.only.service.UserLogonService;
import com.only.service.UserService;
import com.only.util.CookieUtil;

/**
 * 基础控制器
 * 
 * @author lvlinguang
 * 
 */
public class BaseController {

	@Autowired
	private UserService userService;

	@Autowired
	private UserLogonService userLogonService;

	/**
	 * 是否登录
	 * 
	 * @param request
	 * @return
	 * @throws Exception
	 * @throws NumberFormatException
	 */
	public boolean IsLogin(HttpServletRequest request) throws NumberFormatException, Exception {

		return CurUser(request) != null;
	}

	/**
	 * 当前用户信息
	 * 
	 * @param request
	 * @return
	 * @throws NumberFormatException
	 * @throws Exception
	 */
	public User CurUser(HttpServletRequest request) throws NumberFormatException, Exception {

		HttpSession session = request.getSession();

		User user = (User) session.getAttribute("user");

		if (user != null) {

			return user;
		}
		// 通过cookie
		else {

			String uid = CookieUtil.getCookie(request, "uid");

			String token = CookieUtil.getCookie(request, "valid");

			if (StringUtils.isNotEmpty(uid) && StringUtils.isNotEmpty(token)) {

				// 用户登录信息
				UserLogon userlogon = userLogonService.getUserLogonByUser(Integer.parseInt(uid));

				if (userlogon.getToken().equals(token) && new Date().before(userlogon.getExpiryDate())) {

					// 用户信息
					user = userService.getUserByID(Integer.parseInt(uid));

					// 设置session
					request.getSession().setAttribute("user", user);

					return user;
				}
			}
			return null;
		}
	}

	/**
	 * 当前用户的id
	 * 
	 * @param request
	 * @return
	 * @throws NumberFormatException
	 * @throws Exception
	 */
	public int UID(HttpServletRequest request) throws NumberFormatException, Exception {

		return CurUser(request).getId();
	}
}

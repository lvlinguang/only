package com.only.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController extends BaseController {

	// 首页
	@RequestMapping("/")
	public String Login() {
		return "home/index";
	}
}

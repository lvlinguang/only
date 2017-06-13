<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户登录</title>

<%@include file="/WEB-INF/jsp/include/xgui_core.jsp"%>

<link href="${path}/content/login/login.css" rel="stylesheet" />

<script src="${path}/content/login/login.js"></script>

<script type="text/javascript">
	$(function() {

		//验证地址
		login.url = "${path}/user/login";

		//绑定星光班级登录
		$(".js-bj-login").click(function() {

			xgui.msgtip("不支持星光班级登录！", "info");
			//App.OpenXGBJDlg("login");
		});

		//注册
		$("#js-reg").click(function() {

			xgui.alert("此时间段内未开放注册功能！", "info");
		});

	});
</script>


</head>
<body>

	<div class="login">
		<!--头部-->
		<div class="layout-header">
			<div class="header-logo">
				<a href="#" title="某某中学" target="_blank"> <img
					src="${path}/content/login/img/logo.jpg" />
				</a>
			</div>
		</div>
		<!--内容-->
		<div class="layout-body">
			<div class="layout-page clearfix">
				<!--登录框-->
				<div class="login-box">
					<div class="input-item clearfix">
						<input name="Account" type="text" id="Account" class="login-input" />
					</div>
					<div class="input-item clearfix">
						<input name="PassWord" type="password" id="PassWord"
							class="login-input" /> <span class="login-pwd-tip">密码</span>
					</div>
					<div class="remember-item">
						<a href="javascript:;" class="js-remember login-checkbox">记住密码</a>
						｜ <a href="/user/getpwd" title="忘记密码">忘记密码</a>
					</div>
					<div class="login-btn">
						<a href="javascript:;" class="js-submit">登 录 </a>
					</div>
					<div class="reg-item">
						<span>还没有帐号？</span> <a href="javascript:;" title="马上注册"
							id="js-reg">马上注册</a>
					</div>
					<div class="other-login">
						<span>其它帐号登录：</span> <a href="javascript:;"
							class="login-partners xgbj js-bj-login" title="星光班级登录"></a>
					</div>
				</div>
				<!--广告信息-->
				<div class="pic-info">
					<img src="${path}/content/login/img/img01.jpg" />

				</div>
			</div>
		</div>
		<!--底部-->
		<div class="layout-footer">
			<div class="footer-wrap">
				<p>
					<span>台州朗星网络技术有限公司</span> <span>地址：三峰路158号</span> <span>联系电话：0576-85123320</span>
				</p>
				<p>
					<span>Copyright &#169; 2016</span> <span>浙ICP备13030673号-1</span> <span>系统版本:V2.01</span>
				</p>
			</div>
		</div>
	</div>

</body>

</html>







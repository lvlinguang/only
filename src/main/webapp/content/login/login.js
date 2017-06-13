
/*
 *   登录js
 *   made by：lv
 *   Version：1.0
 *   Production in：2014-7-14
 *   Last updated：7-6-10
 */
var login = {

	// 登录地址
	url : "/user/login/",
	// 远程参数
	queryParams : {},
	// 跳转地址
	backurl : null,
	// 用户验证
	validateUser : function() {

		var Account = $("#Account").val();

		var PassWord = $("#PassWord").val();

		var Rememberme = $(".js-remember").hasClass("checked");

		if (Account == "帐号/身份证号" || $.trim(Account) == "") {

			$("#Account").focus();
			xgui.msgtip("帐号不能为空！", "error");
			return;
		}
		if ($.trim(PassWord) == "") {

			$("#PassWord").focus();
			xgui.msgtip("密码不能为空！", "error");
			return;
		}

		// 远程参数
		var queryParams = {
			Account : Account,
			PassWord : PassWord,
			Rememberme : Rememberme
		};

		// 合并参数
		$.extend(queryParams, login.queryParams);

		xgui.Ajax(login.url, queryParams, "json", true, function(o) {

			if (o.success) {

				window.location.href = login.backurl
						|| decodeURIComponent(common.request("backurl"))
						|| window.location.href;
			} else {

				xgui.alert(o.text, "error");
			}

		}, null, function() {

			// 禁用按钮
			common.disableAtag($(".js-submit"), null, true, "验证中");

		}, function() {

			// 启用按钮
			common.enableAtag($(".js-submit"));
		});

	},
	// 初使化
	init : function() {

		// 帐号
		$("#Account").HighlightInput({
			mode : "EmptyAndBorder",
			blurColor : "#c1c1c1",
			emptyCon : "帐号/身份证号"
		});

		// 密码
		$("#PassWord").HighlightInput({
			mode : "EmptyAndBorder",
			emptyCon : ""
		}).
		// 聚集时
		focus(function() {

			$(".login-pwd-tip").hide();

		}).
		// 失去焦点时
		blur(function() {

			if ($.trim($(this).val()) == "") {

				$(".login-pwd-tip").show();
			} else {
				$(".login-pwd-tip").hide();
			}
		});

		// 单击密码提示时使输入框聚焦
		$(".login-pwd-tip").click(function() {

			$("#PassWord").focus();
		});

		// 复选框事件
		$(".js-remember").click(function() {

			if ($(this).hasClass("checked")) {

				$(this).removeClass("checked");
			} else {
				$(this).addClass("checked");
			}
		});

		// 绑定登录按钮
		$(".js-submit").click(function() {

			login.validateUser();
		});

		// 绑定文本框
		$("#Account,#PassWord").keyup(function(e) {

			// 登录验证
			if (e.keyCode == 13) {

				login.validateUser();
			}
		});
	}
}

$(function() {

	login.init();
});
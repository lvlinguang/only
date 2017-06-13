<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>后台管理</title>

<%@include file="/WEB-INF/jsp/include/manage_core.jsp"%>

<script type="text/javascript">
	$(function() {

		user.init();

		$("span.bk").hover(function() {
			$(this).find(".tabTip").show();
		}, function() {
			$(this).find(".tabTip").hide();
		});
	})
</script>


</head>
<body>

	<div id="container">

		<%@include file="/WEB-INF/jsp/include/manage_1.jsp"%>

		<!--content start-->
		<div id="content">
			<div style="margin-left: 20px;">


				<ul class="sub-navi clearFix third">
					<li style="width: 49%;"><a href="${path}/user/add">用户创建</a></li>
					<li style="width: 49%;"><a class="active" href="${path}/user/">用户管理</a></li>
				</ul>

				<!--搜索栏-->
				<div class="search-bar clearfix outline"
					style="margin-bottom: 20px; position: relative;">
					<div class="clearfix fl">
						<div class="search-item">
							<div class="outline p20 aountRow clearFix">
								<select class="xgui-combobox" name="roleId" id="roleId">
									<option value=" ">全部角色</option>

									<option value="0">全部角色</option>

								</select>
								<div class="search">
									<input class="searchI js-search-input" placeholder="请输入用户名称"
										name="searchText" type="text" value=""> <a
										href="javascript:;" class="btn-r-s js-search"></a>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!--数据表格-->
				<div id="grid"></div>
				<!--dialog对话框-->
				<div id="dlg1" class="xgui-dialog" title="密码重置" closed="true"
					modal="true" style="width: 660px;">
					<form id="dlg-form1" class="dlg-form1 clearfix">
						<div class="dlg-form1-item">
							<label class="dlg-form1-name"><i>*</i>用户名</label> <span
								class="dlg-form1-Info"> <input id="UserID" name="UserID"
								type="hidden" /> <input id="UserName" name="UserName"
								class="xgui-validatebox" required="true"
								validtype="length[2,18]" editable="false" emptymsg="请输入名称！" />
							</span>
						</div>
						<div class="dlg-form1-item">
							<label class="dlg-form1-name"><i>*</i>密码</label> <span
								class="dlg-form1-Info"> <input id="Password"
								name="Password" class="xgui-validatebox" required="true"
								onfocus="this.type='password'" validtype="length[6,20]"
								placeholder="6~20个字符" emptymsg="请填写密码！" />
							</span>
						</div>

					</form>
					<div class="xgui-msg-bottom js-submit-btn">
						<a href="javascript:;"
							class="xgui-msg-btn blue msg-btn-ok js-submit1">是</a> <a
							href="javascript:;"
							class="xgui-msg-btn grey msg-btn-no js-cancel1">否</a>
					</div>
				</div>


			</div>
		</div>
		<!--content END-->
	</div>

</body>
</html>






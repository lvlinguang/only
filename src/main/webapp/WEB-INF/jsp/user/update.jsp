<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>后台管理</title>

<%@include file="/WEB-INF/jsp/include/manage_core.jsp"%>

<script>
	var backurl = '@ViewBag.BackUrl';

	$(function() {

		user.mark = 0;

		user.initadd();
	});
</script>


</head>
<body>

	<div id="container">

		<%@include file="/WEB-INF/jsp/include/manage_1.jsp"%>

		<!--content start-->
		<div id="content">
			<div style="margin-left: 20px;">



				<ul class="sub-navi clearFix third">
					<li style="width: 33%;"><a class="active"
						href="~/user/Update/@ViewBag.UserId">用户修改</a></li>
					<li style="width: 33%;"><a href="${path}/user/add">用户创建</a></li>
					<li style="width: 33%;"><a href="${path}/user/index">用户与权限管理</a></li>
				</ul>

				<form id="dlg-form" class="dlg-form2">

					<div class="dlg-form2-item">
						<label class="dlg-form2-name"><i>*</i>用户角色</label> <span
							class="dlg-form2-Info"> <input type="hidden"
							name="permissions" /> <input type="hidden"
							value="@ViewBag.UserId" name="UserId" id="hdnUserId" /> <select
							class="xgui-combobox" required="true" id="roleId" name="roleId">
								@foreach (var role in (List
								<Role>)ViewBag.Roles) { if (role.RoleID ==
								(int)ViewBag.RoleId) {
								<option value="@role.RoleID" selected="selected">@role.Name</option>
								} else {
								<option value="@role.RoleID">@role.Name</option>
								} } 
						</select>
						</span>
					</div>
					<div class="dlg-form2-item">
						<label class="dlg-form2-name"><i>*</i>用户名称</label> <span
							class="dlg-form2-Info"> <input name="UserName"
							value="@ViewBag.UserName" class="xgui-validatebox" mode="Static"
							required="true" validtype="length[2,18]"
							placeholder="2~18个字符,可使用中文、字母、数字、下划线" emptymsg="请填写角色名！"
							style="width: 346px;" />
						</span>
					</div>
					<div class="dlg-form2-item">
						<label class="dlg-form2-name"> <i>*</i>手机号码
						</label> <span class="dlg-form2-Info"> <input name="Mobile"
							value="@ViewBag.Mobile" class="xgui-validatebox" mode="Static"
							required="true" validtype="phone" placeholder="只可使用数字"
							emptymsg="请填写手机号码！" style="width: 346px;" />
						</span>
					</div>
					<div class="dlg-form2-item">
						<label class="dlg-form2-name"><i>*</i>账号权限</label>
						<div class="dlg-form2-Info clearfix">
							<div class="boxL fl group_options">
								@{ foreach (var g in ((List
								<admin_get_user_permisson_Result>)ViewBag.Permissions).Select(r
								=> new { r.GroupName }).Distinct()) {
								<div class="tit">
									<span>@g.GroupName</span><a class="btn-s select_group"
										rel="@g.GroupName" href="javascript:void(0)">全选</a>
								</div>
								<ul class="listRow">
									@foreach (var p in ((List
									<admin_get_user_permisson_Result>)ViewBag.Permissions).Where(r
									=> r.GroupName == g.GroupName)) {
									<li><a rel="@g.GroupName" id="permission_@p.PermissionID"
										href="javascript:void(0)">@p.PermissionName</a></li>
									} 
								</ul>
								} } 
							</div>
							<div class="arrowR-tip fl">&nbsp;</div>
							<div class="boxL fl selected_group">
								@Html.Partial("_GetRolePermissions", (List
								<admin_get_user_permisson_Result>)ViewBag.UserPermissions)
								
							</div>
						</div>
					</div>
					<div class="dlg-form2-item"
						style="margin: 30px 0; text-align: center;">

						<input class="btnOk js-submit" id="btnCreateAccount" name=""
							value="确定" type="button">

					</div>

				</form>


			</div>
		</div>
		<!--content END-->
	</div>

</body>
</html>






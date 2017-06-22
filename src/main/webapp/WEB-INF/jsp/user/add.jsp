<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>后台管理</title>

<%@include file="/WEB-INF/jsp/include/manage_core.jsp"%>

<script>
	$(function() {

		user.mark = 1;

		user.initadd();
	});
</script>

<script id="permission-item" type="text/html">
{{each data as v1}}
    <div class="tit"><span>{{v1.text}}</span><a class="remove_group close fr" rel="{{v1.text}}" href="javascript:void(0)"></a></div>
    <ul class="listRow">
        {{each v1.children as v2}}
            <li><a rel="{{v1.text}}" id="permission_{{v2.id}}" href="javascript:void(0)">{{v2.text}}</a><a class="close" href="javascript:void(0)">&nbsp;</a></li>
       {{/each}}
    </ul>
{{/each}}
</script>

</head>
<body>

	<div id="container">

		<%@include file="/WEB-INF/jsp/include/manage_1.jsp"%>

		<!--content start-->
		<div id="content">
			<div style="margin-left: 20px;">


				<ul class="sub-navi clearFix half">
					<li style="width: 49%;">
						<a class="active" href="${path}/user/add">用户创建</a>
					</li>
					<li style="width: 49%;">
						<a href="${path}/user/">用户管理</a>
					</li>
				</ul>

				<form id="dlg-form" class="dlg-form2">

					<div class="dlg-form2-item">
						<label class="dlg-form2-name">
							<i>*</i>
							用户角色
						</label>
						<span class="dlg-form2-Info">
							<input type="hidden" name="permissions" />
							<select class="xgui-combobox" required="true" mode="Static" id="roleId" name="roleId">
								<c:forEach var="r" items="${roles}">
									<option value="${r.id}">${r.name}</option>
								</c:forEach>
							</select>
						</span>
					</div>
					<div class="dlg-form2-item">
						<label class="dlg-form2-name">
							<i>*</i>
							用户名称
						</label>
						<span class="dlg-form2-Info">
							<input name="name" class="xgui-validatebox" mode="Static" required="true" validtype="length[2,10]" placeholder="2~18个字符" emptymsg="请填写用户名称！" style="width: 346px;" />
						</span>
					</div>
					<div class="dlg-form2-item">
						<label class="dlg-form2-name">
							<i>*</i>
							帐号
						</label>
						<span class="dlg-form2-Info">
							<input name="account" class="xgui-validatebox" mode="Static" required="true" validtype="length[2,18]" placeholder="2~18个字符,可使用中文、字母、数字、下划线" emptymsg="请填写帐号！" style="width: 346px;" />
						</span>
					</div>
					<div class="dlg-form2-item">
						<label class="dlg-form2-name">
							<i>*</i>
							密码
						</label>
						<span class="dlg-form2-Info">
							<input name="password" type="password" class="xgui-validatebox" mode="Static" required="true" validtype="length[6,20]" placeholder="6~20个字符,可使用字母、数字、下划线" emptymsg="请填写密码！" style="width: 346px;" />
						</span>
					</div>
					<div class="dlg-form2-item">
						<label class="dlg-form2-name">手机号码 </label>
						<span class="dlg-form2-Info">
							<input name="mobile" class="xgui-validatebox" mode="Static" validtype="phone" placeholder="只可使用数字" emptymsg="请填写手机号码！" style="width: 346px;" />
						</span>
					</div>
					<div class="dlg-form2-item">
						<label class="dlg-form2-name">
							<i>*</i>
							账号权限
						</label>
						<div class="dlg-form2-Info clearfix">
							<div class="boxL fl group_options">
								<c:forEach var="item" items="${permissions}">
									<div class="tit">
										<span>${item.text}</span>
										<a class="btn-s select_group" rel="${item.text}" href="javascript:void(0)">全选</a>
									</div>
									<ul class="listRow">
										<c:forEach var="subitem" items="${item.children}">
											<li>
												<a rel="${item.text}" id="permission_${subitem.id }" href="javascript:void(0)">${subitem.text}</a>
											</li>
										</c:forEach>
									</ul>
								</c:forEach>
							</div>
							<div class="arrowR-tip fl">&nbsp;</div>
							<div class="boxL fl selected_group"></div>
						</div>
					</div>
					<div class="dlg-form2-item" style="margin: 30px 0; text-align: center;">

						<input class="btnOk js-submit" id="btnCreateAccount" name="" value="确定" type="button">

					</div>

				</form>
			</div>
		</div>
		<!--content END-->
	</div>

</body>
</html>






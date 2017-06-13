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

		role.mark = 0;

		role.init();
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
					<li style="width: 49%;"><a class="active"
						href="${path}/role/add">角色创建</a></li>
					<li style="width: 49%;"><a href="${path}/role/">角色管理</a></li>
				</ul>


				<form id="dlg-form" class="dlg-form2">

					<div class="dlg-form2-item">
						<label class="dlg-form2-name"><i>*</i>角色名称</label> <span
							class="dlg-form2-Info"> <input type="hidden"
							name="permissions"> <input type="hidden"
							value="${role.id}" name="id" /> <input name="name"
							value="${role.name}" class="xgui-validatebox" mode="Static"
							required="true" validtype="length[2,18]"
							placeholder="2~18个字符,可使用中文、字母、数字、下划线" emptymsg="请填写角色名！"
							style="width: 346px;" />
						</span>
					</div>
					<div class="dlg-form2-item">
						<label class="dlg-form2-name"><i>*</i>角色权限</label>
						<div class="dlg-form2-Info clearfix">
							<div class="boxL fl group_options">
								<c:forEach var="item" items="${permissions}">
									<div class="tit">
										<span>${item.text}</span><a class="btn-s select_group"
											rel="${item.text}" href="javascript:void(0)">全选</a>
									</div>
									<ul class="listRow">
										<c:forEach var="subitem" items="${item.children}">
											<li><a rel="${item.text}" id="permission_${subitem.id}"
												href="javascript:void(0)">${subitem.text}</a></li>
										</c:forEach>
									</ul>
								</c:forEach>
							</div>
							<div class="arrowR-tip fl">&nbsp;</div>
							<div class="boxL fl selected_group">

								<c:forEach var="item" items="${rolePermissions}">

									<div class="tit">
										<span>${item.text}</span><a class="remove_group close fr"
											rel="${item.text}" href="javascript:void(0)"></a>
									</div>
									<ul class="listRow">
										<c:forEach var="subitem" items="${item.children}">
											<li><a rel="${item.text}" id="permission_${subitem.id}"
												href="javascript:void(0)">${subitem.text}</a><a class="close"
												href="javascript:void(0)">&nbsp;</a></li>
										</c:forEach>
									</ul>
								</c:forEach>
							</div>
						</div>
					</div>
					<div class="dlg-form2-item"
						style="margin: 30px 0; text-align: center;">

						<input class="btnOk js-submit" id="btnCreateRole" name=""
							value="确定" type="button">

					</div>

				</form>

			</div>
		</div>
		<!--content END-->
	</div>

</body>
</html>






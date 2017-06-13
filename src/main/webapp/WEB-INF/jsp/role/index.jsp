<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>后台管理</title>

<%@include file="/WEB-INF/jsp/include/manage_core.jsp"%>

<script>
	$(function() {
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
					<li style="width: 49%;"><a href="${path}/role/add">角色创建</a></li>
					<li style="width: 49%;"><a class="active"
						href="${path}/role/">角色管理</a></li>
				</ul>

				<!--数据表格-->
				<div id="grid"></div>

			</div>
		</div>
		<!--content END-->
	</div>

</body>
</html>






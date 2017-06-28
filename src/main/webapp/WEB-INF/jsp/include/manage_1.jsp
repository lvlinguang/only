<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!--header start-->
<div id="header">
	<a class="logo"> 后台管理系统 </a>
	<ul class="user-admin">
		<li><a class="exit" href="${path}/user/logout">退出</a></li>
		<li><a href="javascript:void(0)">消息</a></li>
		<li style="color: white; padding-right: 30px; line-height: 55px;">你好，
			管理员</li>
	</ul>
</div>
<!--header END-->
<!--sidebar start-->
<div id="sidebar">
	<ul>

		<li class=""><a href="${path}/role/">角色管理</a></li>

		<li class=""><a href="${path}/user/">用户管理</a></li>

		<li class=""><a href="${path}/category/">商品类目</a></li>

		<li class=""><a href="${path}/group/">商品分组</a></li>

		<li class=""><a href="${path}/banner/">Banner管理</a></li>

		<li class=""><a href="${path}/comment/">晒单管理</a></li>

		<li class=""><a href="${path}/product">商品管理</a>

			<ul class="subList">
				<li><a href="${path}/product/add" class=""> 商品发布 </a></li>
			</ul></li>

		<li class=""><a href="${path}/activity">活动管理</a>
			<ul class="subList">

				<li><a href="${path}/activity/add" class=""> 活动创建 </a></li>

				<li><a href="${path}/activity/manage" class=""> 活动审核 </a></li>

			</ul></li>

		<li class=""><a href="${path}/order/">订单管理</a></li>

		<li class=""><a href="${path}/income/">收入管理</a></li>

	</ul>
</div>
<!--sidebar END-->
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

		<li class=""><a href="~/menu/index">菜单管理</a></li>

		<li class=""><a href="~/ExpressCompany/index">物流管理</a></li>

		<li class=""><a href="~/city/index">地区管理</a></li>

		<li class=""><a href="~/Category/index">商品类目</a></li>

		<li class=""><a href="~/Group/index">商品分组</a></li>

		<li class=""><a href="~/Banner/index">Banner管理</a></li>

		<li class=""><a href="~/Comment/index">晒单管理</a></li>

		<li class=""><a href="~/ProblemManagement/index">问题管理</a></li>

		<li class=""><a href="/product">商品管理</a>

			<ul class="subList">
				<li><a href="/product/add" class=""> 商品发布 </a></li>
			</ul></li>

		<li class=""><a href="/activity">活动管理</a>
			<ul class="subList">

				<li><a href="/activity/add" class=""> 活动创建 </a></li>

				<li><a href="/activity/manage" class=""> 活动审核 </a></li>

			</ul></li>

		<li class=""><a href="~/order?type=1">订单管理</a></li>

		<li class=""><a href="~/income?type=1">收入管理</a></li>

	</ul>
</div>
<!--sidebar END-->
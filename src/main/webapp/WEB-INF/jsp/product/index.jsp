<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>商品管理</title>

<%@include file="/WEB-INF/jsp/include/manage_core.jsp"%>

<style type="text/css">
/*覆盖表格行高*/
.xgui-datagrid-row {
	height: 64px;
}

/*商品详情*/
.pro-info {
	
}
/*商品图片*/
.pro-pic {
	width: 54px;
	height: 54px;
	border-radius: 2px;
	float: left;
	margin-right: 10px;
}

.pro-info-detail {
	padding-top: 4px;
}

.pro-name {
	margin-bottom: 8px;
}

.pro-price {
	color: #dd514c;
}
</style>

<script type="text/javascript">
	var Flag = '1';

	$(function() {

		product.init();
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
					<li style="width: 24%;">
						<a href="add">商品创建</a>
					</li>
					<li style="width: 24%;">
						<a class="@(Model.tag==2?" active":"")" href="/product?tag=2">仓库管理</a>
					</li>
					<li style="width: 24%;">
						<a class="@(Model.tag==1?" active":"")" href="/product?tag=1">上架管理</a>
					</li>
					<li style="width: 24%;">
						<a class="@(Model.tag==3?" active":"")" href="/product?tag=3">下架管理</a>
					</li>
				</ul>

				<!--搜索栏-->
				<div class="search-bar clearfix" style="margin-bottom: 20px; position: relative;">
					<div class="clearfix fl">
						<span class="search-item">
							<span class="search-item-tit">商品分类：</span>
							<span id="category1"></span>
						</span>
						<div class="search-item">
							<span class="search-item-tit">关键字：</span>
							<div class="search floatL">
								<input class="searchI js-search-input" placeholder="请输入商品名">
								<a href="javascript:;" class="btn-r-s js-search"></a>
							</div>
						</div>
					</div>
					<div class="fr">
						<a href="javascript:;" class="toolbar-btn red js-delete js-delete2">批量删除</a>
						@if (Model.tag != 1) {
						<a href="javascript:;" class="toolbar-btn blue js-upanddown js-upanddown2" type="1">批量上架</a>
						} else {
						<a href="javascript:;" class="toolbar-btn blue js-upanddown js-upanddown2" type="3">批量下架</a>
						}
					</div>
				</div>

				<!--数据表格-->
				<div id="grid"></div>

				<!--右键操作-->
				<div id="ContextMenu" class="xgui-menu" style="width: 100px;">
					<div class="js-update">编辑</div>
					@if (Model.tag != 1) {
					<div class="js-upanddown js-upanddown1" type="1">上架</div>
					} else {
					<div class="js-upanddown js-upanddown1" type="3">下架</div>
					}
					<div class="js-delete js-delete1">删除</div>
				</div>

			</div>
		</div>
		<!--content END-->
	</div>

</body>
</html>
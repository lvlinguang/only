<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>

<%@include file="/WEB-INF/jsp/include/manage_core.jsp"%>

<script type="text/javascript" charset="utf-8" src="/Js/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="/Js/editor_api.js">
	
</script>
<script type="text/javascript" charset="utf-8" src="/Js/lang/zh-cn/zh-cn.js"></script>


<script type="text/javascript" charset="utf-8" src="/Js/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="/Js/editor_api.js">
	
</script>
<script type="text/javascript" charset="utf-8" src="/Js/lang/zh-cn/zh-cn.js"></script>

<script type="text/javascript">
	var ue;

	//默认图片
	var defaultimg = '/Images/add_img.png';

	var backurl = '';

	//商品ID
	var ProductID = "@Model.product.ProductID";

	//省
	var province1 = "@Model.province1.ProvinceId";

	//市
	var province2 = "@Model.province2.RegionId";

	//区
	var province3 = "@(Model.province3!=null ? Model.province3.RegionId : 0)";

	$(function() {

		product.mark = 0;

		product.initupdate();

	})
</script>


<style>
/*上传按钮*/
.file-btn-bk-s {
	width: 80px;
	height: 30px;
	z-index: 1;
	opacity: 0;
	position: relative;
}

a.btn-bk-s,.btn-bk-s {
	color: white;
	background-color: #f37349;
	height: 28px;
	line-height: 28px;
	border: 1px solid #f37349;
	text-align: center;
	display: inline-block;
	padding: 0 15px;
	border-radius: 3px;
	transition: all 0.25s ease-in-out;
	-ms-transition: all 0.25s ease-in-out 0s;
	-webkit-transition: all 0.25s ease-in-out;
	-moz-transition: all 0.25s ease-in-out;
	cursor: pointer;
}

.commodity-create-delete-box {
	position: relative;
	margin-left: 30px;
}

.choose-file-photo {
	position: absolute;
	left: 0;
}

.choose-file-photo-show {
	width: 80px;
	height: 80px;
}

.commodity-create-delete {
	position: absolute;
	right: 0;
	top: 0;
	height: 30px;
	background-color: black;
	width: 80px;
	opacity: 0.8;
	color: white;
	line-height: 30px;
	text-align: center;
	display: none;
}
</style>



</head>
<body>
	<div id="container">

		<%@include file="/WEB-INF/jsp/include/manage_1.jsp"%>

		<!--content start-->
		<div id="content">
			<div style="margin-left: 20px;">


				<ul class="sub-navi clearFix third">
					<li style="width: 24%;">
						<a class="active" href="/Product/add">商品创建</a>
					</li>
					<li style="width: 24%;">
						<a href="/product?tag=2">仓库管理</a>
					</li>
					<li style="width: 24%;">
						<a href="/product?tag=1">上架管理</a>
					</li>
					<li style="width: 24%;">
						<a href="/product?tag=3">下架管理</a>
					</li>
				</ul>
				<div class="cl mt20">

					@*
					<div class="ui-info">
						<i class="icons info"></i>
						<span>按要求填写相应的内容 * 为必填项！</span>
					</div>
					*@
					<form id="dlg-form" class="dlg-form2">
						<div class="dlg-form2-divider">1、基本信息</div>

						<div class="dlg-form2-item">
							<label class="dlg-form2-name">
								<i>*</i>
								商品名
							</label>
							<span class="dlg-form2-Info">
								<input type="hidden" name="BigPicture" id="BigPicture" value="@Model.product.BigPicture" />
								<input type="hidden" name="Thumbnail" id="Thumbnail" value="@Model.product.Thumbnail" />
								<input name="ProductName" value="@Model.product.ProductName" class="xgui-validatebox" mode="Static" required="true" validtype="checkCharLen[40]" placeholder="请填写商品名" emptymsg="请填写商品名！" style="width: 346px;" />
							</span>
						</div>
						<div class="dlg-form2-item">
							<label class="dlg-form2-name">
								<i>*</i>
								商品价格
							</label>
							<span class="dlg-form2-Info">
								<input name="Price" value="@Model.product.Price.ToString(" 0")" class="xgui-validatebox" mode="Static" required="true" validtype="Integer" placeholder="请填写商品价格" emptymsg="请填写商品价格！" style="width: 346px;" />
							</span>
						</div>
						<div class="dlg-form2-item">
							<label class="dlg-form2-name">
								<i>*</i>
								商品分类
							</label>
							<span class="dlg-form2-Info">
								<span id="category1" mode="Static" required="true" value="@Model.product.CategoryID"></span>
							</span>
						</div>
						<div class="dlg-form2-item">
							<label class="dlg-form2-name">
								<i>*</i>
								商品货号
							</label>
							<span class="dlg-form2-Info">
								<input name="ArtNumber" value="@Model.product.ArtNumber" class="xgui-validatebox" mode="Static" required="true" validtype="length[2,20]" placeholder="请填写商品货号" emptymsg="请填写商品货号！" style="width: 346px;" />
							</span>
						</div>
						<div class="dlg-form2-item clearfix">
							<label class="dlg-form2-name">
								<i>*</i>
								主图
							</label>
							<div class="dlg-form2-Info fl" style="position: relative;">
								<input type="file" class="fl file-btn-bk-s js-imgupload1" id="big1">
								<a class="btn-bk-s fl choose-file-photo">选择图片</a>
								<div class="fl commodity-create-delete-box">
									<img src="/Images/add_img.png" id="Showbig1" class="fl choose-file-photo-show">
									<div class="commodity-create-delete js-del-pic">点击删除</div>
								</div>
							</div>
						</div>
						<div class="dlg-form2-item clearfix">
							<label class="dlg-form2-name">细节图</label>
							<div class="dlg-form2-Info fl" style="position: relative;">
								<input type="file" class="fl file-btn-bk-s js-imgupload1" id="small1">
								<a class="btn-bk-s fl choose-file-photo">选择图片</a>
								<div class="fl commodity-create-delete-box">
									<img src="/Images/add_img.png" id="Showsmall1" class="fl choose-file-photo-show">
									<div class="commodity-create-delete js-del-pic">点击删除</div>
								</div>
							</div>
						</div>
						<div class="dlg-form2-item clearfix">
							<label class="dlg-form2-name">细节图</label>
							<div class="dlg-form2-Info fl" style="position: relative;">
								<input type="file" class="fl file-btn-bk-s js-imgupload1" id="small2">
								<a class="btn-bk-s fl choose-file-photo">选择图片</a>
								<div class="fl commodity-create-delete-box">
									<img src="/Images/add_img.png" id="Showsmall2" class="fl choose-file-photo-show">
									<div class="commodity-create-delete js-del-pic">点击删除</div>
								</div>
							</div>
						</div>
						<div class="dlg-form2-item clearfix">
							<label class="dlg-form2-name">细节图</label>
							<div class="dlg-form2-Info fl" style="position: relative;">
								<input type="file" class="fl file-btn-bk-s js-imgupload1" id="small3">
								<a class="btn-bk-s fl choose-file-photo">选择图片</a>
								<div class="fl commodity-create-delete-box">
									<img src="/Images/add_img.png" id="Showsmall3" class="fl choose-file-photo-show">
									<div class="commodity-create-delete js-del-pic">点击删除</div>
								</div>
							</div>
						</div>
						<div class="dlg-form2-item clearfix">
							<label class="dlg-form2-name">细节图</label>
							<div class="dlg-form2-Info fl" style="position: relative;">
								<input type="file" class="fl file-btn-bk-s js-imgupload1" id="small4">
								<a class="btn-bk-s fl choose-file-photo">选择图片</a>
								<div class="fl commodity-create-delete-box">
									<img src="/Images/add_img.png" id="Showsmall4" class="fl choose-file-photo-show">
									<div class="commodity-create-delete js-del-pic">点击删除</div>
								</div>
							</div>
						</div>
						<div class="dlg-form2-divider">2、区域选择</div>
						<div class="dlg-form2-item">
							<label class="dlg-form2-name">
								<i>*</i>
								省
							</label>
							<span class="dlg-form2-Info">
								<input id="province1">
							</span>
						</div>
						<div class="dlg-form2-item">
							<label class="dlg-form2-name">
								<i>*</i>
								市
							</label>
							<span class="dlg-form2-Info">
								<input id="province2">
							</span>
						</div>
						<div class="dlg-form2-item">
							<label class="dlg-form2-name">
								<i>*</i>
								镇/区
							</label>
							<span class="dlg-form2-Info">
								<input id="province3">
							</span>
						</div>
						<div class="dlg-form2-divider">3、编辑详情</div>
						<div class="dlg-form2-item clearfix">
							<label class="dlg-form2-name">图文描述</label>
							<span class="dlg-form2-Info">
								<script id="editor" type="text/plain" style="width:780px;height:500px;float: left;">
                    @Html.Raw(Model.product.Description)
                </script>
								<textarea id="Description" name="Description" style="display: none;"></textarea>
							</span>
						</div>
						<div class="dlg-form2-item">
							<label class="dlg-form2-name">&nbsp;</label>
							<span class="dlg-form2-Info">
								<a href="javascript:;" class="toolbar-btn yellow js-submit" type="1">上 架</a>
								<a href="javascript:;" class="toolbar-btn yellow js-submit" type="2">放入仓库</a>
							</span>
						</div>

					</form>
				</div>

			</div>
		</div>
		<!--content END-->
	</div>

</body>
</html>
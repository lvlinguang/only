<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>后台管理-分类管理</title>

<%@include file="/WEB-INF/jsp/include/manage_core.jsp"%>

<style>
.pic-tips {
	margin-top: 52px;
	margin-left: 10px;
	color: #808080;
	float: left;
}
/*统一宽*/
.xgui-validatebox {
	width: 360px;
}
/*validatebox样式*/
.file-input {
	width: 360px;
	height: 16px;
	line-height: 16px;
	border: 1px solid #ededed;
	padding: 8px 6px;
	vertical-align: middle;
	color: #4a4949;
}

.file-input:focus {
	box-Shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px
		rgba(82, 168, 236, 0.6);
	border-color: #74b9f0;
}
</style>

<script>
	$(function() {
		category.init();
	});
</script>


</head>
<body>

	<div id="container">

		<%@include file="/WEB-INF/jsp/include/manage_1.jsp"%>

		<!--content start-->
		<div id="content">
			<div style="margin-left: 20px;">

				<!--搜索栏-->
				<div class="search-bar clearfix outline" style="margin-bottom: 20px; position: relative;">
					<div class="clearfix fl">
						<div class="search-item">
							<span class="search-item-tit">关键字：</span>
							<div class="search floatL">
								<input class="searchI js-search-input" placeholder="请输入类目名">
								<a href="javascript:;" class="btn-r-s js-search"></a>
							</div>
						</div>
					</div>
					<div class="fr">
						<a href="javascript:;" class="toolbar-btn yellow js-add">添加</a>
					</div>
				</div>

				<!--数据表格-->
				<div id="grid"></div>

				<!--右键操作-->
				<div id="ContextMenu" class="xgui-menu" style="width: 100px;">
					<div class="js-update">编辑</div>
					<div class="js-delete js-delete1">删除</div>
				</div>
				<!--dialog对话框-->
				<div id="dlg1" class="xgui-dialog" title="创建分组" closed="true" modal="true" style="width: 580px;">
					<form id="dlg-form1" class="dlg-form2 clearfix">
						<div class="dlg-form2-item">
							<label class="dlg-form2-name">
								<i>*</i>
								类目名称
							</label>
							<span class="dlg-form2-Info">
								<input name="id" type="hidden" />
								<input name="name" class="xgui-validatebox" required="true" validtype="length[2,18]" emptymsg="请输入名称！" />
							</span>
						</div>
						<div class="dlg-form2-item">
							<label class="dlg-form2-name">
								<i>*</i>
								图标
							</label>
							<span class="dlg-form2-Info clearfix">
								<input type="file" class="file-input js-imgupload1" />
								<input type="hidden" name="icon" />
								<img id="iconpic" style="width: 75px; height: 75px; margin-left: 120px; float: left">
								<span class="pic-tips">建议单张图片100x100像素，支持jpg、png格式</span>
							</span>
						</div>
						<div class="dlg-form2-item">
							<label class="dlg-form2-name">
								<i>*</i>
								类目排序
							</label>
							<span class="dlg-form2-Info">
								<input name="sequence" class="xgui-validatebox" required="true" validtype="number" emptymsg="请输入类目排序！" />
							</span>
						</div>
						<div class="dlg-form2-item">
							<label class="dlg-form2-name">
								<i></i>
								描述
							</label>
							<span class="dlg-form2-Info">
								<input name="description" class="xgui-validatebox" />
							</span>
						</div>
						<div class="dlg-form2-item js-canshow-item">
							<label class="dlg-form2-name">
								<i>*</i>
								是否展示
							</label>
							<span class="dlg-form2-Info">
								<select name="canshow" class="xgui-combobox" style="width: 374px;" editable="false">
									<option value="true" selected="selected">是</option>
									<option value="false">否</option>
								</select>
							</span>
						</div>
					</form>
					<div class="xgui-msg-bottom js-submit-btn">
						<a href="javascript:;" class="xgui-msg-btn blue msg-btn-ok js-submit1">是</a>
						<a href="javascript:;" class="xgui-msg-btn grey msg-btn-no js-cancel1">否</a>
					</div>
				</div>

			</div>
		</div>
		<!--content END-->
	</div>

</body>
</html>






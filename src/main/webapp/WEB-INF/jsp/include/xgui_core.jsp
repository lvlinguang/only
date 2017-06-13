<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="path" value="${pageContext.request.contextPath}"
	scope="page" />

<script type="text/javascript">
	//配置
	var config = {

		path : "${path}"
	}
</script>

<link href="${path}/content/plugins/xgui 1.2.6/xgui.css"
	rel="stylesheet" />

<!-- jquery -->
<script src="${path}/content/plugins/xgui 1.2.6/jquery-1.8.1.min.js"></script>

<!-- 星光ui min -->
<script src="${path}/content/plugins/xgui 1.2.6/xgui.min.js"></script>

<!--公用js-->
<script src="${path}/content/js/common.js"></script>

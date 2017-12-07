<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String logout="";
if(request.getParameter("logout")!=null){
	logout=request.getParameter("logout");
}
session.removeAttribute("sysUserInfo");
session.removeAttribute("91_user");//系统用户访问91u
session.removeAttribute("userInfo");//91u登录手机客户端
%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>Login out.</title>
</head>
<body>
	<script type="text/javascript" language="javascript">
	var logout="<%=logout%>";
	    if(logout!="true"){
			alert('登录已超时,请重新登录！');
	    }
		top.location.href='index.shtml';
	</script>
</body>
</html>

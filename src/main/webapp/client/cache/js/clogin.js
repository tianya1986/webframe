/**
 * 前端登陆js
 */
var clogin={
	sub:function(){
		var loginName=$("#login_name").val();
		var password=$("#password").val();
		var date = new Date();
		$.ajax({
			dataType:"json",
			url:"/client/login/login.do?t="+date.getTime(),
			data:{username:loginName,password:password},
			success :function(r){
				if(r && r.success){
					window.location.href='/client/shtml/frame.shtml';
				}else{
					alert(r.msg);
				}
			}
		});
	}
}
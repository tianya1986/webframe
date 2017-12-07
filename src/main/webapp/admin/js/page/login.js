
//写cookies函数 作者：翟振凯
function SetCookieDays(name,value,Days)//两个参数，一个是cookie的名子，一个是值
{
   // var Days = 30; //此 cookie 将被保存 30 天
    var exp  = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function SetCookieMinutes(name,value,minutes)//两个参数，一个是cookie的名子，一个是值
{
   // var Days = 30; //此 cookie 将被保存 30 天
    var exp  = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + minutes*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name)//取cookies函数        
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     if(arr != null) return unescape(arr[2]); return null;

}
function delCookie(name)//删除cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

if(getCookie("loginName")!=""&&getCookie("loginName")!=null){
	window.location.href='/admin/shtml/frame.shtml';
}




var login={
		sub2:function(){
			
			var loginName=$("#loginName").val();
		
			var password=$("#password").val();
			var date = new Date();
			$.ajax({
				dataType:"json",
				url:"/admin/user/login?t="+date.getTime(),
				data:{loginName:loginName,password:password},
				success :function(r){
					if(r && r.success){
						window.location.href='/admin/shtml/frame.shtml';
					}else{
						alert(r.msg);
						document.getElementById("msgcontent").innerHTML=r.msg;
					}
				},
				error:function(r){
					alert(r.msg);
					document.getElementById("msgcontent").innerHTML=r.msg;
				}
			});
		},
		sub:function(){
			var loginName=$("#loginName").val();
			var password=$("#password").val();
			var date = new Date();
			$.post("/admin/user/login?t="+date.getTime(),{user:loginName,password:password},
					 function(r){
				var jsondata=JSON.parse(r);
				if(jsondata && jsondata.success){
					window.location.href='/admin/shtml/frame.shtml';
				}else{
					alert(jsondata.msg);
					document.getElementById("msgcontent").innerHTML=jsondatas.msg;
				}
				    })
			
		
		}
	}



	function closeMsg(){
		document.getElementById("showmsg").style.display="none";
	}
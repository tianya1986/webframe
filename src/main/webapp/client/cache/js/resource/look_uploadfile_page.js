$(function(){
	var fileId = $("#fileId").val();
	uploadfile.getComment(fileId);
	uploadfile.getUserList(fileId);
	uploadfile.getUserDownLoadRef(fileId);
});
var uploadfile={
	serviceUrl:"/client/operate/rscollect/",
	collection:function(id){
		$.ajax({
			dataType:"json",
			data:{"id":id},
			type: "POST",
			url: uploadfile.serviceUrl+'collection.do',
			success: function(data){
				alert(data.msg);
			}
		});
	},
	download:function(id){
//		window.location.href = "/client/operate/download/download.do?fileId="+id;
		$.ajax({
			dataType:"json",
			data:{"candownload":id},
			type: "POST",
			url: "/client/operate/paidRecord/candownload.do?fileId="+id,
			success: function(data){
				var code = data.code;
				if(code==0){
					alert("当前文件不能够下载");
				}else if(code==1){
					window.location.href = "/client/operate/paidRecord/download.do?fileId="+id;
				}else if(code==2){
					if(confirm("需要"+$("#money").html()+"积分,你确定要下载文件吗？"))
					 {
						window.location.href = "/client/operate/paidRecord/download.do?fileId="+id;
					 }
				}else{
					alert("余额不足");
				}
			}
		});
	},
	save:function(id){
		var score  = $('input:radio:checked').val();
		var comment =$("#comment").val();
		$.ajax({
			dataType:"json",
			data:{"fileId":id,"score":score,"comment":comment,"userId":1},
			type: "POST",
			url: "/client/operate/rscomment/insert.do",
			success: function(data){
				var msg = data.msg;
				alert(msg);
			}
		});
		$("#comment").val("");
		uploadfile.getComment(id);
	},
	getComment:function(id){
		$.ajax({
			dataType:"json",
			data:{"fileId":id},
			type: "POST",
			url: "/client/operate/rscomment/getList.do",
			success: function(data){
				if(data.rows){
					var rscomments = data.rows;
					var str="";
					for(var i=0;i<rscomments.length;i++){
						var createDate = new Date(rscomments[i].createDate).toLocaleString();
						str +="<div>"+rscomments[i].comment+"&nbsp;&nbsp;评分:"+rscomments[i].score+"&nbsp;&nbsp;评论时间:"+createDate+"</div></br>"
					}
					$("#comment_list").html(str);
				}
			}
		});
	},	
	attention:function(id){
		$.ajax({
			dataType:"json",
			data:{"userid":id,"beAttentionUserid":id},
			type: "POST",
			url: "/client/operate/attention/attention.do",
			success: function(data){
				alert(data.msg)
			}
		
		});
	},
	getUserList:function(fileId){
		$.ajax({
			dataType:"json",
			data:{"fileId":fileId},
			type: "POST",
			url: "/client/operate/paidRecord/getUserList.do",
			success: function(data){
				if(data.rows){
					var userList = data.rows;
					var str="";
					for(var i=0;i<userList.length;i++){
						str +="<li>"+userList[i].userName+"</li>"
					}
					$("#download_userlist").html(str);
				}
			}
		
		})
	},
	getUserDownLoadRef:function(fileId){
		$.ajax({
			dataType:"json",
			data:{"fileId":fileId},
			type: "POST",
			url: "/client/operate/paidRecord/getOtherDownLoad.do",
			success: function(data){
				if(data.rows){				
					var str = "";
					if(data.rows){
						var updFiles = data.rows;
						for(var i=0;i<updFiles.length;i++){
							str += "<a href=\""+uploadfile.serviceUrl+"getById.do?id="+updFiles[i].id+"\" target=\"_blank\">";
							str +="<img src=\"/client/images/icons/"+updFiles[i].fileFormat+".png\"/>";
							str += updFiles[i].fileName;
							str += "</a>";
							if(updFiles[i].openType==1){
								str += "&nbsp;价格 ：免费";
							}else{
								if(updFiles[i].paidAmount!=null)
									str += "&nbsp;价格 ：" + updFiles[i].paidAmount;
								else
									str += "&nbsp;价格 ：0";
							}
							
							str +="<br/>";					
						}
					}
					$("#download_ref").html(str);
				}
			}
		
		})
	}
};
$(function(){
	uploadfile.getClassify(null,"root_classify");
	uploadfile.getHotResource(0);
	uploadfile.getNewSource();
	uploadfile.getFileType(0);
	
});

var uploadfile={
	serviceUrl:"/client/resource/uploadFile/",
	getResource:function(id,divId,fileType,pid){
		$("a#a_"+divId+"_"+id).parent().children().removeClass("selected");	
		$("a#a_"+divId+"_"+id).addClass("selected");			
		$("#select_classify_"+divId).val(id);
		var fileTypes = $("#select_type_"+divId).val();
		$.ajax({
			dataType:"json",
			data:{classifyId:id,fileType:fileType,pid:divId},
			type: "POST",
			url: uploadfile.serviceUrl+'getResource.do',
			success: function(msg){
				var str = "";
				if(msg.rows){
					var updFiles = msg.rows;
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
						if(i>0 && i%2==1){
							str +="<br/>";
						}
					
					}
				}
				$("#div"+divId).html(str+"</br>");
			}
		});
	},
	getCourse:function(){
		$.ajax({
			//data:{"classfityCode":classfityCode,"fileType":fileType},
			dataType:"json",
			type: "POST",
			url: uploadfile.serviceUrl+'getCourse.do',
			success: function(msg){
				var str = "";
				if(msg.rows){
					var updFiles = msg.rows;
					for(var i=0;i<updFiles.length;i++){
						str +="<div style=\"width:280px;float:left;\">";
						str += "<a href=\""+uploadfile.serviceUrl+"getById.do?id="+updFiles[i].id+"\" target=\"_blank\">";
						str +="<img src=\"/client/images/icons/"+updFiles[i].fileFormat+".png\"/>";
						str += updFiles[i].fileName;
						str += "</a>";
						str +="&nbsp;&nbsp;&nbsp;&nbsp;";
						if(updFiles[i].openType==1){
							str += "免费";
						}else{
							str += "" + updFiles[i].paidAmount;
						}
						str += "</div>";
					}
				}
				$("#cource_div").html(str);
			}
		});
	},
	getAllResource:function(pid){
		$("a#a_"+pid).parent().children().removeClass("selected");
		$("a#a_"+pid).addClass("selected");
		
		$("a#type_"+pid).parent().children().removeClass("selected");
		$("a#type_"+pid).addClass("selected");
		uploadfile.getResource(null,pid,null,pid);
	},
	getType:function(fileType,divId){
		$("#select_type_"+divId).val(fileType);	
		$("a#type_"+divId+"_"+fileType).parent().children().removeClass("selected");	
		$("a#type_"+divId+"_"+fileType).addClass("selected");
		
		var classifyId = $("#select_classify_"+divId).val();
		if(divId>0)
			uploadfile.getResource(classifyId,divId,fileType,null);
		else
			uploadfile.getHotResource(fileType);
	},
	getFileType:function(divId){

		$.ajax({
			dataType:"json",
			type: "POST",
			url: '/client/fileType/getList.do',
			success: function(msg){
				var str = "<a href='#' id='type_"+divId+"_null' onclick='uploadfile.getType(null,"+divId+");'>全部</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
				if(msg){			
					var fileTypes = msg;
					for(var i=0;i<fileTypes.length;i++){
						str+="<a href='#' id='type_"+divId+"_"+fileTypes[i].id+"' onclick='uploadfile.getType("+fileTypes[i].id+","+divId+");'>"+fileTypes[i].name+"</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
					}
					$("#file_type_"+divId).html(str+"<input type='hidden' id='select_type_"+divId+"'/>");
				}
			}
		});
	
	},
	getClassify:function(pid,classDivId){
		$.ajax({
			dataType:"json",
			type: "POST",
			url: '/client/classify/getListByTree.do',
			data:{pid:pid},
			success: function(msg){
				var str = "";
				if(msg){
					var classifys = msg;
					for(var i=0;i<classifys.length;i++){
						str += "<a href='#' onclick='uploadfile.getSubClassify("+classifys[i].id+");'>"+classifys[i].text+"</a>&nbsp; "
					}
				}
				$("#"+classDivId).html(str);
				uploadfile.getSubClassify(classifys[0].id);
			}
		});
	},
	getSubClassify:function(pid){
		$.ajax({
			dataType:"json",
			type: "POST",
			url: '/client/classify/getListByTree.do',
			data:{pid:pid},
			success: function(msg){
				var str = "";
				if(msg){
					var classifys = msg;
					for(var i=0;i<classifys.length;i++){
						str += "<li><a  href='/client/shtml/classify/ClassifyNavigate.shtml?pid="+pid+"&subClassifyId="+classifys[i].id+"'>"+classifys[i].text+"资源</a>";						
						str +="<ul id='"+classifys[i].id+"'></ul></li><div id='file_type_"+classifys[i].id+"'></div><div id='div"+classifys[i].id+"'></div>";
					}
					$("#sub_classify").html("<ul>"+str+"</ul>");
					for(var i=0;i<classifys.length;i++){
						uploadfile.getThreeClassify(classifys[i].id);
					}
					
					for(var i=0;i<classifys.length;i++){
						uploadfile.getFileType(classifys[i].id);
					}
				}
				
			}
		});
	},
	getThreeClassify:function(pid){
		$.ajax({
			dataType:"json",
			type: "POST",
			url: '/client/classify/getListByTree.do',
			data:{pid:pid},
			success: function(msg){
				var str = "<a id='a_"+pid+"' href='#' onclick='uploadfile.getAllResource("+pid+");'>全部</a>";
				if(msg){
					var classifys = msg;
					for(var i=0;i<classifys.length;i++){
						str += "&nbsp;&nbsp;<a href='#' id='a_"+pid+"_"+classifys[i].id+"' onclick='uploadfile.getResource("+classifys[i].id+","+pid+",null,null);'>"+classifys[i].text+"</a>";
					}
					/*str+="</br><a href='#' onclick='uploadfile.getType(1);'>课件</a>"
						+"&nbsp;&nbsp;<a href='#' onclick='uploadfile.getType(2);'>习题</a>"
						+"&nbsp;&nbsp;<a href='#' onclick='uploadfile.getType(3);'>教案</a>"
						+"&nbsp;&nbsp;<a href='#' onclick='uploadfile.getType(4);'>视频</a>"
						+"&nbsp;&nbsp;<a href='#' onclick='uploadfile.getType(5);'>教学方法</a>";
					*/
			
					$("#"+pid).html(str+"<input type='hidden' id='select_classify_"+pid+"'/></br>");
					uploadfile.getAllResource(pid);
				}
				
			}
		});
	},
	getHotResource:function(fileType){	
		$.ajax({
			dataType:"json",
			type: "POST",
			data:{fileType:fileType},
			url: uploadfile.serviceUrl+'getHotResource.do',
			success: function(msg){
				var str = "";
				if(msg.rows){
					var updFiles = msg.rows;
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
						if(i>0 && i%2==1){
							str +="<br/>";
						}
					
					}
				}
				$("#hot_file_list").html(str+"</br>");
			}
		});
	},
	getNewSource:function(){	
		$.ajax({
			dataType:"json",
			type: "POST",
			url: uploadfile.serviceUrl+'getNewResource.do',
			success: function(data){
				var str = "";
				var data = eval(data);
				if(data){
					for(var i=0;i<data.length;i++){
						var entity = data[i];
						str += entity.userInfoAndDetail.nickname+"&nbsp;";
						str += "<a href=\""+uploadfile.serviceUrl+"getById.do?id="+entity.id+"\" target=\"_blank\">";
						str += entity.fileName;
						str += "</a>";
						if(entity.openType==1){
							str += "&nbsp;价格 ：免费";
						}else{
							if(entity.paidAmount!=null)
								str += "&nbsp;价格 ：" + entity.paidAmount;
							else
								str += "&nbsp;价格 ：0";
						}
						str +="<br/>";
					}
				}
				$("#new_resource").html(str+"</br>");
			}
		});
	}
};
$(function(){
	userAttenUnit.getAttenUnit(1);
	
});
var userAttenUnit={
	serviceUrl:"/client/resource/userAttentionUnit/",
	getAttenUnit:function(userId){
		
		$.ajax({
			data:{userId:userId},
			type: "POST",
			url: userAttenUnit.serviceUrl+'getAttentionUnit.do',
			success: function(msg){
				var str = "";
				if(msg.rows){
					var updFiles = msg.rows;
					for(var i=0;i<updFiles.length;i++){
						str +="<option value="+ updFiles[i].classifyCode+">"+updFiles[i].classifyFullName+"</option>";
					}
				}
				$("#select-list").append(str);
			}
		});
	},	
	getResource:function(){
		
		var selectValue = $("#select-list").val();
	
		$.ajax({
			data:{"classfityCode":selectValue},
			type: "POST",
			url: '/client/resource/uploadFile/getResource.do',
			success: function(msg){
				var str = "";
				if(msg.rows){
					var updFiles = msg.rows;
				
					for(var i=0;i<updFiles.length;i++){
					
						str +="<div>";
						str += "<a  target=\"_blank\">";
						str +="<img src=\"/client/images/icons/"+updFiles[i].fileFormat+".png\"/>";
						str += updFiles[i].fileName;
						str += "</a>";
						str +="&nbsp;&nbsp;&nbsp;&nbsp;";
						str += "</div>";
					}
				}
				
		
				$("#resource_div_1").html(str);
			}
		});
	},
	getUserResource:function(){
		$.ajax({
			type: "POST",
			url: '/client/resource/uploadFile/getUserResource.do',
			success: function(msg){
				var str = "";
				if(msg.rows){
					var updFiles = msg.rows;
				
					for(var i=0;i<updFiles.length;i++){
					
						str +="<div>";
						str += "<a  target=\"_blank\">";
						str +="<img src=\"/client/images/icons/"+updFiles[i].fileFormat+".png\"/>";
						str += updFiles[i].fileName;
						str += "</a>";
						str +="&nbsp;&nbsp;&nbsp;&nbsp;";
						str += "</div>";
					}
				}
				
		
				$("#user_resource_div").html(str);
			}
		});
	}
	
};
$(function(){
	  classifyTree.loadMain();
	  classifyTree.getFileType();
	  $("li > a").live('click',function(){
		 	
	  });
});

var tree = $("#unit-list");
var pid  = getURLParameter("pid");
var subClassifyId = getURLParameter("subClassifyId");
var classifyIdAtten;
var classifyTree={
		dataType:"json",
		serverUrl:'/client/classify/',
		loadMain:function(){		
			var _url = this.serverUrl;				
			$.ajax({
				dataType:"json",
				url:_url+'getListByTree.do',
				success :function(data){
					var html ="";
					$.each(data,function(index){
						html = html + "<li><a  href='/client/shtml/classify/ClassifyNavigate.shtml?pid="+this.id+"'>"+this.text+"&nbsp;&nbsp;</a></li>";						
					});  
					$("#wk-all-cate").html("<dl><dt></dt> <dd><div><ul>"+html+"</ul> </div> </dd> </dl> <dl>");									
					classifyTree.loadSub(pid,1);																		
				}
			});
				
		},
		loadSub:function(id,level){	
			
		
		
			for(var i = level+1;i<5;i++){
				$("#sel-list-"+i).html("");
			}
			 
			  $("#"+id).parent().children().removeClass("selected");	
			  $("#"+id).addClass("selected");
			var _url = this.serverUrl;				
			$.ajax({
				dataType:"json",
				url:_url+'getListByTree.do',
				data:{pid:id},
				success :function(data){
					var html ="";
					var flage = false;
					var level = 0;
					$.each(data,function(index){
						level = this.level;
						
						html = html + "<li id='"+this.id+"'><a onclick=classifyTree.loadSub("+this.id+","+level+");>"+this.text+"</a></li>";						
						flage = true;
						
					});  
				
					if(flage){
						if(id != null){
				
							//$("#select-area").append("<div class='sel-list' id='sel-"+level+"'><dl><dt></dt> <dd><ul>"+html+"</ul> </dd> </dl> <dl></div></br> ");
							$("#sel-list-"+level).html(html);
							
						}
						if(subClassifyId == null){
							classifyTree.loadSub(data[0].id);
							classifyIdAtten = data[0].id;
						}else{
							classifyTree.loadSub(subClassifyId);
							classifyIdAtten = subClassifyId;
							subClassifyId = null;
						}
					}
						
					classifyTree.loadUnit(id);
					

				}
			});
				
		},
		loadUnit:function(classId){		
			var _url = '/client/classifyDir/';							
			$.ajax({
				dataType:"json",
				url:_url+'getAllListByTreeForCode.do',
				data:{classifyId:classId},
				success :function(data){
					var html ="";
					var flage = false;
					$("#unit-list").html("");
					$.each(data,function(index){
						var html = "<li class='unit-item'> <a href='?unite=u0' class='unit-link strong ib' title='"+this.text+"'  target='_self'><b> "+this.text+"</b></a>";
						$("#unit-list").append(html);
						//classifyTree.loadLesson(this.id,classId);
						
						if(this.children!=""){
							$("#unit-list").append("<ul class='lesson-list'>");
							$.each(this.children,function(index){
								var subhtml = "<li class='lesson-item'> <a href='?unite=u0' class='unit-link strong ib' title='"+this.text+"'  target='_self'><b> "+this.text+"</b></a></li>";
								$("#unit-list").append(subhtml);
								
							});  
							$("#unit-list").append("</ul>");
						}
						$("#unit-list").append("</li>");
						
					});  
				

				}
			});
				
		},
		loadLesson:function(pid,classId){
			
			var _url = '/client/classifyDir/';
	
			$.ajax({
				dataType:"json",
				url:_url+'getListByTree.do',
				data:{pid:pid,classifyId:classId},
				success :function(data){
					var html ="";
					var flage = false;
					$("#unit-list").append("<ul class='lesson-list'>");
					$.each(data,function(index){
						html = "<li class='lesson-item'> <a href='?unite=u0' class='unit-link strong ib' title='"+this.text+"'  target='_self'><b> "+this.text+"</b></a></li>";
						$("#unit-list").append(html);
						classifyTree.loadLesson(this.id,classId);
					});  
					$("#unit-list").append("</ul>")
					

				}
			});
				
		},
		openCreate:function(){
			 $("#createSiteForm").form("clear");
			 $('#createSite').dialog("open");   
		},		
		save:function(){
			var isAtten = $('input:radio:checked').val();
			if(isAtten == 0){
				$('#createSite').dialog('close');
				return false;
			}
			
			$('#createSiteForm').form('submit',{
				dataType:"json",
			    url:'/client/resource/userAttentionUnit/insert.do',
			    onSubmit:function(param){
			    	 if(param.isAttention ==0)
				    	   return;
			       param.classifyId = classifyIdAtten;
			       if(param.classifyId==null)
			    	   param.classifyId = pid;
			       param.remindFlag = $('input:checkbox:checked').val();
			       
			      param.userId=1;
			       return $(this).form('validate');
			    },
			    success:function(data){
			    	data=JSON.StrToJSON(data);
			    	if(data.success)
		    		{
			    		$('#createSite').dialog("close");
				    	$.messager.show({
				    		msg:data.msg,
				    		timeout:2000
				    	});				    	
				    	$('#site-datagrid').datagrid("reload");
		    		}	
			    }
			});
		},
		getFileType:function(){

			$.ajax({
				dataType:"json",
				type: "POST",
				url: '/client/fileType/getList.do',
				success: function(msg){
					var str = " <li class='selected'> <span> 全部（17,394份） </span> </li>";
					if(msg){			
						var fileTypes = msg;
						for(var i=0;i<fileTypes.length;i++){
							str+="<li> <a href='?unite=0&lesson=0&stype=1&order=0'> "+fileTypes[i].name+"</a> </li>";
						}
						$("#file_type").html(str);
					}
				}
			});
		
		},
		reload:function(){
	    	tree.tree('options').url = "/client/classify/getListByTree.do";
			tree.tree('reload');
		}
};



$(function(){
	 $('#upload_file_cue_div').dialog({});
	 $('#upload_file_cue_div').dialog('close');
	 $('#choose_folder_div').dialog({});
	 $('#choose_folder_div').dialog('close');
	 $('#edit_file_msg_div').dialog({});
	 $('#edit_file_msg_div').dialog('close');
	 uploadfile.getAll();
});
var uploadfile={
		serviceUrl:"/client/resource/uploadFile/",
		folderIndex:1,
		upoadFileNum:0,
		query:function(){
			//分页查询文件夹及文件
			var folderId = $("#query_form").find("[name='folderId']").val();
			var folderOrFileType = $("#query_form").find("[name='folderOrFileType']").val();
			$("#query_list_table").height($(window).height()-$(".tool-bar").height()-$(".filter-bar").height()-50);
			$('#query_list_table').datagrid({
				idField:"id",
				method:"POST",
				singleSelect:false,
				rownumbers:true,
				pagination:true,
				fitColumns:true,
				border:true,
				queryParams:{"folderId":folderId,"folderOrFileType":folderOrFileType},
				url : uploadfile.serviceUrl+'queryPage.do',
				columns : [ [  {field : 'ck',width : 30,align:'center',checkbox:true},
				              {field : 'fileName',title : '文件名',width : 120,align:'left',
								formatter: function(value,row,index){
									var str = "";
									if(row.folderOrFileType==0){
										str += "<a href=\"#\" onclick=\"uploadfile.queryByFolderId('"+row.id+"','"+row.fileName+"');\">";
										str +="<img src=\"/client/images/icons/folder.png\"/>";
									}else if(row.folderOrFileType==3){
										str +="<img src=\"/client/images/icons/folder.png\"/>";
									}else{
										str += "<a href=\""+uploadfile.serviceUrl+"getById.do?id="+row.id+"\" target=\"_blank\">";
										str +="<img src=\"/client/images/icons/"+row.fileFormat+".png\"/>";
									}
									str += value;
									str +="</a>";
									return str;
							  },editor:'text'
				
				              },
				              {field : 'paidAmount',title : '价格',width : 60,align:'center'},
				              {field : 'fileTypeName',title : '资源类型',width : 60,align:'center'},
				              {field : 'openType',title : '公开类型',width : 60,align:'center',
									formatter: function(value,row,index){
										var str = "";
										if(value==0){
											str +="私有文档";
										}else if(value==1){
											str +="普通文档";
										}else if(value==2){
											str +="付费文档";
										}else if(value==3){
											str +="提交中";
										}
										return str;
								  }},
								  {field : 'checkStatus',title : '审核情况',width : 50,align:'center',
									  formatter: function(value,row,index){
										  var str = "";
										  if(row.openType!=0 && row.checkRecord){
											if(row.checkRecord.checkStatus==0){
												str += "未审核";
											}else{
												str += "审核";
											}
										}
										  return str;
									 }},
							  {field : 'uploadTimeStr',title : '创建时间',width : 120,align:'center'},
							  {field:'opt',title:'操作',width : 80,align:'center',
									formatter: function(value,row,index){
										var str = "";
										if(row.folderOrFileType==0){
											 if (row.editing){
												 str += "<a href=\"#\" onclick=\"uploadfile.saverow("+index+");\">保存</a>&nbsp;&nbsp;";
												 str += "<a href=\"#\" onclick=\"uploadfile.cancelrow("+index+");\">取消</a>";
											 }else{
												 str += "<a href=\"#\" onclick=\"uploadfile.editFolderMsg("+index+");\">编辑</a>";											
								      		}
											
										}else if (row.folderOrFileType==3){
											
											str += "<input type='button' onclick='uploadfile.saveFolder(false);' value='确定'/>&nbsp;<a href='#' onclick='uploadfile.cancelFolder();'>取消</a>";
											
										}else{
											//if(row.openType==0){
											str += "<a href=\"#\" onclick=\"uploadfile.editFileMsg("+index+");\">编辑</a>&nbsp;&nbsp;";
											str += "<a href=\"#\" onclick=\"uploadfile.download("+row.id+");\">下载</a>";
										
											//}
											//str += "&nbsp;&nbsp;<a href=\"#\" onclick=\"javascript:alert('调用统一接口，待实现');\">下载</a>";
										}
										return str;
								  }}
				          ] ],
				pageList: [50,100,150],
				onBeforeEdit:function(index,row){

			        row.editing = true;

			        $('#query_list_table').datagrid('refreshRow', index);

			    },

			    onAfterEdit:function(index,row){

			        row.editing = false;

			        $('#query_list_table').datagrid('refreshRow', index);

			    },

			    onCancelEdit:function(index,row){

			        row.editing = false;

			        $('#query_list_table').datagrid('refreshRow', index);

			    }
			});
			$('#query_list_table').datagrid('clearSelections'); 
		},
		getAll:function(){
			$("#folder_list_div").css("display","none");
			$("#query_form").find("[name='folderId']").val(0);
			$("#query_form").find("[name='folderOrFileType']").val("");
			$("#add_folder_btn").show();
			uploadfile.query();
		},
		queryByFolderId:function(folderId,folderName){
			$("#folder_list_div").html("\>\><a href=\"#\" onclick=\"uploadfile.queryByFolderId('"+folderId+"','"+folderName+"');\">"+folderName+"<a>");
			$("#folder_list_div").css("display","");
			$("#query_form").find("[name='folderId']").val(folderId);
			$("#query_form").find("[name='folderOrFileType']").val("1");
			$("#add_folder_btn").hide();
			uploadfile.query();
		},
		upload:function(){
			//文件上传事件
			document.getElementById("file").click();
//			$('#createSite').dialog('open');
		},
		fileSubmit:function(){
			//文件上传提交
			var typeId =$("#typeId").val();
			typeId+=1;
			$("#typeId").val(typeId);
			var obj = document.getElementById("file").value;
			var ext =obj.substring(obj.lastIndexOf("."));
			var typeArr = ['.doc','.ppt','.pdf','.docx','.pptx'];
			var flag = false;
			for(var i=0;i<typeArr.length;i++){
				 if(typeArr[i]==ext){
					 flag = true;
				 }
			}
			if(flag == false){
				$.messager.alert("系统信息","请选择'doc','ppt','pdf','docx','pptx'文件格式！");
			}else{
				var url=obj.split("\\");
				$("#upload_wait_cue_id").append("<tr><td>"+url[url.length-1]+"</td><td id=\"type_id_"+typeId+"\" style=\"color:red;\">上传中.......</td></tr>");
				$('#upload_file_cue_div').dialog('open');
				var folderId =$("#sel_folderId").val();
				$("#form").attr("action",uploadfile.serviceUrl+"upload.do");
//				document.form.submit();
				$('#form').form('submit',{
					onSubmit:function(param){
					       param.folderId = folderId;
					    },
				    url:uploadfile.serviceUrl+"upload.do",
				    success:function(data){
				    	$("#type_id_"+typeId).html(data);
				    }
				});
			}
	        obj.outerHTML = obj.outerHTML;
	        document.getElementById("file").value="";
		},
       uploadFileCue:function(typeId,reStatus){
    	   //文件上传提醒
    	   var str = "";
    	   if(reStatus=="0"){
    		   str = "文件上传成功!";
    		   uploadfile.upoadFileNum++;
    	   }else if(reStatus=="1"){
    		   str = "文件上传失败，非资源要求格式!";
    	   }else if(reStatus=="2"){
    		   str = "文件上传失败，为空文件!";
    	   }else{
    		   str = "文件上传失败，系统异常!";
    	   }
    	   $("#type_id_"+typeId).html(str);
       },editFolderMsg:function(index){
    	   $('#query_list_table').datagrid('beginEdit', index);
       },editFileMsg:function(index){
    	   $("#show_paid_msg").css("display","none");
    	   var row =($('#query_list_table').datagrid('getRows'))[index];
    	   if(row["openType"]==2||row["openType"]==1){
    		   $.messager.alert("系统信息","发布的文件不能修改！");
    		   return;
    	   }
    	   $('#updateSiteForm').form('reset');
    	   $('#query_list_table').datagrid('clearSelections'); 
    	   $('#edit_file_msg_div').dialog('open');
//    	   $('#query_list_table').datagrid("selectRecord",id);
		   $('#updateSiteForm').form('load',row);
       },update:function(){
    	   $('#updateSiteForm').form('submit',{
			    url:uploadfile.serviceUrl+'update.do',
			    type: "POST",
			    onSubmit:function(){
			       return $(this).form('validate');
			    },
			    success:function(data){
			    	data=JSON.StrToJSON(data);
			    	if(data.success){			    	
				    	$('#edit_file_msg_div').dialog("close");   
				    	$.messager.show({
							title:'提示',
							msg:"保存成功，5秒后自动关闭窗口！",
							timeout:5000,
							showType:'slide'
						});
				    	uploadfile.query();
		    		}else{
		    			$.messager.alert("系统信息","保存失败！");
		    		}
			    }
			});
       },setPaidMsg:function(obj){
    	   if($(obj).val()==2 || $(obj).val()==1){
    		   if($(obj).val()==1){
				   $("#money_symbo").text("积分");
			   }else{
				   $("#money_symbo").text("￥");
			   }
    		   $("#edit_file_msg_div #show_paid_msg").css("display","");
    	   }else{
    		   $("#edit_file_msg_div #show_paid_msg").css("display","none");
    	   }
       },del:function(){
    	    var rows = $('#query_list_table').datagrid('getSelections'); 
			if(rows.length==0){
				$.messager.alert("系统信息","请选择需要删除的文件夹或文档！");
				return ;
			}
			var contents ="[";
			for(var i=0;i<rows.length;i++){
				contents += "{\"id\":\""+rows[i]["id"]+"\",\"folderOrFileType\":\""+rows[i]["folderOrFileType"]+"\"}";
				if(rows.length>(i+1)){
					contents += ",";
				}
			}
			contents +="]";
			$.messager.confirm("系统信息","确定要删除文件夹或文档吗？",function(r){
				if(r){
					$.ajax({
						dataType:"json",
						data:{"contents":contents},
						type: "POST",
						url: uploadfile.serviceUrl+'delete.do',
						success: function(msg){
							if(msg.success){
								$.messager.show({
									title:'提示',
									msg:"删除成功，5秒后自动关闭窗口！",
									timeout:5000,
									showType:'slide'
								});
								uploadfile.query();
							}else{
								$.messager.alert("系统信息","删除失败！");
							}
						}
					});
				}
			});
       },
       addFolder:function(){
    	   //新增文件夹
    	   uploadfile.saveFolder(true);
    	   
       },cancelFolder:function(){
    	   //取消新增文件夹
    	   $('#query_list_table').datagrid('deleteRow',0);
       },saveFolder:function(isConAdd){
    	   //保存文件夹
    	   $('#query_list_table').datagrid('clearSelections'); 
    	   $('#query_list_table').datagrid("selectRecord","folder_id");
    	  var row =  $('#query_list_table').datagrid('getSelected');
    	  if(isConAdd){
    		  if(row==null || row["id"] !="folder_id"){
        		  uploadfile.addFolderUi();
        		  return ;
        	  }
    	  }
    	  row.folderOrFileType = 0;
    	  var folderName = $("#folderName").val();
    	  if(folderName==""){
    		  alert("请输入文件名!");
    	  	  return ;
    	  }	  
		  $.ajax({
			  	dataType:"json",
				data:{"folderName":folderName,"type":0},
				type: "POST",
				url: '/client/resource/folder/save.do',
				success: function(msg){
					if(msg.success){
						$.messager.show({
							title:'提示',
							msg:"文件夹保存成功，5秒后自动关闭窗口！",
							timeout:5000,
							showType:'slide'
						});
						var index = $('#query_list_table').datagrid('getRowIndex', row);
						row.fileName = folderName;
						row.id = msg.obj;
						$('#query_list_table').datagrid('refreshRow', index);
						var rows = $('#query_list_table').datagrid('getRows');
						var pageSize = $('#query_list_table').datagrid('options').pageSize; 
						if(pageSize<rows.length){
							 $('#query_list_table').datagrid('deleteRow',pageSize);
						}
						if(isConAdd){
							uploadfile.addFolderUi();
						}
					}else{
						$.messager.alert("系统信息",msg.msg);
					}
				},error:function(){
					$.messager.alert("系统信息","文件夹保存失败！");
				}
			});
       },addFolderUi:function(){
    	   $('#query_list_table').datagrid('insertRow',{
	   			index: 0,	// index start with 0
	   			row: {
	   				id:"folder_id",
	   				fileName: '<input type="text" id="folderName" name="folderName" value="文件夹'+uploadfile.folderIndex+'" size="20px"/>',
	   				folderOrFileType:3	   			
	   			}
	   		});
    	   uploadfile.folderIndex++;
       },moveFile:function(){
    	  var folderId =  $("#query_form").find("[name='folderId']").val();
    	   //移动文件到文件夹中
    	   var rows = $('#query_list_table').datagrid('getSelections'); 
			if(rows.length==0){
				$.messager.alert("系统信息","请选择需要移动的文档！");
				return ;
			}else{
				for(var i=0;i<rows.length;i++){
					//判断folderOrFileType =0 表示为文件夹，且不包含自己
					if(rows[i]["folderOrFileType"]==0 && rows[i].id != folderId){
						$.messager.alert("系统信息","文件夹不能移动！");
						return ;
					}
				}
			}
    	   $('#choose_folder_div').dialog('open');
    	    $("#folder_list_table").height(430);
   			$('#folder_list_table').datagrid({
   				idField:"id",
   				method:"POST",
   				dataType:"json",
   				singleSelect:true,
   				fitColumns:true,
   				border:true,
   				queryParams:{"type":0,"status":0,"folderId":folderId},
   				url : '/client/resource/folder/getList.do',
   				columns : [ [ {field : 'folderName',title : '文件名',width : 120,align:'left'}] ]
   			});
       },saveMoveFile:function(type){
    	   var folderId = 0;
    	   if(type!=0){
    		 //保存文件到文件夹中
        	   var folderRow = $('#folder_list_table').datagrid('getSelected'); 
        	   if(folderRow==null){
        		   $.messager.alert("系统信息","请选择文件夹！");
        		   return ;
        	   }
        	   folderId = folderRow["id"];
    	   }
    	   var rows = $('#query_list_table').datagrid('getSelections'); 
    	   var contents ="[";
			for(var i=0;i<rows.length;i++){
				contents += "{\"id\":\""+rows[i]["id"]+"\"}";
				if(rows.length>(i+1)){
					contents += ",";
				}
			}
			contents +="]";
			 $.ajax({
				 	dataType:"json",
					data:{"contents":contents,"folderId":folderId},
					type: "POST",
					url: uploadfile.serviceUrl+'saveMoveFile.do',
					success: function(msg){
						if(msg.success){
							$.messager.show({
								title:'提示',
								msg:"文档移动成功，5秒后自动关闭窗口！",
								timeout:5000,
								showType:'slide'
							});
							uploadfile.query();
							$('#choose_folder_div').dialog('close');
						}else{
							$.messager.alert("系统信息","保存失败！");
						}
					},error:function(){
						$.messager.alert("系统信息","保存失败！");
					}
				});
       },colseUploadFile:function(){
    	  
    	  // if(uploadfile.upoadFileNum>0){
    
    		   uploadfile.query();
    		   uploadfile.upoadFileNum = 0;
    	   //}
    	   return true;
       },saveAddFolder:function(){
    	   var folderName = $("#addfolderName").val();
     	  if(folderName==""){
     		  alert("请输入文件名!");
     	  	  return ;
     	  }	  
		  $.ajax({
			  	dataType:"json",
				data:{"folderName":folderName,"type":0},
				type: "POST",
				url: '/client/resource/folder/save.do',
				success: function(msg){
					if(msg.success){
						$.messager.alert("系统信息",msg.msg);
						$('#folder_list_table').datagrid('reload'); 
						$("#addfolderName").val("");
					}else{
						$.messager.alert("系统信息",msg.msg);
					}
				},error:function(){
					$.messager.alert("系统信息","文件夹保存失败！");
				}
			});
       },saverow:function(index){
    	   var row =($('#query_list_table').datagrid('getRows'))[index];
    	   
    	   var editors = $('#query_list_table').datagrid('getEditors', index)[0];
    	   
    	   var newFolderName = editors.target.val();
    	
    	  $('#query_list_table').datagrid('endEdit', index);
    	  $.ajax({
			  	dataType:"json",
				data:{"id":row.id,"folderName":newFolderName,"type":0},
				type: "POST",
				url: '/client/resource/folder/update.do',
				success: function(msg){
					if(msg.success){
						$.messager.alert("系统信息",msg.msg);
					}else{
						$.messager.alert("系统信息",msg.msg);
					}
				},error:function(){
					$.messager.alert("系统信息","文件夹保存失败！");
				}
			});

    	},cancelrow:function(index){

    	    $('#query_list_table').datagrid('cancelEdit', index);

    	},
    	download:function(id){
    		$.ajax({
    			dataType:"json",
    			data:{"candownload":id},
    			type: "POST",
    			url: "/client/operate/paidRecord/candownload.do?fileId="+id,
    			success: function(data){ 			 			
    				window.location.href = "/client/operate/paidRecord/download.do?fileId="+id;
    				
    			}
    		});
    	},
};
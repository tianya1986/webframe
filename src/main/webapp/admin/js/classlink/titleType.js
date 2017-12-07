var titleType={
		serverUrl:'/admin/title/titleType/',
		fmtOperate:function(val, row, index){
			return '<a href="javascript:void(0);" onclick="titleType.openUpdate('+index+')">修改</a>'+
			'&nbsp;&nbsp;<a href="javascript:void(0);" onclick="titleType.del('+val+')">删除</a>';
		},
		openCreate:function(){
			 $("#createSiteForm").form("clear");
			 $("#super_id_save").val(super_id);
			 $('#createSite').dialog("open");
		/*	 $.ajax({
					dataType:"json",
					url:'/admin/title/titleType/getTilteType.do',
					data:{},
					success :function(data){
						 $('#super_id_save').combotree('loadData',[{id:1,text:'虚拟节点',children:data}]);
						 
					}
				});
			 $('#super_id_save').combotree({
				    onClick:function(node){
				    	if(node.attributes.level == 4){
				    		 $('#super_id_save').combotree('clear');
				    		 $.messager.alert('提示','最多只能添加四级菜单','error');	 
				    		 return  $("#createSiteForm").form('validate');
				    	}

				    }
				});*/
		},
		search:function(){
			var type_name=$("#type_name").val();
			$('#site-datagrid').datagrid("reload",{type_name:type_name});	
		},
		save:function(){
			$('#createSiteForm').form('submit',{
			    url:this.serverUrl+'insert.do',
			    onSubmit:function(){
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
				    	parent.treeFrame.location.reload();
		    		}	
			    	else
			    		{
			    		$.messager.alert('提示',data.msg,'info');					    		
			    		}
			    },error:function(){
			    	$.messager.alert('提示','提交数据异常，请核对后再提交！','error');
			    }
			});
		},
		openUpdate:function(index){
			var row =($('#site-datagrid').datagrid('getRows'))[index];
			$("#lastCode").val(row.code);
			
			$('#updateSite').form('load',row);
			
			$('#updateSite').dialog("open");
			 $('#super_id_update').combotree({
				    url: '/admin/title/titleType/getTilteType.do',
				    method:'get',
				    required: true
				});
			 $('#super_id_update').combotree('setValue', row.super_id);
		},
		update:function(){
			$('#updateSiteForm').form('submit',{
			    url:this.serverUrl+'update.do',
			    onSubmit:function(){
			       return $(this).form('validate');
			    },
			    success:function(data){
			    	data=JSON.StrToJSON(data);
			    	if(data.success)
		    		{			    	
				    	$('#updateSite').dialog("close");   
				    	$.messager.show({
				    		msg:data.msg,
				    		timeout:2000
				    	});
				    	$('#site-datagrid').datagrid("reload");
				    	parent.treeFrame.location.reload();
		    		}
			    	else
		    		{
			    		$.messager.alert('提示',data.msg,'error');
		    		}
			    }
			});
		},
		del:function(id){
			var _url = this.serverUrl;
			$.messager.confirm("提示","删除父节点，子节点将一并删除！确定？",function(b){
				if(b){
					$.ajax({
						dataType:"json",
						url:_url+'delete.do',
						data:{id:id},
						success :function(data){
							if(data.success){
								parent.treeFrame.location.reload();
								$('#site-datagrid').datagrid("reload");
						    	$.messager.show({
						    		title:"删除知识点",
						    		msg:data.msg,
						    		timeout:2000
						    	});
							}else{
								$.messager.alert('提示',data.msg,'info');
							}
							
						}
					});
				}
			});
		}
		
};

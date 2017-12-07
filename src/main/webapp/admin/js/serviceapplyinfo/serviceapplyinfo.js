var serviceApplyInfo={
		serverUrl:'/serviceApplyInfo/',		
		fmtOperate:function(val, row, index){
			return '&nbsp;&nbsp;<a href="javascript:void(0);" onclick="serviceApplyInfo.del(\''+val+'\')">删除同一环境</a><br />&nbsp;&nbsp;<a href="javascript:void(0);" onclick="serviceApplyInfo.delOne(\''+val+'\')">删除当前应用</a>';
		},
		openCreate:function(){
			 $("#createSiteForm").form("clear");
			 $('#createSite').dialog("open");   
			 $('[name="isvalid"]:radio').each(function() {   
				    if (this.value == '0'){   
				       this.checked = true;   
				    }       
			 });   
			 $('[name="isauth"]:radio').each(function() {   
				    if (this.value == '1'){   
				       this.checked = true;   
				    }       
			 });   
		},
		search:function(){
			var status=$("#status").val();
			var deployType=$("#deployType").val();
			var outernet=$("#outernet").val();
			var appName=$("#appName").val();	
			$('#site-datagrid').datagrid("reload",{appName:appName,status:status,outernet:outernet,deployType:deployType});	
		},
		openUpdate:function(index){
			var row =($('#site-datagrid').datagrid('getRows'))[index];
			$('#updateSite').form('load',row);
			$('#updateSite').dialog("open"); 
			
		},
		save:function(){
			$('#createSiteForm').form('submit',{
			    url:'/serviceApplyInfo',
			    onSubmit:function(param){
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
			    	else
			    		{
					    	alert(data.msg);					    		
			    		}
			    }
			});
		},
		update:function(){
			var id=$("#up_id").val();
			$('#updateSiteForm').form('submit',{
			    url:this.serverUrl+id,
			    onSubmit:function(param){
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
		    		}
			    	else
		    		{
		    			alert(data.msg);
		    		}
			    }
			});
		},
		del:function(id){
			var _url = this.serverUrl;
			$.messager.confirm("提示","确认要删除此信息吗",function(b){
				if(b){
					$.ajax({
						dataType:"json",
						url:_url+id,
						type: 'DELETE',	
						success :function(data){
							$('#site-datagrid').datagrid("reload");
					    	$.messager.show({
					    		msg:data.msg,
					    		timeout:2000
					    	});
						}
					});
				}
			});
		},
		delOne:function(id){
			var _url = this.serverUrl;
			$.messager.confirm("提示","确认要删除此信息吗",function(b){
				if(b){
					$.ajax({
						dataType:"json",
						url:_url+id+"/action/deleteOne",
						type: 'DELETE',	
						success :function(data){
							$('#site-datagrid').datagrid("reload");
					    	$.messager.show({
					    		msg:data.msg,
					    		timeout:2000
					    	});
						}
					});
				}
			});
		},
		reSearch:function(){
			$('#query_form').form("reset");
			serviceApplyInfo.search();
		}	
};


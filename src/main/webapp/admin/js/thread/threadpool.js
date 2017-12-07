var threadpool={
		serverUrl:'/admin/threadpool/',
		fmtOperate:function(val, row, index){
			return '<a href="javascript:void(0);" onclick="threadpool.openUpdate('+index+')">修改</a>'+
			'&nbsp;&nbsp;<a href="javascript:void(0);" onclick="threadpool.del('+val+')">删除</a>';
		},
		openCreate:function(){
			 $("#createSiteForm").form("clear");
			 $('#createSite').dialog("open");   
		},
		search:function(){
//			var ip=$("#name").val();
			//var code=$("#code").val();
			$('#site-datagrid').datagrid("reload",{});	
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
		    		}	
			    	else
			    		{
					    	alert(data.msg);					    		
			    		}
			    }
			});
		},
		openUpdate:function(index){
			var row =($('#site-datagrid').datagrid('getRows'))[index];
			$("#lastCode").val(row.code);
			$('#updateSite').form('load',row);
			$('#updateSite').dialog("open"); 
			
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
						url:_url+'delete/'+id,
						type:"DELETE",
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
		validCode:function(type){
			var tempType = type;
			var code = $("#code"+type).val();
			if($("#code"+type).val() != $("#lastCode").val()){
				type = 0;
			}
			var _url = this.serverUrl;
					$.ajax({
						dataType:"json",
						url:_url+'validCode.do',
						data:{code:code,type:type},
						success :function(data){
					    	if(data.success)
				    		{			    	  
						    	$.messager.alert('提示',data.msg,'error',function(){
						    		$("#code"+tempType).focus();
						    	});
						    	
				    		}
						}
					});
		}
		
};
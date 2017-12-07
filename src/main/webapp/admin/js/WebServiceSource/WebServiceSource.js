 $.extend($.fn.validatebox.defaults.rules, {
	 ip:{// 验证IP地址  
         validator : function(value) {  
             return /\d+\.\d+\.\d+\.\d+/.test(value);  
         },  
         message : 'IP地址格式不正确'  
     }
 });  


var webServiceSource={
		serverUrl:'/webServiceSources/',		
		fmtOperate:function(val, row, index){
			return '<a href="javascript:void(0);" onclick="webServiceSource.openUpdate('+index+')">修改</a>'+
			'&nbsp;&nbsp;<a href="javascript:void(0);" onclick="webServiceSource.del(\''+val+'\')">删除</a>';
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
			var ip=$("#ip").val();			
			var status=$("#status").val();
			var deployType=$("#deployType").val();
			var outernet=$("#outernet").val();
			$('#site-datagrid').datagrid("reload",{ip:ip,status:status,deployType:deployType,outernet:outernet});	
		},
		openUpdate:function(index){
			var row =($('#site-datagrid').datagrid('getRows'))[index];
			$('#updateSite').form('load',row);
			$('#updateSite').dialog("open"); 
			
		},
		save:function(){
			$('#createSiteForm').form('submit',{
			    url:"/webServiceSources",
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
		statis:function(){
			var _url = this.serverUrl;
			alert(11);
			$.ajax({
				dataType:"json",
				url:"/admin/webServiceSource/statistics/111",
				success :function(data){
					alert(data.data);
			    	
				}
			});
						
				
		
		},
		reSearch:function(){
			$('#query_form').form("reset");
			webServiceSource.search();
		}	
};


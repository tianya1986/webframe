var serviceManageLogs={
		serverUrl:'/admin/serviceManageLogs/',		
		fmtOperate:function(val, row, index){
			return '<a href="javascript:void(0);" onclick="serviceManageLogs.del('+val+')">删除</a>';		
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
		search:function(){
			var description=$("#description").val();	
			$('#site-datagrid').datagrid("reload",{description:description});	
		},
		reSearch:function(){
			$('#query_form').form("reset");
			serviceManageLogs.search();
		}	
};

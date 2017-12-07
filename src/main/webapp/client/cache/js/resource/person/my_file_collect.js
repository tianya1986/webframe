var my_file_collect={
		serverUrl:'/client/operate/rscollect/',
		fmtOperate:function(val, row, index){
			return '&nbsp;&nbsp;<a href="javascript:void(0);" onclick="my_file_collect.del('+val+')">取消收藏</a>';
		},
		del:function(id){
			var _url = this.serverUrl;
			$.messager.confirm("提示","确认要取消收藏吗",function(b){
				if(b){
					$.ajax({
						dataType:"json",
						url:_url+'delete.do',
						data:{id:id},
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
};
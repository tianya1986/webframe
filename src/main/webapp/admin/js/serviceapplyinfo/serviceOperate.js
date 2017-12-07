var serviceOperate={
		serverUrl:'/serviceApplyInfo/',	
		fmtOperate:function(val, row, index){
			return '<a href="javascript:void(0);" onclick="serviceOperate.start(\''+val+'\')">启动</a>'+
			'&nbsp;&nbsp;<a href="javascript:void(0);" onclick="serviceOperate.stop(\''+val+'\')">停止</a>'+			
			'&nbsp;&nbsp;<a href="javascript:void(0);" onclick="serviceOperate.restart(\''+val+'\')">重启</a><br>'+
			'&nbsp;&nbsp;<a href="javascript:void(0);" onclick="serviceOperate.startOne(\''+val+'\')">启动当前</a>'+
			'&nbsp;&nbsp;<a href="javascript:void(0);" onclick="serviceOperate.stopOne(\''+val+'\')">停止当前</a>'+
			'&nbsp;&nbsp;<a href="javascript:void(0);" onclick="serviceOperate.restartOne(\''+val+'\')">重启当前</a>';
			
		
		},
		
		search:function(){
			var gradeName=$("#gradeName").val();			
			var sysCode = $("#sysCode").combobox("getValue");
			$('#site-datagrid').datagrid("reload",{gradeName:gradeName,sysCode:sysCode});	
		},
		start:function(id){
			var _url = this.serverUrl;
			$.messager.confirm("提示","启动",function(b){
				if(b){
					MaskUtil.mask('start...');
					$.ajax({
						dataType:"json",
						url:_url+"/"+id+'/actions/start',
						data:{id:id},
						success :function(data){
							MaskUtil.unmask();
							$('#site-datagrid').datagrid("reload");
							MsgUtil.alert(data.msg);
					    	/*$.messager.show({
					    		msg:data.msg,
					    		timeout:2000
					    	});*/
						}
					});
				}
			});
		
			
		},
		
		stop:function(id){

			var _url = this.serverUrl;
			$.messager.confirm("提示","停止",function(b){
				if(b){
					MaskUtil.mask('stop...');
					$.ajax({
						dataType:"json",
						url:_url+"/"+id+'/actions/stop',
						data:{id:id},
						success :function(data){
							MaskUtil.unmask();
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
		restart:function(id){
			var _url = this.serverUrl;
			$.messager.confirm("提示","重启",function(b){
				if(b){
					MaskUtil.mask('restart...');
					$.ajax({
						dataType:"json",
						url:_url+"/"+id+'/actions/reStart',
						data:{id:id},
						success :function(data){
							MaskUtil.unmask();
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
		startOne:function(id){
			var _url = this.serverUrl;
			$.messager.confirm("提示","启动当前实例",function(b){
				if(b){
					MaskUtil.mask('start...');
					$.ajax({
						dataType:"json",
						url:_url+"/"+id+'/actions/startOne',
						data:{id:id},
						success :function(data){
							MaskUtil.unmask();
							$('#site-datagrid').datagrid("reload");
							MsgUtil.alert(data.msg);
					    	/*$.messager.show({
					    		msg:data.msg,
					    		timeout:2000
					    	});*/
						}
					});
				}
			});
		
			
		},
		
		stopOne:function(id){

			var _url = this.serverUrl;
			$.messager.confirm("提示","停止当前实例",function(b){
				if(b){
					MaskUtil.mask('stop...');
					$.ajax({
						dataType:"json",
						url:_url+"/"+id+'/actions/stopOne',
						data:{id:id},
						success :function(data){
							MaskUtil.unmask();
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
		restartOne:function(id){
			var _url = this.serverUrl;
			$.messager.confirm("提示","重启当前实例",function(b){
				if(b){
					MaskUtil.mask('restart...');
					$.ajax({
						dataType:"json",
						url:_url+"/"+id+'/actions/reStartOne',
						data:{id:id},
						success :function(data){
							MaskUtil.unmask();
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
		deploy:function(id){
			var _url = this.serverUrl;
			$.messager.confirm("提示","发布",function(b){
				if(b){
					MaskUtil.mask('deploy...');
					$.ajax({
						dataType:"json",
						url:_url+"/"+id+'/actions/deploy',
						data:{id:id},
						success :function(data){
							MaskUtil.unmask();
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
		remove:function(id){
			var _url = this.serverUrl;
			$.messager.confirm("提示","删除发布",function(b){
				
				if(b){
					MaskUtil.mask('删除发布中...');
					$.ajax({
						dataType:"json",
						url:_url+"/"+id+'/actions/remove',
						data:{id:id},
						success :function(data){
							MaskUtil.unmask();
							$('#site-datagrid').datagrid("reload");
							MsgUtil.alert(data.msg);
					    	/*$.messager.show({
					    		msg:data.msg,
					    		timeout:2000
					    	});*/
						}
					});
				}
			});
		},
		info:function(id){
			alert(id);
			
		},
		
		reSearch:function(){
			$('#query_form').form("reset");
		}	
};
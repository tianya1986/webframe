var deployEvent={
		serverUrl:'/admin/deployEvent/',		
		fmtOperate:function(val, row, index){
			return '<a href="javascript:void(0);" onclick="serviceApplyInfo.openUpdate('+index+')">修改</a>'+
			'&nbsp;&nbsp;<a href="javascript:void(0);" onclick="serviceApplyInfo.del('+val+')">删除</a>';
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
		//search:function(){
		//	var gradeName=$("#gradeName").val();
		//	var sysCode = $("#sysCode").combobox("getValue");
		//	$('#salt-site-datagrid').datagrid("reload",{gradeName:gradeName,sysCode:sysCode});
		//},
		openUpdate:function(index){
			var row =($('#salt-site-datagrid').datagrid('getRows'))[index];
			$('#updateSite').form('load',row);
			$('#updateSite').dialog("open"); 
			
		},
		save:function(){
			$('#createSiteForm').form('submit',{
			    url:this.serverUrl,
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
				    	$('#salt-site-datagrid').datagrid("reload");
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
			alert(id);
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
				    	$('#salt-site-datagrid').datagrid("reload");
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
							$('#salt-site-datagrid').datagrid("reload");
					    	$.messager.show({
					    		msg:data.msg,
					    		timeout:2000
					    	});
						}
					});
				}
			});
		},
		//reSearch:function() {
		//	$('#salt_query_form').form("reset");
		//},
		search:function(){
			$('#salt-site-datagrid').datagrid('loadData', { total: 0, rows: [] });//清空下方DateGrid
			var uuid=$("#uuid").val();
			var host=$("#host").val();
			var remark=$("#remark").val();
			var status=$("#status").val();
			var starttime=$("#starttime").val();
			var endtime=$("#endtime").val();
			var ip=$("#ip").val();
			var currentstart=$("#currentstart").val();
			var currentend=$("#currentend").val();
			var port=$("#port").val();
			var relation="";
			var tgt="";
			try{
			 tgt=$("#tgt").val();
			 relation=$("#relation").val();
			}catch(e){}

			$('#salt-site-datagrid').datagrid("reload",{uuid:uuid,host:host,remark:remark,status:status,port:port,
				starttime:starttime,endtime:endtime,ip:ip,currentstart:currentstart,currentend:currentend,relation:relation,tgt:tgt});
		},
		reSearch:function() {
			$('#salt_query_form').form("reset");
			deployEvent.search();
		},
		newSearch:function(){
			var uuid=$("#uuid").val();
			var host=$("#host").val();
			var remark=$("#remark").val();
			var status=$("#status").val();
			var starttime=$("#starttime").val();
			var endtime=$("#endtime").val();
			var ip=$("#ip").val();
			var currentstart=$("#currentstart").val();
			var currentend=$("#currentend").val();
			var port=$("#port").val();

			$('#salt-site-datagrid').datagrid("reload",{uuid:uuid,host:host,remark:remark,status:status,port:port,
				starttime:starttime,endtime:endtime,ip:ip,currentstart:currentstart,currentend:currentend});
		},
		reNewSearch:function() {
			$('#salt_query_form').form("reset");
			deployEvent.search();
		}
};


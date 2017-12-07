var stuOrg={
		selectId: 0,
		superId: 0,
		superCode: 0,
		orgLevel: 0,
		serverUrl:'/admin/stuOrg/',		
		fmtOperate:function(val, row, index){
			return '<a href="javascript:void(0);" onclick="stuOrg.openUpdate('+index+')">修改</a>'+
			'&nbsp;&nbsp;<a href="javascript:void(0);" onclick="stuOrg.del('+val+')">删除</a>';
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
			var orgName=$("#orgNameSearch").val();			
			$('#site-datagrid').datagrid("reload",{superId:stuOrg.superId,orgName:orgName});	
		},
		openUpdate:function(index){
			var row =($('#site-datagrid').datagrid('getRows'))[index];
			stuOrg.selectId = row.id;
			$('#updateSite').form('load',row);
			$('#updateSite').dialog("open"); 
			
		},
		save:function(){
			$("#superIdAdd").val(stuOrg.superId);
			$("#superCodeAdd").val(stuOrg.superCode);
			$("#orgLevelAdd").val(Number(stuOrg.orgLevel) + 1);
			$("#modifyUserAdd").val(window.parent.stuUser.id);
			$('#createSiteForm').form('submit',{
			    url:'/admin/stuOrg',
			    onSubmit:function(param){
			       return $(this).form('validate');
			    },
			    success:function(data){
			    	data = $.parseJSON(data);
			    	if(data.success){
			    		$('#createSite').dialog("close");
				    	$.messager.show({
				    		msg:data.msg,
				    		timeout:2000
				    	});				    	
				    	$('#site-datagrid').datagrid("reload");
				    	$('#orgTree').tree("reload");
		    		}	
			    	else {
				    	alert(data.msg);					    		
			    	}
			    }
			});
		},
		update:function(){
			$("#modifyUserUpdate").val(window.parent.stuUser.id);
			$("#idUpdate").val(stuOrg.selectId);
			$('#updateSiteForm').form('submit',{
			    url: '/admin/stuOrg/'+stuOrg.selectId,
			    onSubmit:function(param){
			       return $(this).form('validate');
			    },
			    success:function(data){
			    	data = $.parseJSON(data);
			    	if(data.success)
		    		{			    	
				    	$('#updateSite').dialog("close");   
				    	$.messager.show({
				    		msg:data.msg,
				    		timeout:2000
				    	});
				    	$('#site-datagrid').datagrid("reload");
				    	$('#orgTree').tree("reload");
		    		}
			    	else
		    		{
		    			alert(data.msg);
		    		}
			    }
			});
			
//			var orgName = $("#orgNameUpdate").val();
//			var orgCode = $("#orgCodeUpdate").val();
//			var orderNo = $("#orderNoUpdate").val();
//			if(orderNo <=0){
//				alert('排序必须大于0！');
//				return;
//			}
//			var param = {
////					id: stuOrg.selectId,
//					orgName: orgName,
//					orgCode: orgCode,
//					orderNo: orderNo,
////					superId: stuOrg.superId,
////					superCode: stuOrg.superCode,
////					orgLevel: Number(stuOrg.orgLevel) + 1,
//					modifyUser: window.parent.stuUser.id
//			};
//			param = JSON.stringify(param);
//			$.ajax({
//				   url: '/admin/stuOrg/' + stuOrg.selectId,
//				   type: 'PUT',
//				   data: param,
//				   contentType: "application/json",
//				   async:false,
//				   success: function(response) {
//					   response = $.parseJSON(response);
//						if(response.success){
//							$('#updateSite').dialog("close");
//					    	$.messager.show({
//					    		msg:response.msg,
//					    		timeout:2000
//					    	});				    	
//					    	$('#site-datagrid').datagrid("reload");
//					    	$('#orgTree').tree("reload");
//						} else{
//							alert(response.msg);
//						}
//				   }
//				});
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
							$('#orgTree').tree("reload");
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
		}	
};

$(function(){
	$('#orgTree').tree({
		url: '/admin/stuOrg/tree',
		method: 'get',
		onClick:function(node){
			stuOrg.superId = node.id;
			stuOrg.superCode = node.attributes.code+node.id+",";
			stuOrg.orgLevel = node.attributes.level;
			$('#site-datagrid').datagrid("reload",{superId:stuOrg.superId});
			$("#orgNameSearch").val("");
        }
	});
	$('#site-datagrid').datagrid({
		page:10,
		rows:1,
		rownumbers:true,
		singleSelect:true,
		fitColumns:true,
		url:'/admin/stuOrg/getList',
		pagination:true,
		method:'get',
		toolbar:'#siteTb',
		queryParams: {superId:stuOrg.superId},
		onClickRow : function(index, data) {
			
		}
	});
});


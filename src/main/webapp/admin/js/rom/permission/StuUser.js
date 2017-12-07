var userInfo={
		selectId: 0,
		serverUrl:'/admin/stuUser/',		
		fmtOperate:function(val, row, index){
			return '<a href="javascript:void(0);" onclick="userInfo.openUpdate('+index+')">修改</a>'+
			'&nbsp;&nbsp;<a href="javascript:void(0);" onclick="userInfo.del('+val+')">删除</a>';
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
			var  userName = $("#sel_user_name").val();
			var loginName = $("#sel_login_name").val();
			$('#site-datagrid_pad').datagrid('loadData', { total: 0, rows: [] });
			$('#site-datagrid').datagrid("reload", {
				userName : userName,
				loginName : loginName
			});
		},
		openUpdate:function(index){
			var row =($('#site-datagrid').datagrid('getRows'))[index];
			userInfo.selectId = row.id;
			$('#updateSite').form('load',row);
			$('#orgUpdate').combotree('setValue',row.orgId);
			$('#updateSite').dialog("open"); 
			
		},
		save:function(){
			$("#modifyUserAdd").val(window.parent.stuUser.id);
			$('#createSiteForm').form('submit',{
			    url:'/admin/stuUser',
			    onSubmit:function(param){
			       return $(this).form('validate');
			    },
			    success:function(data){
			    	data=JSON.StrToJSON(data);
			    	if(data.success){
			    		$('#createSite').dialog("close");
				    	$.messager.show({
				    		msg:data.msg,
				    		timeout:2000
				    	});				    	
				    	$('#site-datagrid').datagrid("reload");
		    		}	
			    	else {
				    	alert(data.msg);					    		
			    	}
			    }
			});
		},
		update:function(){
			$("#modifyUserUpdate").val(window.parent.stuUser.id);
			$("#idUpdate").val(userInfo.selectId);
			$('#updateSiteForm').form('submit',{
			    url: '/admin/stuUser/'+userInfo.selectId,
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
		reSearch:function(){
			$('#query_form').form("reset");
		}	
};

function getUserType(){
	var userType = [{"value":"admin","text":"admin"},{"value":"school","text":"school"}];
	if(window.parent.stuUser.systemCode == "school"){
		userType = [{"value":"school","text":"school"}];
	}
	$("#systemCodeAdd").combobox("loadData",userType);
	$("#systemCodeUpdate").combobox("loadData",userType);
}

$(function() {
	getUserType();
	
	$('#site-datagrid').datagrid({
		page:10,
		rows:1,
		rownumbers:true,
		singleSelect:true,
		fitColumns:true,
		url:'/admin/stuUser/getList',
		toolbar:'#siteTb',
		pagination:true,
		method:'get',
		onClickRow : function(index, data) {
			var row = $('#site-datagrid').datagrid('getSelected');
			var select_ticke_id = row.id;
			$('#site-datagrid_pad').datagrid({   
			      url:  '/admin/stuUser?userId='+select_ticke_id   
			}) ;
		}
	});
	$('#orgAdd').combotree({
		url: '/admin/stuOrg/tree',
		method: 'get',
	    required: true,
	    onClick:function(node){
			$("#orgIdAdd").val(node.id);
			$("#superCodeAdd").val(node.attributes.code);
        }
	});
	$('#orgUpdate').combotree({
		url: '/admin/stuOrg/tree',
		method: 'get',
	    required: true,
	    onClick:function(node){
			$("#orgIdUpdate").val(node.id);
			$("#superCodeUpdate").val(node.attributes.code);
        }
	});
});


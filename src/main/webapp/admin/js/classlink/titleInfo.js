var titleInfo={
		serverUrl:'/admin/title/titleinfo/',
		fmtOperate:function(val, row, index){
			return '<a href="javascript:void(0);" onclick="titleInfo.openUpdate('+index+')">修改</a>'+
			'&nbsp;&nbsp;<a href="javascript:void(0);" onclick="titleInfo.del('+val+')">删除</a>';
		},
		openCreate:function(){
			 $('#createSiteForm')[0].reset();
			 $('#table_option tbody').empty();
			 $("#div_create_judge").hide();
		    	$("#table_option").show();
			 $('#createSite').dialog("open");   
		},
		checkRepeat:function(form){
			var content = $('#'+form+' textarea[name="content"]').val();
			$.ajax({
				dataType:"json",
				url:'/admin/title/titleinfo/checkRepeat.do',
				data:{content:content},
				success :function(data){
					var msg = data.msg;
					alert(msg);
				}
			});
		},
		search:function(){
			var content=$("#sel_content").val();
			var titleTypes=$('#sel_titleTypes').combotree('getValues');
			var titleType=$("#sel_titleType").val();
			var difficultyLevel=$("#sel_difficultyLevel").val();
			$('#site-datagrid').datagrid("reload",{titleType:titleType,difficultyLevel:difficultyLevel,content:content,titleTypes:titleTypes.join(',')});	
		},
		save:function(){
			var isanswer=new Array();
			$('#createSiteForm input[name="isanswer"]').each(function (index, domEle) {
				if(domEle.checked){
					isanswer.push(index);
				}
			});
			var radio = $('#createSiteForm input[name="titleType"]:checked').val();
			$('#createSiteForm').form('submit',{
			    url:this.serverUrl+'insert.do',
			    onSubmit:function(param){
			    	var isSumbit = $(this).form('validate');
			    	if(isSumbit){
				    	switch (parseInt(radio)) {
						case 1:
							if(isanswer.length!=1){
								alert("单选题有且只有一个答案");
								return false;
							}
							break;
						case 2:
							if(isanswer.length<2){
								alert("多选题答案数大于等于2");
								return false;
							}
							break;
						case 3:
							if(isanswer.length>0){
								alert("判断题没有选项");
								return false;
							}
							var radio_val = $("#createSiteForm input[name='titleResult']:checked").val();
							if(radio_val==null){
								alert("请选择判断题答案");
								return false;
							}
							break;
						case 4:
							if(isanswer.length<1){
								alert("不定选题目答案数大于0");
								return false;
							}
							break;
						}
			    	}
			    	param.isanswer1 = isanswer;
			        return isSumbit;
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
			$('#updateSite').form('load',row);
			$('#table_option_update tbody').empty();
			if(row.titleType!=3){
				$.ajax({
		            type: "post",
	                url: '/admin/title/titleoption/getList.do?titleId='+row.id,
	                cache:false,
	                dataType: "json",
	                success: function (data) {
	                	var array = data.rows;
	                	for(var i =0 ;i<array.length;i++){
	            			var newnode = document.getElementById('table_option_copy').lastChild.cloneNode(true);
	            			var x = $(newnode).eq(0);
	            			x.find("textarea").val(array[i].content);
	            			if(array[i].isanswer==1){
	                			x.find(":checkbox").attr('checked',true);
	                		}
	            			x.find("[name='optionId']").val(array[i].id);
	            			$('#table_option_update').append(newnode);
	                	}
	                },
	                error: function (XMLHttpRequest, textStatus, errorThrown) {
	                        alert(errorThrown);
	                }});
			}
			$('#titleTypes').combotree('setValue', row.typeId); 
			 if(row.titleType==3){
					$("#updateSite input[name='titleResult1']").attr("checked",false);
	             	$("#titleResult"+(row.titleResult+2)).prop("checked",true); 
	             	$("#titleResult"+(row.titleResult+2)).attr("checked",true); 
			    	$("#div_update_judge").show();
			    	$("#table_option_update").hide();
			 }else{
			    	$("#div_update_judge").hide();
			    	$("#table_option_update").show();
			 }
			$('#updateSite').dialog("open"); 
			
		},
		update:function(){
			var titleResult = $('#updateSiteForm input[name="titleResult1"]:checked').val();
			var isanswer=new Array();
			$('#updateSiteForm input[name="isanswer"]').each(function (index, domEle) {
				if(domEle.checked){
					isanswer.push(index);
				}
				
			});
			var radio = $('#updateSiteForm input[name="titleType"]:checked').val();
			$('#updateSiteForm').form('submit',{
			    url:this.serverUrl+'update.do',
			    onSubmit:function(param){
			    	var issubmit = $(this).form('validate');
			    	if(issubmit){
				    	switch (parseInt(radio)) {
						case 1:
							if(isanswer.length!=1){
								alert("单选题有且只有一个答案");
								return false;
							}
							break;
						case 2:
							if(isanswer.length<2){
								alert("多选题答案数大于等于2");
								return false;
							}
							break;
						case 3:
							if(isanswer.length>0){
								alert("判断题没有选项");
								return false;
							}
					    	param.titleResult = titleResult;
							break;
						case 4:
							if(isanswer.length<1){
								alert("不定选题目答案数大于0");
								return false;
							}
							break;
						}
			    	}
			    	param.isanswer1 = isanswer;
			        return issubmit;
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
		append:function(element) {
			var newnode = document.getElementById('table_option_copy').lastChild.cloneNode(true);
			$('#'+element).append(newnode);
		},
		delrow:function(row) {
			row.parentNode.parentNode.deleteRow(row.rowIndex);
		},
		setanswer:function(row) {
			var check = $('input[name="titleType"]:checked').val();
			alert(check);
			if(check.length=0){
				alert("请选择题目类型");
				return;
			}else {
				var index = row.parentNode.parentNode.rowIndex;
				var answer = $('#isanswer').val();
				if(check == 1){
					if(index==answer && answer.length>0){
						$(row).html("<span class='l-btn-left'><span class='l-btn-text l-btn-focus'>设为答案</span></span>");
						$('#isanswer').val("");
					}else{
						$(row).html("<span class='l-btn-left'><span class='l-btn-text l-btn-focus'>取消答案</span></span>");
						$('#isanswer').val(","+index);
					}
				}else{
					if(answer.indexOf(","+index) && answer.length>0){
						alert("删除");
						$(row).html("<span class='l-btn-left'><span class='l-btn-text l-btn-focus'>设为答案</span></span>");
						$('#isanswer').val(answer.replace(","+index,""));
					}else{
						alert("添加");
						$(row).html("<span class='l-btn-left'><span class='l-btn-text l-btn-focus'>取消答案</span></span>");
//						alert(answer+","+index);
						$('#isanswer').val(answer+","+index);
					}
				}
//				
			}
//			
		},
		reSearch:function(){
			$('#query_form').form("reset");
		}
};
$(function() {
	  var letterArray = new Array("A", "B", "C","D", "E", "F","G","H"); 
		 $('#site-datagrid').datagrid(
				{
					view : detailview,
					detailFormatter : function(rowIndex, rowData) {
						return '<div class="ddv" style="padding:5px 0;font-size:12px"></div>';
					},
					 onExpandRow: function(index,row){
						 var ddv = $(this).datagrid('getRowDetail',index).find('div.ddv');
						 $.ajax({
					            type: "post",
                                url: '/admin/title/titleoption/getList.do?titleId='+row.id,
                                dataType: "json",
                                success: function (data) {
                                	var array = data.rows;
                                	var titleType = "";
                                	switch (row.titleType){
										case 1:
											titleType = "单选题";
											break;
										case 2:
											titleType = "多选题";
											break;
										case 3:
											titleType = "判断题";
											break;
										case 4:
											titleType = "不定项题";
											break;
                                	}
                                	var option = "";
                                	if(row.titleType==3){
                                		option += "<br>答案："+(row.titleResult==1?"正确":"错误");
                                	}else{
	                                	for(var i =0 ;i<array.length;i++){
	                                		option += "<br>"+letterArray[i]+"、"+array[i].content;
	                                		if(array[i].isanswer==1){
	                                			option += "<font color='red'>(答案)</font>";
	                                		};
	                                	}
                                	}
                                	var difficultyLevel = "";
                                	switch (row.difficultyLevel){
	                                	case 1:
	                                		difficultyLevel = "易";
											break;
										case 2:
											difficultyLevel = "中";
											break;
										case 3:
											difficultyLevel = "难";
											break;
                                	}
//                                	alert(row.apperCount);
                                	var html = "<h2>"+(index+1)+" &nbsp;&nbsp;&nbsp;&nbsp;"+titleType+"</h2><p>"+row.content+"</p>"
                                			 + option + "<p>解析：&nbsp;&nbsp;&nbsp;&nbsp;"+row.analysis+"</p><p>知识点：&nbsp;&nbsp;&nbsp;&nbsp;"+row.typeName+"</p>" 
                                			 + "<p>难度：&nbsp;&nbsp;&nbsp;&nbsp;"+difficultyLevel+"</p><p>更新人：&nbsp;&nbsp;&nbsp;&nbsp;"+row.loginName+"</p><p>更新时间：&nbsp;&nbsp;&nbsp;&nbsp;"+new Date(row.modifyDate).toLocaleString()+"</p>"
                                			 + "<p>抽题次数：&nbsp;&nbsp;&nbsp;&nbsp;"+(row.apperCount!=null?row.apperCount:0)+"</p><p>错误次数：&nbsp;&nbsp;"+(row.faileCount!=null?row.faileCount:0)+"</p>";
                                	ddv.html(html);
                                	 $('#site-datagrid').datagrid('fixDetailRowHeight',index);
                                },
                                error: function (XMLHttpRequest, textStatus, errorThrown) {
                                        alert(errorThrown);
                                }
                        });
					 },
					 onLoadSuccess:function(data){
						 var dg = $('#site-datagrid');
						 var count = dg.datagrid('getRows').length;
						 for(var i=0; i<count; i++){
						   dg.datagrid('expandRow',i);
						 }
					 }
				});
//		 $('#site-datagrid').expandAll();
////		 .find("tr").each(function(index,element){
////			 alert(index);
//////			 var opts = $(this).datagrid('options');
////////			 var row = $(this).datagrid('getRows')[index];
//////				opts.onExpandRow.call(this, index, element);
////		 });
//		 alert("加载成功");
		 
	});

$("#updateSite input[name='titleType']").change(function() {
    var lineType = $("#updateSite input[name='titleType']:checked").val();           // 获取当前选中radio的值
    if(lineType==3){
    	$("#div_update_judge").show();
    	$("#table_option_update").hide();
    	$('#table_option_update tbody').empty();
    }else{
    	$("#div_update_judge").hide();
    	$("#table_option_update").show();
    }
});
$("#createSite input[name='titleType']").change(function() {
    var lineType = $("#createSite input[name='titleType']:checked").val();           // 获取当前选中radio的值
    if(lineType==3){
    	$("#div_create_judge").show();
    	$("#table_option").hide();
    	$('#table_option tbody').empty();
    }else{
    	$("#div_create_judge").hide();
    	$("#table_option").show();
    }
});
titleInfoTemp={
		openUploadTemp:function(){
			$('#uploadFileTempDiv').dialog("open"); 
		},
		closeUploadTemp:function(){
			$('#uploadFileTempDiv').dialog("close"); 
		},
		upload:function(){
			var file = $("#downloadFileTempForm").find("[name='file']").val();
			if(file==null || file==""){
				alert("请选择要导入的文件！");
				return false;
			}
			var index = file.lastIndexOf(".");
			if(index < 0) {
				alert("上传的文件格式不正确，请选择97-2003Excel文件(*.xls)！");
				return false;
			}
			var ext = file.substring(index + 1, file.length);
			if(!(ext == "xls" || ext == "XLS")) {
				alert("上传的文件格式不正确，请选择97-2003Excel文件(*.xls)！");
				return false;
			}
			$('#upload_buttion').linkbutton('disable');
			$("#downloadFileTempForm").attr("action",'/admin/title/titleinfo/upload.do');
			$("#downloadFileTempForm").submit();
		},cueMessage:function(isSucc,rowNum,msg){
			$('#upload_buttion').linkbutton('enable');
			$("#loading").hide();
			if(isSucc=="0"){
				titleInfo.search();
				alert("导入成功！");
				$('#uploadFileTempDiv').dialog("close"); 
			}else if(isSucc=="1"){
				if(rowNum>4){
					titleInfo.search();
				}
				alert("第"+(rowNum+1)+"行的错误信息："+msg);
				
			}else{
				alert(msg);
			}
			
		},download:function(){
			var _url = "/admin/title/titleinfo/download.do";
			window.location.href = _url;
		}
		
};
var mainTabs = null;
$(document).ready(function(){
	$(".nav li").removeClass("on").find("ol").hide();
	$(".nav li:first").addClass("on");
	$(".nav li:first").find("ol").show();
	
	$(".nav_menu div").click(function(){
		if(!($(this).parent().hasClass("on"))){
			$(".nav li").find("ol").hide().parent().removeClass("on");
			$(this).parent().addClass("on").find("ol").slideDown(500);
		}
	});

	$('#panelPwd').dialog({
		title:"修改密码", id:"panelPwd",width:390,height:180, 
		iconCls:'icon-save',closed:true,modal:true,collapsible:false,
        minimizable:false,maximizable:false,resizable:false,closable:true,
        draggable:false,href:'page/password.htm', buttons:[{
           text: '保存', iconCls: 'icon-ok',id:"btnUpdatePwd",
           handler: function() {
        		$.messager.alert('系统提示','密码修改成功','info',function(){$('#panelPwd').dialog('close');});
            }
          },{
              text: '取消', iconCls: 'icon-cancel',id:"btnCancel",
              handler: function() {
           			$('#panelPwd').dialog('close');
              }
         }]
	});
	 
	mainTabs = $("#tabs");
});

var main ={
	addTabPage:function(options,url){
		var tabsArr = mainTabs.tabs('tabs');
		if(tabsArr.length>9)
			mainTabs.tabs('close',tabsArr[1].panel('options').tab.text());
		if(typeof options =='string'){
			if(url=="#")
				return false;
			if (mainTabs.tabs('exists', options)){
				mainTabs.tabs('select', options);
			} else {
				mainTabs.tabs('add',{title:options,href:url,closable:true,id:'id_'+new Date().getTime()});
			}
		}else{
			options.id = options.id||'id_'+new Date().getTime();
			options.closable=true;
			if (mainTabs.tabs('exists', options.title))
				mainTabs.tabs('select', options.title);
			else 
				mainTabs.tabs('add',options);
		}
	},
	contextMenu:function(e, title,index){
		e.preventDefault();
		if(index==0)
			return false;
		$('#tabsNavMenu').attr('data',title);
		$('#tabsNavMenu').menu('show',{left:e.pageX+2, top: e.pageY+2});
	},
	menuNavClick:function(item){
		var data = $('#tabsNavMenu').attr("data");
		if(item.name=='closeThis'){
			mainTabs.tabs('close',data);
		}else if(item.name=='closeOther'){
			var tabsArr = mainTabs.tabs('tabs');
			var options = null;
			for(var i=1; i<tabsArr.length; i++){
				options = tabsArr[i].panel('options');
				if(options.title != data){
					mainTabs.tabs('close',options.title);
					i--;
				}
			}
		}else if(item.name=='closeAll'){
			var tabsArr = mainTabs.tabs('tabs');
			var options = null;
			while(tabsArr.length>1){
				options = tabsArr[1].panel('options');
				mainTabs.tabs('close',options.title);
			}
		}
	}
	,loginOut:function(){
		$.messager.confirm('系统提示', '您确定要退出系统吗？', function(r){
			if (r){
				window.location.href ='index.shtml';
			}
		});
	}
};

var common={
	datagridRow:function(index,row){
		var str="height:36px;";
		if(index%2==0)
	         str+='background-color:#eee;';  		
		return str;
   }  
}	
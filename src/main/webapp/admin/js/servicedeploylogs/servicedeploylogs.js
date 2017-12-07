var serviceDeployLogs = {
    serverUrl: '/servicesLogs/',
    fmtOperate: function (val, row, index) {
        return '<a href="javascript:void(0);" onclick="serviceDeployLogs.openUpdate(' + index + ')">详情</a>';
    },
    fmtOperateID: function (val, row, index) {
    	 return '<a href="javascript:void(0);" onclick="serviceDeployLogs.searchuuid(\'' + val + '\',\'' + row.ip+ '\')">'+val+'</a>';
    },
    del: function (id) {
        var _url = this.serverUrl;
        $.messager.confirm("提示", "确认要删除此信息吗", function (b) {
            if (b) {
                $.ajax({
                    dataType: "json",
                    url: _url + id,
                    type: 'DELETE',
                    success: function (data) {
                        $('#site-datagrid').datagrid("reload");
                        $.messager.show({
                            msg: data.msg,
                            timeout: 2000
                        });
                    }
                });
            }
        });
    },
    openUpdate: function (index) {
        var row = ($('#site-datagrid').datagrid('getRows'))[index];
        $('#updateSite').form('load', row);
        $('#updateSite').dialog("open");

    },
    search: function () {
        var appName = $("#appName").val();
        var ip = $("#ip").val();
        var actionType = $("#actionType").val();
        var description = $("#description").val();
        var params= $("#params").val();
        var userName = $("#userName").val();
        var startDate = $("#startDate").val();
        var endDate = $("#endDate").val();
        var status= $("#status").val();
        var logid=$("#logid").val();
     /*   var realStatus;
          if(status=="成功")
              realStatus= 1;
         else if(status=="失败")
              realStatus= 0;*/
        var timeConsumingLess = $("#timeConsumingLess").val();
        var timeConsumingGreater = $("#timeConsumingGreater").val();
        $('#site-datagrid').datagrid("reload", {appName:appName,ip:ip,actionType:actionType,description: description,params:params,userName:userName,startDate:startDate,endDate:endDate,status:status,timeConsumingLess:timeConsumingLess,timeConsumingGreater:timeConsumingGreater,logid:logid});
    },
    searchuuid: function (value,ip) {
    	var tgt="";
    	if(ip.indexOf("http:")!=-1){
    		tgt=ip.substring(ip.indexOf(":") + 3,ip.lastIndexOf(":"));
    	}
    	$('#query_form').form('clear');
    	try{
    		$("#tgt").val(tgt);
    		$("#uuid").val(value);
    	}catch(e){}
    	$("#logid").val(value);
        var logid=value;
        $('#site-datagrid').datagrid("reload", {logid:logid});
    },
    reSearch: function () {
        $('#query_form').form("reset");
        serviceDeployLogs.search();
    }


};

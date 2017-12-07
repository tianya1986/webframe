﻿$(function () {
    InitLeftMenu();
    $('body').layout();
	$('#tabs').tabs({  
		fit:true
	}); 
});

function InitLeftMenu() {
    $('.easyui-accordion li a').click(function () {
        var tabTitle = $(this).text();
        var url = $(this).attr("src");
        addTab(tabTitle, url);
        $('.easyui-accordion li div').removeClass("selected");
        $(this).parent().addClass("selected");
    }).hover(function () {
        $(this).parent().addClass("hover");
    }, function () {
        $(this).parent().removeClass("hover");
    });
}

function addTab(subtitle, url) {
    if (!$('#tabs').tabs('exists', subtitle)) {
        $('#tabs').tabs('add', {
            title: subtitle,
            content: createFrame(url),
            closable: true,
            width: $('#mainPanle').width() - 10,
            height: $('#mainPanle').height() - 26
        });
    } else {
        $('#tabs').tabs('select', subtitle);
    }
}

function createFrame(url) {
    var s = '<iframe name="mainFrame" frameborder="0"  src="' + url + '" style="width:100%;height:100%;overflow:auto;"></iframe>';
    return s;
}
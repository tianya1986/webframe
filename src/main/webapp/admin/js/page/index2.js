            function addTab(title, url) {
                if ($('#tabs').tabs('exists', title)) {
                    $('#tabs').tabs('select', title); //选中并刷新
                    var currTab = $('#tabs').tabs('getSelected');
                    var url = $(currTab.panel('options').content).attr('src');
                    if (url != undefined && currTab.panel('options').title != 'Home') {
                        $('#tabs').tabs('update', {
                            tab: currTab,
                            options: {
                                content: createFrame(url)
                            }
                        })
                    }
                } else {
//                 	url+="?teme="+new Date().getTime();
                	var content = createFrame(url);
                    $('#tabs').tabs('add', {
                        title: title,
                         content: content,
						//href:url,
                        closable: true
                    });
                }
                tabClose();
            }
            function createFrame(url) {
                var s = '<iframe scrolling="auto" frameborder="0"  src="' + url + '" style="width:100%;height:100%;"></iframe>';
                return s;
            }

            function tabClose() {
                /*双击关闭TAB选项卡*/
                $(".tabs-inner").dblclick(function() {
                    var subtitle = $(this).children(".tabs-closable").text();
                    $('#tabs').tabs('close', subtitle);
                })
                /*为选项卡绑定右键*/
                $(".tabs-inner").bind('contextmenu',
                function(e) {
                    $('#mm').menu('show', {
                        left: e.pageX,
                        top: e.pageY
                    });

                    var subtitle = $(this).children(".tabs-closable").text();

                    $('#mm').data("currtab", subtitle);
                    $('#tabs').tabs('select', subtitle);
                    return false;
                });
            }
            //绑定右键菜单事件
            function tabCloseEven() {
                //刷新
                $('#mm-tabupdate').click(function() {
                    var currTab = $('#tabs').tabs('getSelected');
                    var url = $(currTab.panel('options').content).attr('src');
                    if (url != undefined && currTab.panel('options').title != 'Home') {
                        $('#tabs').tabs('update', {
                            tab: currTab,
                            options: {
                                content: createFrame(url)
                            }
                        })
                    }
                })
                //关闭当前
                $('#mm-tabclose').click(function() {
                    var currtab_title = $('#mm').data("currtab");
                    $('#tabs').tabs('close', currtab_title);
                })
                //全部关闭
                $('#mm-tabcloseall').click(function() {
                    $('.tabs-inner span').each(function(i, n) {
                        var t = $(n).text();
                        if (t != 'Home') {
                            $('#tabs').tabs('close', t);
                        }
                    });
                });
                //关闭除当前之外的TAB
                $('#mm-tabcloseother').click(function() {
                    var prevall = $('.tabs-selected').prevAll();
                    var nextall = $('.tabs-selected').nextAll();
                    if (prevall.length > 0) {
                        prevall.each(function(i, n) {
                            var t = $('a:eq(0) span', $(n)).text();
                            if (t != 'Home') {
                                $('#tabs').tabs('close', t);
                            }
                        });
                    }
                    if (nextall.length > 0) {
                        nextall.each(function(i, n) {
                            var t = $('a:eq(0) span', $(n)).text();
                            if (t != 'Home') {
                                $('#tabs').tabs('close', t);
                            }
                        });
                    }
                    return false;
                });
                //关闭当前右侧的TAB
                $('#mm-tabcloseright').click(function() {
                    var nextall = $('.tabs-selected').nextAll();
                    if (nextall.length == 0) {
                        //msgShow('系统提示','后边没有啦~~','error');
                        alert('后边没有啦~~');
                        return false;
                    }
                    nextall.each(function(i, n) {
                        var t = $('a:eq(0) span', $(n)).text();
                        $('#tabs').tabs('close', t);
                    });
                    return false;
                });
                //关闭当前左侧的TAB
                $('#mm-tabcloseleft').click(function() {
                    var prevall = $('.tabs-selected').prevAll();
                    if (prevall.length == 0) {
                        alert('到头了，前边没有啦~~');
                        return false;
                    }
                    prevall.each(function(i, n) {
                        var t = $('a:eq(0) span', $(n)).text();
                        $('#tabs').tabs('close', t);
                    });
                    return false;
                });

                //退出
                $("#mm-exit").click(function() {
                    $('#mm').menu('hide');
                })
            }

            $(function() {
                tabCloseEven();

                $('.cs-navi-tab').click(function() {
                    var $this = $(this);
                    var href = $this.attr('src');
                    var title = $this.text();
                    addTab(title, href);
                });

                var themes = {
                    'gray': '/js/jquery/jquery-easyui-1.3.3/themes/gray/easyui.css',
                    'black': '/js/jquery/jquery-easyui-1.3.3/themes/black/easyui.css',
                    'blue': '/js/jquery/jquery-easyui-1.3.3/themes/default/easyui.css',
                    'bootstrap': '/js/jquery/jquery-easyui-1.3.3/themes/bootstrap/easyui.css',
                    'metro': '/js/jquery/jquery-easyui-1.3.3/themes/metro/easyui.css'
                };

                var skins = $('.li-skinitem span').click(function() {
                    var $this = $(this);
                    if ($this.hasClass('cs-skin-on')) return;
                    skins.removeClass('cs-skin-on');
                    $this.addClass('cs-skin-on');
                    var skin = $this.attr('rel');
                    $('#swicth-style').attr('href', themes[skin]);
                    setCookie('cs-skin', skin);
                    skin == 'dark-hive' ? $('.cs-north-logo').css('color', '#FFFFFF') : $('.cs-north-logo').css('color', '#000000');
                });

                if (getCookie('cs-skin')) {
                    var skin = getCookie('cs-skin');
                    $('#swicth-style').attr('href', themes[skin]);
                    $this = $('.li-skinitem span[rel=' + skin + ']');
                    $this.addClass('cs-skin-on');
                    skin == 'dark-hive' ? $('.cs-north-logo').css('color', '#FFFFFF') : $('.cs-north-logo').css('color', '#000000');
                }
            });
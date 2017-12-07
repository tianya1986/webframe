<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>文档查看页</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
  	<script type="text/javascript" src="/client/cache/js/common/jquery-1.9.1.min.js"></script>
  	<script type="text/javascript" src="/client/cache/js/resource/look_uploadfile_page.js"></script>
  	<link rel="stylesheet" type="text/css" href="/client/cache/css/common/flexpaper.css" />
		<script type="text/javascript" src="/client/cache/js/common/flexpaper.js"></script>
		<script type="text/javascript" src="/client/cache/js/common/flexpaper_handlers.js"></script>
  	</head>
  <body style="width:1200px;font: 12px/20px '微软雅黑', '宋体', Arial, sans-serif, Verdana, Tahoma;">
    <div style="width:900px;height:900px;float:left;">
	    <div style="text-align:center;height: 80px">
			<div>
			<img src="/client/images/icons/${uploadFile.fileFormat}.png">
			${uploadFile.fileName}
			</div>
			<div>
			查看数:${uploadFile.updFileOpt.viewNum}
			<input type="button" value="收藏" onclick="uploadfile.collection('${uploadFile.id}');"/>
			收藏数:${uploadFile.updFileOpt.collectNum}
			<input type="button" value="分享" onclick="alert('调用相关接口');"/>
			分享数:${uploadFile.updFileOpt.shareNum}
			<input type="button" value="下载" onclick="uploadfile.download('${uploadFile.id}');"/>
		
			评分:${avgScore}
			<input type="hidden" id="fileId" value="${uploadFile.id}"/>
			<br/>简介${uploadFile.description}
			</div>
			<div style="float:right;padding-right: 20px">
			价格：<font color="red"><span id ="money">${uploadFile.paidAmount}</span></font>
			</div>
		</div>
		</br>
		</br>
		</br>
		<div id="documentViewer" class="flexpaper_viewer" ></div>
		<th id="comment_title">用户 评论:${uploadFile.updFileOpt.commentNum}</th>
		<div id="comment_list">
		
		</div>
		<div>
		 
		 	<table>
		 	  <tr>
		 	  	<td>星级评分</td>
		 	  	<td>
			 		<input type="radio" name="score" value="1"></input>
			 		<input type="radio" name="score" value="2"></input>
			 		<input type="radio" name="score" value="3"></input>
			 		<input type="radio" name="score" value="4"></input>
			 		<input type="radio" name="score" value="5" checked></input>
		 		</td>
		 	</tr>
		 	<tr>
		 		
		 	    <td colspan="2">
		 	      <textarea rows="5" cols="100" name="comment" id="comment" maxLength="200" class="easyui-validatebox"></textarea>
		 	    </td>
		 	</tr>
		 	<tr>
		 		<td colspan="2">
		 		 <a href="javascript:void(0)" class="easyui-linkbutton" onclick="uploadfile.save('${uploadFile.id}');">发表评论</a>  
		 		</td>
		 	</tr>
		 		
		 	</table>

		</div>
    </div>
    	
	<div>
		<div style="width:300px;min-height:100px;float:left;">
			<div>
			文档贡献者:${fileUser.nickname} 
			</div>
			<div>
			<input type="button" value="关注" onclick="uploadfile.attention('${fileUser.id}');"/>
			</div>
		</div>
		<div style="width:300px;min-height:100px;float:left;">
			<div>
			${uploadFile.updFileOpt.downloadNum}人下载了该文档
			</div>
			<div>
				<ul id="download_userlist"></ul>
			
			</div>
		</div>
		<div style="width:300px;min-height:100px;float:left;">
			<div>
			相关文档
			</div>
			<div>
			
			</div>
		</div>
		<div style="width:300px;min-height:100px;float:left;">
			<th>下载了此文档的人还下载了</th>
			<div id="download_ref">
			
			</div>
			
			<div>
			
			</div>
		</div>
	</div>
	<script type="text/javascript">   
		        var startDocument = "Paper";
	        	/* var url = '{/client/flexpaper/courseware/getById.do?page=[*,0],8}'; */
	        	/* var url = '{/client/cache/swf/xx[*,0].swf,8}'; */
						$('#documentViewer').FlexPaperViewer(
						 { config : {
						/* {../samples/2.pdf_[*,0].swf,16}	
									,IMGFiles : 'samples/Classic_Sample.pdf_{page}.png',
                        			JSONFile : 'samples/Classic_Sample.pdf_{page}.js',
                        			PDFFile : 'samples/Classic_Sample_[*,2,true].pdf',
                        			ThumbIMGFiles : 'samples/Classic_Sample.pdf_{page}_thumb.png'  */
						/* SWFFile : '/client/flexpaper/courseware/getById.do?page=2', */
						/*  SWFFile : '{/client/cache/swf/xx[*,0].swf,8}',  */
						 SWFFile : '{/client/flexpaper/courseware/getById.do?id=${uploadFile.id}&page=[*,0],${uploadFile.total}}',
						/*  SWFFile : url, */
						 key : '$659bda0e09811de23c6',
						 Scale : 1, 
						 ZoomTransition : 'easeOut',
						 ZoomTime : 0.5, 
						 ZoomInterval : 0.2,
						 FitPageOnLoad : false,
						 FitWidthOnLoad : false, 
						 FullScreenAsMaxWindow : false,
						 ProgressiveLoading : false,
						 MinZoomSize : 0.2,
						 MaxZoomSize : 5,
						 SearchMatchAll : false,
						 InitViewMode : 'Portrait',
						 RenderingOrder : 'flash,html5',
						 MixedMode : true,
						 ViewModeToolsVisible : true,
						 ZoomToolsVisible : true,
						 NavToolsVisible : true,
						 CursorToolsVisible : true,
						 SearchToolsVisible : true,
						 localeChain: 'zh_CN'
						 
						 }});
	        </script>  
    </body>
</html>

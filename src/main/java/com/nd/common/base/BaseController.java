package com.nd.common.base;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.atvadmin.manage.dto.User;
import com.nd.common.ErrorMsg;


public class BaseController {
	
	protected static final String SYS_USER_SESSION_KEY = "sysStuUser"; //系统用户 Session key
	
	protected static final String USER_SESSION_KEY = "stuUser"; //用户Session key
	
	protected final static String SESSID_KEY = "s85612602367782310589";  //passport登录成功后返回的Session key

	public static HttpSession getSession() { 
		HttpSession session = null; 
		try { 
		    session = getRequest().getSession(); 
		} catch (Exception e) {} 
		    return session; 
		} 

	public static HttpServletRequest getRequest() { 
		ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder
		.getRequestAttributes(); 
		return attrs.getRequest(); 
	}
	
	/**
	 * 前端-获取session中用户
	 * @return
	 */
	public  User getSessionUser(){
		//session中的 用户信息
		User stuUserInfo=(User) getSession().getAttribute(USER_SESSION_KEY);
		return stuUserInfo;
	}
	
	/**
	 * 前端-获取用户id
	 * @return
	 */
	public  long getSessionUserId(){
		//session中的 用户信息
		User stuUser=this.getSessionUser();
		if(stuUser!=null){
			return stuUser.getId();
		}else{
			return 0;
		}
			
	}

	
	public static <T> void setSession(String key, T sessionValue) {
		getSession().setAttribute(key, sessionValue);
	}
	
	public static Object getSessionValue(String key) {
		return getSession().getAttribute(key);
	}
	
	public String getIpAddr( ) {  
	    String ip = getRequest().getHeader("x-forwarded-for");  
	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = getRequest().getHeader("Proxy-Client-IP");  
	    }  
	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = getRequest().getHeader("WL-Proxy-Client-IP");  
	    }  
	    if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	        ip = getRequest().getRemoteAddr();  
	    }  
	    return ip;  
	}  
	
	@ExceptionHandler(RuntimeException.class)  
	public @ResponseBody  
	Object runtimeExceptionHandler(RuntimeException runtimeException,HttpServletResponse response) {  
		ErrorMsg msg = new ErrorMsg();
		/*response.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
		msg.setCode(50301);
		msg.setServer_time(TimeUtils.getCurrentTime());
		msg.setMessage("查询获取列表信息失败!");
		msg.setHost_id(request.getRemoteHost());
		//String requestId = addLog("",msg.getMessage()+e.getMessage(),request);
		msg.setRequest_id(requestId);*/
		
		return msg;
	}  
}

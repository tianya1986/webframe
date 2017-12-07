package com.nd.common;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 * @company ND TM
 * @author huangjianxin
 * @date 2014-4-9
 */
public class BaseCtrl {
//	protected UserInfo userInfo;

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
	 * 获取用户会话
	 * @return
	 *//*
	public UserInfo getUserInfo() {
//		UserInfo user =  new UserInfo();
//		user.setId(9);
//		this.getSession().setAttribute("userInfo", user);
		Object userobj=this.getSession().getAttribute("userInfo");
		if(userobj!=null){
			userInfo=(UserInfo)userobj;
		}
		return userInfo;
	} */
	
}

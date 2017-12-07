package com.nd.common;

import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class ErrorMsg implements java.io.Serializable {
	
	protected static final long serialVersionUID = 1L;
	protected String request_id="";
	private String host_id;
	protected int code=500000;
	protected String message;
	protected Date server_time;


	public String getRequest_id() {
		return request_id;
	}

	public void setRequest_id(String request_id) {
		this.request_id = request_id;
	}


	public void setHost_id(String host_id) {
		this.host_id = host_id;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	@JSONField(format="yyyy-MM-dd'T'HH:mm:ssZ")
	public Date getServer_time() {
		return TimeUtils.getCurrentTime();
	}

	public void setServer_time(Date server_time) {
		this.server_time = server_time;
	}
	
	
	


	
}

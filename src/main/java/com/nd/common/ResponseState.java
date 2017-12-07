package com.nd.common;

public class ResponseState implements java.io.Serializable {
	
	protected static final long serialVersionUID = 1L;
	protected String id;
	protected int code;
	protected String message;
	protected String url;

	public ResponseState() {
	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	
}

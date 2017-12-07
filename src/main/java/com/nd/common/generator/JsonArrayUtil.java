package com.nd.common.generator;

import com.alibaba.fastjson.JSONObject;

import java.util.List;

/**
 * Created by Administrator on 2014/12/25.
 */
public class JsonArrayUtil extends  JSONObject{

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public JsonArrayUtil(List<?> list){
        put("items",list);
    }
}

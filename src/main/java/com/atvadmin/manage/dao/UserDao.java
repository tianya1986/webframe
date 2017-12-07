package com.atvadmin.manage.dao;

import org.springframework.stereotype.Repository;

import com.atvadmin.manage.dto.User;
import com.atvadmin.manage.dto.UserExample;
import com.nd.common.dao.SimpleMybatisSupport;
/**
 * 类描述:客户设备管理<br/>
 * 创建人:huangjx<br/>
 * 创建时间:2016-05-10 11:13:49<br/>
 * @version<br/>
 */
 
@Repository("user")
public class UserDao extends SimpleMybatisSupport<User, Integer, UserExample>{
	
	@Override
    public String getMybatisMapperNamesapce() {
        return "com.atvadmin.manage.dto.UserMapper";
    }


}
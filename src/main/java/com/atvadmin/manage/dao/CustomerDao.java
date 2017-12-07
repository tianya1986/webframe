package com.atvadmin.manage.dao;

import org.springframework.stereotype.Repository;

import com.atvadmin.manage.dto.Customer;
import com.atvadmin.manage.dto.CustomerExample;
import com.nd.common.dao.SimpleMybatisSupport;
/**
 * 类描述:客户设备管理<br/>
 * 创建人:huangjx<br/>
 * 创建时间:2016-05-13 17:09:33<br/>
 * @version<br/>
 */
 
@Repository("customer")
public class CustomerDao extends SimpleMybatisSupport<Customer, Integer, CustomerExample>{
	
	@Override
    public String getMybatisMapperNamesapce() {
        return "com.atvadmin.manage.dto.CustomerMapper";
    }


}
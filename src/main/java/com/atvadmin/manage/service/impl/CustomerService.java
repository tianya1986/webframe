package com.atvadmin.manage.service.impl;

import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.atvadmin.manage.dao.CustomerDao;
import com.atvadmin.manage.dto.Customer;
import com.atvadmin.manage.dto.CustomerExample;
import com.atvadmin.manage.dto.CustomerExample.Criteria;
import com.atvadmin.manage.service.ICustomerService;
import com.nd.common.util.ObjectUtils;
import com.nd.common.util.Page;
import com.nd.common.util.StringUtils;


/**
 * 类名称:CustomerService
 * 类描述:客户设备管理
 * 创建人:huangjx
 * 创建时间:2016-05-13 17:09:33
 * @version
 */
@Service
public class CustomerService implements ICustomerService {
	
	@Resource
	CustomerDao customerDao;
	
	@Override
	public boolean insert(Customer record) {
		boolean flag = false;		
		int i = customerDao.insert(record);
		if(i>0){
			flag = true;
		}
		return flag;
	}

	@Override
	public boolean delete(Integer id) {
		boolean flag = false;
		if(ObjectUtils.isNotEmpty(id)){
			if(customerDao.deleteByPrimaryKey(id)>0){
				flag = true;
			}
		}
		return flag;
	}

	@Override
	public List<Customer> getList(CustomerExample example) {
		return customerDao.selectByExample(example);
	}

	@Override
	public boolean update(Customer record) {
		boolean  flag = false;
		if(ObjectUtils.isNotEmpty(record.getId())){
			if(customerDao.updateByPrimaryKey(record)>0){
				flag = true;
			}
		}
		return flag;
	}
	@Override
	public boolean updateByPrimaryKeySelective(Customer record) {
		boolean  flag = false;
		if(ObjectUtils.isNotEmpty(record.getId())){
			if(customerDao.updateByPrimaryKeySelective(record)>0){
				flag = true;
			}
		}
		return flag;
	}
	@Override
	public Customer getById(Integer id) {
		return customerDao.selectByPrimaryKey(id);
	}

	@Override
	public int countByExample(CustomerExample example) {
		return customerDao.countByExample(example);
	}
	
	
	}

package com.atvadmin.manage.service.impl;

import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.atvadmin.manage.dao.UserDao;
import com.atvadmin.manage.dto.User;
import com.atvadmin.manage.dto.UserExample;
import com.atvadmin.manage.dto.UserExample.Criteria;
import com.atvadmin.manage.service.IUserService;
import com.nd.common.util.ObjectUtils;
import com.nd.common.util.Page;
import com.nd.common.util.StringUtils;


/**
 * 类名称:UserService
 * 类描述:客户设备管理
 * 创建人:huangjx
 * 创建时间:2016-05-10 11:13:49
 * @version
 */
@Service
public class UserService implements IUserService {
	
	@Resource
	UserDao userDao;
	
	@Override
	public boolean insert(User record) {
		boolean flag = false;		
		int i = userDao.insert(record);
		if(i>0){
			flag = true;
		}
		return flag;
	}

	@Override
	public boolean delete(Integer id) {
		boolean flag = false;
		if(ObjectUtils.isNotEmpty(id)){
			if(userDao.deleteByPrimaryKey(id)>0){
				flag = true;
			}
		}
		return flag;
	}

	@Override
	public List<User> getList(UserExample example) {
		return userDao.selectByExample(example);
	}

	@Override
	public boolean update(User record) {
		boolean  flag = false;
		if(ObjectUtils.isNotEmpty(record.getId())){
			if(userDao.updateByPrimaryKey(record)>0){
				flag = true;
			}
		}
		return flag;
	}
	@Override
	public boolean updateByPrimaryKeySelective(User record) {
		boolean  flag = false;
		if(ObjectUtils.isNotEmpty(record.getId())){
			if(userDao.updateByPrimaryKeySelective(record)>0){
				flag = true;
			}
		}
		return flag;
	}
	@Override
	public User getById(Integer id) {
		return userDao.selectByPrimaryKey(id);
	}

	@Override
	public int countByExample(UserExample example) {
		return userDao.countByExample(example);
	}
	
	
	}

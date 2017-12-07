package com.atvadmin.manage.service;

import java.util.List;
import com.atvadmin.manage.dto.User;
import com.atvadmin.manage.dto.UserExample;
import com.nd.common.util.Page;

/**
 * 类名称:IUserService<br/>
 * 类描述:客户设备管理<br/>
 * 创建人:huangjx<br/>
 * 创建时间:2016-05-10 11:13:49<br/>
 * @version
 */
public interface IUserService {
	
	/**
	 * 保存记录
	 * @param record
	 * @return
	 */
	public boolean insert(User record);
	/**
	 * 删除记录
	 * @param id
	 * @return
	 */
	public boolean delete(Integer id);
	/**
	 * 获取客户设备管理类型
	 * @param example
	 * @return
	 */
	public List<User> getList(UserExample example);
	/**
	 * 更新
	 * @param record
	 * @return
	 */
	public boolean update(User record);
	/**
	 * 更新
	 * @param record
	 * @return
	 */
	public boolean updateByPrimaryKeySelective(User record);
	/**
	 * 获取记录
	 * @param id
	 * @return
	 */
	public User getById(Integer id);
	/**
	 * 统计数量
	 * @param User record
	 * @return
	 */
	int countByExample(UserExample example);
	
	
}

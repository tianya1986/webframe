package com.atvadmin.manage.service;

import java.util.List;
import com.atvadmin.manage.dto.Customer;
import com.atvadmin.manage.dto.CustomerExample;
import com.nd.common.util.Page;

/**
 * 类名称:ICustomerService<br/>
 * 类描述:客户设备管理<br/>
 * 创建人:huangjx<br/>
 * 创建时间:2016-05-13 17:09:33<br/>
 * @version
 */
public interface ICustomerService {
	
	/**
	 * 保存记录
	 * @param record
	 * @return
	 */
	public boolean insert(Customer record);
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
	public List<Customer> getList(CustomerExample example);
	/**
	 * 更新
	 * @param record
	 * @return
	 */
	public boolean update(Customer record);
	/**
	 * 更新
	 * @param record
	 * @return
	 */
	public boolean updateByPrimaryKeySelective(Customer record);
	/**
	 * 获取记录
	 * @param id
	 * @return
	 */
	public Customer getById(Integer id);
	/**
	 * 统计数量
	 * @param Customer record
	 * @return
	 */
	int countByExample(CustomerExample example);
	
	
}

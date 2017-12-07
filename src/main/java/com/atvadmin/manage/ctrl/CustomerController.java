package com.atvadmin.manage.ctrl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.atvadmin.manage.dto.Customer;
import com.atvadmin.manage.dto.CustomerExample;
import com.atvadmin.manage.dto.CustomerExample.Criteria;
import com.atvadmin.manage.service.ICustomerService;
import com.nd.common.TimeUtils;
import com.nd.common.base.BaseController;
import com.nd.common.json.ResponseBean;
import com.nd.common.json.ResponseState;
import com.nd.common.util.ObjectUtils;
import com.nd.common.util.Page;

/**
 * 类描述:客户设备管理<br/>
 * 创建人:huangjx<br/>
 * 创建时间:2016-05-13 17:09:33<br/>
 * 
 * @version<br/>
 */
@Controller
@RequestMapping("/admin/customer")
public class CustomerController extends BaseController {
	private final static Logger logger = Logger
			.getLogger(CustomerController.class);

	@Resource
	ICustomerService customerService;// 客户设备管理

	/**
	 * 获取客户设备管理列表
	 * 
	 * @param record
	 * 
	 * 
	 * @param page
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "", method = RequestMethod.GET)
	public @ResponseBody Object getListPage(Customer record, Page page,
			HttpServletRequest request) {
		int total = 0;
		List<Customer> list = new ArrayList<Customer>();
		try {
			/* 查询条件 */

			CustomerExample example = new CustomerExample();
			Criteria criteria = example.createCriteria();
			if (record.getName()!=null&&!record.getName().equals("")) {

				criteria.andNameLike("%" + record.getName() + "%");
			}
			// 统计数量
			total = customerService.countByExample(example);
			if (total > 0) {
				list = customerService.getList(example);
			}
		} catch (Exception e) {
			logger.error("error", e);
		}
		return new ResponseBean<Customer>(total, list);
	}

	/**
	 * 插入记录
	 * 
	 * @param record
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "", method = RequestMethod.POST)
	public @ResponseBody Object insert(Customer record,
			HttpServletRequest request, String stime, String etime) {

		if (!stime.isEmpty() && !etime.isEmpty()) {

			record.setStarTime(TimeUtils.getTime(stime));
			record.setEndTime(TimeUtils.getTime(etime));
		}

		ResponseState state = new ResponseState(false, "");
		try {
			boolean isSuccess = customerService.insert(record);
			if (isSuccess) {// 成功
				state.setSuccess(true);
				state.setMsg("新增成功");
			} else {
				state.setMsg("新增失败");
			}
		} catch (Exception e) {
			state.setMsg("新增失败");
			e.printStackTrace();
			logger.error("error", e);
		}
		return state;
	}

	/**
	 * 删除记录
	 * 
	 * @param record
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public @ResponseBody Object delete(@PathVariable("id") Integer id,
			HttpServletRequest request) {
		ResponseState state = new ResponseState(false, "");
		try {
			if (ObjectUtils.isNotEmpty(id)) {
				boolean isSuccess = customerService.delete(id);
				if (isSuccess) {// 删除成功
					state.setSuccess(true);
					state.setMsg("删除成功");
				} else {
					state.setMsg("删除失败");
				}
			}
		} catch (Exception e) {
			state.setMsg("删除失败");
			e.printStackTrace();
			logger.error("error", e);
		}
		return state;
	}

	/**
	 * 更新
	 * 
	 * @param record
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public @ResponseBody Object update(Customer record,String stimeupdate,String etimeupdate,
			HttpServletRequest request) {
		ResponseState state = new ResponseState(false, "");
		try {
			
			CustomerExample example = new CustomerExample();
			Criteria criteria = example.createCriteria();
			if (record.getSn()!=null&&!record.getSn().equals("")) {

				criteria.andSnEqualTo(record.getSn());
				
				List<Customer> customerList=customerService.getList(example);
				if(customerList==null||customerList.size()==0){
					//返回SN错误
				}
				
				Customer customer=customerList.get(0);
				if(!customer.getIp().equals(record.getId()))
				{
					//ip错误
					
				}
				
				if(customer.getEndTime()<(TimeUtils.getCurrentTime().getTime()/1000))
				{
					//已过期
					
				}
				
				
			}
			
			boolean isSuccess = customerService.update(record);
			
			
			
			if (isSuccess) {// 修改成功
				state.setSuccess(true);
				state.setMsg("修改成功");
			} else {
				state.setMsg("修改失败");
			}
		} catch (Exception e) {
			state.setMsg("修改失败");
			logger.error("error", e);
		}
		return state;
	}
	
	@RequestMapping(value = "getclientcount", method = RequestMethod.POST)
	public @ResponseBody Object getclientcount(Customer record,String stimeupdate,String etimeupdate,
			HttpServletRequest request) {
		ResponseState state = new ResponseState(false, "");
		try {
			boolean isSuccess = customerService.update(record);
			if (isSuccess) {// 修改成功
				state.setSuccess(true);
				state.setMsg("修改成功");
			} else {
				state.setMsg("修改失败");
			}
		} catch (Exception e) {
			state.setMsg("修改失败");
			logger.error("error", e);
		}
		return state;
	}

}

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

import com.atvadmin.manage.dto.User;
import com.atvadmin.manage.dto.UserExample;
import com.atvadmin.manage.dto.UserExample.Criteria;
import com.atvadmin.manage.service.IUserService;
import com.nd.common.MD5;
import com.nd.common.base.BaseController;
import com.nd.common.json.ResponseBean;
import com.nd.common.json.ResponseState;
import com.nd.common.util.ObjectUtils;
import com.nd.common.util.Page;

/**
 * 类描述:教材子版本管理<br/>
 * 创建人:huangjx<br/>
 * 创建时间:2016-04-26 11:12:11<br/>
 * @version<br/>
 */
@Controller
@RequestMapping("/admin/user")
public class UserController extends BaseController{
	private final static Logger logger = Logger.getLogger(UserController.class);
	
	@Resource
    IUserService userService;//教材子版本管理
	/**
	 * 获取教材子版本管理列表
	 * @param record
	 
	 
	 * @param page
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "",method=RequestMethod.GET)
	public @ResponseBody
	Object getListPage(User record,Page page,HttpServletRequest request) {
		int total = 0;
		List<User> list = new ArrayList<User>();
		try{
			/*	查询条件    */
			UserExample example = new UserExample();
			
			//统计数量
			total = userService.countByExample(example);
			if(total>0){
				list = userService.getList(example);
			}
		}catch (Exception e) {
			logger.error("error", e);
		}
		return new ResponseBean<User>(total,list);
	}
	
	/**
	 * 插入记录
	 * @param record
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "",method=RequestMethod.POST)
	public @ResponseBody
	Object insert(User record,HttpServletRequest request) {
		ResponseState state = new ResponseState(false,"");
		try{			
			boolean isSuccess = userService.insert(record);
			if(isSuccess){//成功
				state.setSuccess(true);
				state.setMsg("新增成功");
			}else{
				state.setMsg("新增失败");
			}
		}catch (Exception e) {
		    state.setMsg("新增失败");
			e.printStackTrace();
			logger.error("error", e);
		}
		return state;
	}
	/**
	 * 删除记录
	 * @param record
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/{id}",method=RequestMethod.DELETE)
	public @ResponseBody
	Object delete(@PathVariable("id") Integer id,HttpServletRequest request) {
		ResponseState state = new ResponseState(false,"");
		try{
			if(ObjectUtils.isNotEmpty(id)){
				boolean isSuccess = userService.delete(id);
				if(isSuccess){//删除成功
					state.setSuccess(true);
					state.setMsg("删除成功");
				}else{
					state.setMsg("删除失败");
				}
			}	
		}catch (Exception e) {
	    	state.setMsg("删除失败");
			e.printStackTrace();
			logger.error("error", e);
		}
		return state;
	}
	/**
	 * 更新
	 * @param record
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/{id}",method=RequestMethod.PUT)
	public @ResponseBody
	Object update(User record,HttpServletRequest request) {
		ResponseState state = new ResponseState(false,"");
		try{			
			boolean isSuccess = userService.update(record);
			if(isSuccess){//修改成功
				state.setSuccess(true);
				state.setMsg("修改成功");
			}else{
				state.setMsg("修改失败");
			}
		}catch (Exception e) {
	    	state.setMsg("修改失败");
			logger.error("error", e);
		}
		return state;
	}
	
	
	  @RequestMapping(value = "/login", method = RequestMethod.POST)
	    public @ResponseBody Object login(User record, HttpServletRequest request) {
	        ResponseState state = new ResponseState(false, "");
	        
	        
	        UserExample example=new UserExample();
	       Criteria criteria= example.createCriteria();
	        
	       List<User> stuUserlist = userService.getList(example);
	        if (stuUserlist == null||stuUserlist.size()==0) {
	            state.setMsg("用户不存在!");
	            return state;
	        }
	        User stuUser=stuUserlist.get(0);
	        
	        MD5 md5 = MD5.getInstance();
	        if (!stuUser.getPassword().equals(md5.getMD5String(record.getPassword()))) {
	            state.setMsg("用户或密码不对!");
	            return state;
	        }
	        this.getSession().setAttribute("stuUser", stuUser);
	        return new ResponseState(true, "登录成功!");
	    }
	  
	
	
	

}

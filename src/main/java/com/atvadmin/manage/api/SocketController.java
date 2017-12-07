package com.atvadmin.manage.api;

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
import com.service.socketservice.impl.EchoStringServerHandler;

/**
 * 类描述:教材子版本管理<br/>
 * 创建人:huangjx<br/>
 * 创建时间:2016-04-26 11:12:11<br/>
 * @version<br/>
 */
@Controller
@RequestMapping("/socket")
public class SocketController extends BaseController {
    private final static Logger logger = Logger.getLogger(SocketController.class);

    @RequestMapping(value = "/send", method = RequestMethod.GET)
    public @ResponseBody Object send(Integer page, HttpServletRequest request) {
        ResponseState state = new ResponseState(false, "");

        String msg = "{page:" + page + "}";
        EchoStringServerHandler.sendMsgToClients(msg);
        return new ResponseState(true, "登录成功!");
    }

}

/**
 * 
 */
package com.service.socketservice;

import java.util.concurrent.ThreadPoolExecutor;

import com.service.socketservice.dto.ThreadPoolInfo;

/**
 * <p>
 * Title: Module Information
 * </p>
 * <p>
 * Description: Class Description
 * </p>
 * <p>
 * Copyright: Copyright (c) 2008
 * </p>
 * <p>
 * Company: YiRong Co., Ltd.
 * </p>
 * <p>
 * Create Time:2011-12-6
 * </p>
 * 
 * @author zhy
 * @version 1.0.0
 */
public interface IThreadPoolService {

    public ThreadPoolExecutor getThreadPool();

    public void execute(Runnable task);

    public ThreadPoolInfo getThreadPoolInfo();
}

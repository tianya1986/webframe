/**
 * 
 */
package com.service.socketservice.impl;

import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import javax.annotation.PostConstruct;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.nd.common.ConstantsUtil;
import com.service.socketservice.IThreadPoolService;
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
 * Create Time:2011-12-1
 * </p>
 * 
 * @author zhy
 * @version 1.0.0
 */
@Service
public class ThreadPoolService implements IThreadPoolService {
    private static Logger logger = Logger.getLogger(ThreadPoolService.class);
    private ThreadPoolExecutor threadPool;
    private static long excuteTimes = 0;

    public ThreadPoolExecutor getThreadPool() {
        return threadPool;
    }

    public void setThreadPool(ThreadPoolExecutor threadPool) {
        this.threadPool = threadPool;
    }

    @PostConstruct
    @SuppressWarnings("unchecked")
    public void init() {
        logger.info("线程池初始化!!");
        int poolSize = 50;
        int minpoolSize = 30;
        threadPool = new ThreadPoolExecutor(
        // 最少数量30，最大数量60 空闲时间 3秒
        		minpoolSize,
                                            poolSize,
                                            3,
                                            TimeUnit.SECONDS,
                                            // 缓冲队列大小
                                            new LinkedBlockingQueue(),
                                            // 抛弃旧的任务
                                            new ThreadPoolExecutor.DiscardPolicy());
    }

    public void execute(Runnable task) {
        threadPool.execute(task);
    }

    /*
     * (non-Javadoc)
     * @see com.nd.rom.thread.IThreadPoolService#getThreadPoolInfo()
     */
    @Override
    public ThreadPoolInfo getThreadPoolInfo() {
        ThreadPoolInfo threadPoolInfo = new ThreadPoolInfo();
        threadPoolInfo.setIp(ConstantsUtil.getIp());
        threadPoolInfo.setCorePoolSize(threadPool.getCorePoolSize());
        threadPoolInfo.setMaxPoolSize(threadPool.getMaximumPoolSize());
        threadPoolInfo.setKeepAliveTime((int) threadPool.getKeepAliveTime(TimeUnit.SECONDS));
        threadPoolInfo.setPoolSize(threadPool.getPoolSize());
        threadPoolInfo.setQueeSize(threadPool.getQueue().size());
        threadPoolInfo.setActiveCounnt(threadPool.getActiveCount());
        threadPoolInfo.setCompletedTaskCount(threadPool.getCompletedTaskCount());
        logger.debug("server count="+ConstantsUtil.serverChannel.size());
        logger.debug("client count="+ConstantsUtil.channelMap.size());
        threadPoolInfo.setServerConCount(ConstantsUtil.serverChannel.size());
        threadPoolInfo.setClientConCount(ConstantsUtil.channelMap.size());
        return threadPoolInfo;
    }

}

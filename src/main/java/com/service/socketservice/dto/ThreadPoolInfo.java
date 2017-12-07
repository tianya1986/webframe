/**
  * @Title: ThreadPoolInfo.java
  * @Package com.yirong.ecm.transmission.model.dto
  * @company: 福建亿榕信息技术有限公司
  * @author HuangJianXin
  * @date 2011-12-6 上午11:28:39
  * @version V1.2
  */
package com.service.socketservice.dto;

import java.io.Serializable;

public class ThreadPoolInfo implements Serializable{
	private String ip="";//任务IP
	private int runFlag=0;//跑任务标志
	// 线程池维护线程的最少数量
	private int corePoolSize= 0;

	// 线程池维护线程的最大数量
	private int maxPoolSize = 0;

	// 线程池维护线程所允许的空闲时间
	private int keepAliveTime= 0;

	// 线程池所使用的缓冲队列大小
	private int queeSize = 0;
	//线程数
	private int poolSize=0;
	//返回主动执行任务的近似线程数。
	private int activeCounnt;
	//回已完成执行的近似任务总数
	private long completedTaskCount;
	
	private int  serverConCount;//服端连接数
	
	private int  clientConCount;//客户端连接数
	
	private String acttype="threadpool";
	
	public String getActtype() {
		return acttype;
	}
	public void setActtype(String acttype) {
		this.acttype = acttype;
	}
	public int getPoolSize() {
		return poolSize;
	}
	public void setPoolSize(int poolSize) {
		this.poolSize = poolSize;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public int getRunFlag() {
		return runFlag;
	}
	public void setRunFlag(int runFlag) {
		this.runFlag = runFlag;
	}
	public  int getCorepoolsize() {
		return corePoolSize;
	}
	public  int getMaxpoolsize() {
		return maxPoolSize;
	}
	public  int getKeepalivetime() {
		return keepAliveTime;
	}
	public  int getQueesize() {
		return queeSize;
	}
	public int getCorePoolSize() {
		return corePoolSize;
	}
	public void setCorePoolSize(int corePoolSize) {
		this.corePoolSize = corePoolSize;
	}
	public int getMaxPoolSize() {
		return maxPoolSize;
	}
	public void setMaxPoolSize(int maxPoolSize) {
		this.maxPoolSize = maxPoolSize;
	}
	public int getKeepAliveTime() {
		return keepAliveTime;
	}
	public void setKeepAliveTime(int keepAliveTime) {
		this.keepAliveTime = keepAliveTime;
	}
	public int getQueeSize() {
		return queeSize;
	}
	public void setQueeSize(int queeSize) {
		this.queeSize = queeSize;
	}
	public int getActiveCounnt() {
		return activeCounnt;
	}
	public void setActiveCounnt(int activeCounnt) {
		this.activeCounnt = activeCounnt;
	}
	public long getCompletedTaskCount() {
		return completedTaskCount;
	}
	public void setCompletedTaskCount(long completedTaskCount) {
		this.completedTaskCount = completedTaskCount;
	}
	public int getServerConCount() {
		return serverConCount;
	}
	public void setServerConCount(int serverConCount) {
		this.serverConCount = serverConCount;
	}
	public int getClientConCount() {
		return clientConCount;
	}
	public void setClientConCount(int clientConCount) {
		this.clientConCount = clientConCount;
	}

}

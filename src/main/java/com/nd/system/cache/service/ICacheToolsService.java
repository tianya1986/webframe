package com.nd.system.cache.service;


/**
 * Created by Administrator on 2015/1/26.
 */
public interface ICacheToolsService {
    /**
     * 获取系统参数
     * @param code
     * @param value
     */
    public void setSysConfig(String code,Object value);

    /**
     * 设置系统参数
     * @param code
     * @return
     */
    public Object getSysConfigByCode(String code);

    /**
     * 删除系统参数
     * @param code
     * @return
     */
    public void deleteSysConfig(String code);
    /**
     * 设置客户端连接的服务端IP
     * @param clientKey
     * @param serverIp
     */
    public void setServerIp(String mac,String serverIp);

    /**
     * 获取客户端连接的服务端IP
     * @param clientKey
     */
    public String getServerIp(String mac);

    /**
     * 删除客户端netty通道服务端ip
     * @param clientKey
     */
    public void deleteServerIp(String mac,String serverIp);
    
    /**
     * 设置客户端连接的MacKey
     * @param clientIp
     * @param clientKey
     */
    public void setMacKey(String clientIp,String clientKey);

    /**
     * 获取客户端连接的MacKey
     * @param clientIp
     */
    public String getMacKey(String clientIp);

    /**
     * 删除客户端连接的mac
     * @param clientIp
     */
    public void deleteMacKey(String clientIp);
    /**
     * 设置客户端连接的byteBuf
     * @param clientIp
     * @param byteBuf
     */
    public void setByte(String clientIp, byte[] bytevalue);

    /**
     * 获取客户端连接的byteBuf
     * @param clientIp
     */
    public  byte[] getByte(String clientIp);

    /**
     * 删除客户端连接的mac
     * @param clientIp
     */
    public void deleteByte(String clientIp);

    /**
     * 设置端连接的ipport
     * @param mac
     * @param ipport
     */
    public void setChannelKey(String mac,String ipport);

    /**
     * 获取客户端连接的最新ipport
     * @param mac
     */
    public String getChannelKey(String mac);

    /**
     * 删除客户端连接的ipport
     * @param mac
     */
    public void deleteChannelKey(String mac,String ipport);
}

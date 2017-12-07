package com.nd.system.cache.service.impl;

import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.annotation.Resource;

import org.apache.log4j.Logger;

import com.nd.common.cache.redis.IHashCacheService;
import com.nd.common.cache.redis.IListCacheService;
import com.nd.common.cache.redis.IValueCacheService;
import com.nd.system.cache.KeyUtil;
import com.nd.system.cache.service.ICacheToolsService;

/**
 * Created by Administrator on 2015/1/26.
 */

public class CacheToolsService implements ICacheToolsService {
    @Resource
    IValueCacheService valueCacheService;

    @Resource
    IHashCacheService hashCacheService;

    private final static Logger logger = Logger.getLogger(CacheToolsService.class);

    @Resource
    IListCacheService listCacheServce;

    @Override
    public void setSysConfig(String code, Object value) {
        try {
            valueCacheService.set(KeyUtil.sys_config + code, value);
        } catch (Exception e) {
            logger.error(e);
        }

    }

    @Override
    public Object getSysConfigByCode(String code) {
        Object object = null;
        try {
            object = valueCacheService.get(KeyUtil.sys_config + code);
        } catch (Exception e) {
            logger.error(e);
        }
        return object;
    }

    @Override
    public void deleteSysConfig(String code) {
        try {
            valueCacheService.delete(KeyUtil.sys_config + code);
        } catch (Exception e) {
            logger.error(e);
        }
    }

    /**
     * 设置客户端连接的服务端IP
     * @param clientKey
     * @param serverIp
     */
    @Override
    public void setServerIp(String mac, String serverIp) {
        try {
            listCacheServce.leftPush(KeyUtil.server_ip + mac, serverIp);
            listCacheServce.expire(KeyUtil.server_ip + mac, 5, TimeUnit.DAYS);
        } catch (Exception e) {
            logger.error(e);
        }
    }

    /**
     * 获取客户端连接的服务端IP
     * @param clientKey
     */
    @Override
    public String getServerIp(String mac) {
        List object = null;
        try {
            object = listCacheServce.range(KeyUtil.server_ip + mac, 0, 0);
        } catch (Exception e) {
            logger.error(e);
        }
        if (object == null || object.size() == 0) {
            return null;
        }
        else {
            return object.get(0).toString();
        }
    }

    /**
     * 删除客户端netty通道
     * @param clientKey
     */
    @Override
    public void deleteServerIp(String mac, String serverIp) {
        listCacheServce.remove(KeyUtil.server_ip + mac, -1, serverIp);
    }

    /**
     * 设置客户端连接的MacKey
     * @param clientIp
     * @param clientKey
     */
    @Override
    public void setMacKey(String clientIp, String clientKey) {
        try {
            valueCacheService.set(KeyUtil.client_key + clientIp, clientKey, 2, TimeUnit.DAYS);
        } catch (Exception e) {
            logger.error(e);
        }
    }

    /**
     * 获取客户端连接的MacKey
     * @param clientIp
     */
    @Override
    public String getMacKey(String clientIp) {
        Object object = null;
        try {
            object = valueCacheService.get(KeyUtil.client_key + clientIp);
        } catch (Exception e) {
            logger.error(e);
        }
        if (object == null) {
            return null;
        }
        return (String) object;
    }

    /**
     * 删除客户端连接的mac
     * @param clientIp
     */
    @Override
    public void deleteMacKey(String clientIp) {
        try {
            valueCacheService.delete(KeyUtil.client_key + clientIp);
        } catch (Exception e) {
            logger.error(e);
        }
    }

    /**
     * 设置客户端连接的byteBuf
     * @param clientIp
     * @param byteBuf
     */
    @Override
    public void setByte(String clientIp, byte[] byteBuf) {
        try {
            valueCacheService.set(KeyUtil.byte_buf + clientIp, byteBuf, 60, TimeUnit.MINUTES);
        } catch (Exception e) {
            logger.error(e);
        }

    }

    /**
     * 获取客户端连接的byteBuf
     * @param clientIp
     */
    @Override
    public byte[] getByte(String clientIp) {
        Object object = null;
        try {
            object = valueCacheService.get(KeyUtil.byte_buf + clientIp);
        } catch (Exception e) {
            logger.error(e);
        }
        if (object == null) {
            return null;
        }
        return (byte[]) object;
    }

    /**
     * 删除客户端连接的mac
     * @param clientIp
     */
    @Override
    public void deleteByte(String clientIp) {
        try {
            valueCacheService.delete(KeyUtil.byte_buf + clientIp);
        } catch (Exception e) {
            logger.error(e);
        }
    }

    /**
     * 设置端连接的ipport
     * @param mac
     * @param ipport
     */
    public void setChannelKey(String mac, String ipport) {
        try {
            listCacheServce.leftPush(KeyUtil.chnannel_ipport + mac, ipport);
            listCacheServce.expire(KeyUtil.chnannel_ipport + mac, 5, TimeUnit.DAYS);
        } catch (Exception e) {
            logger.error(e);
        }
    }

    /**
     * 获取客户端连接的最新ipport
     * @param mac
     */
    public String getChannelKey(String mac) {
        List object = null;
        try {
            object = listCacheServce.range(KeyUtil.chnannel_ipport + mac, 0, 0);
        } catch (Exception e) {
            logger.error(e);
        }
        if (object == null || object.size() == 0) {
            return null;
        }
        else {
            return object.get(0).toString();
        }
    }

    /**
     * 删除客户端连接的ipport
     * @param mac
     */
    public void deleteChannelKey(String mac, String ipport) {
        listCacheServce.remove(KeyUtil.chnannel_ipport + mac, -1, ipport);
    }
}

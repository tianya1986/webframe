package com.nd.common.generator;

/**
 * Created by Administrator on 2014/12/25.
 */
public class HttpStatusCode {
    /**
     * 无效请求 (默认)
     */
    public  static final String BAD_REQUEST="BAD_REQUEST";
    /**
     * 缺少参数
     */
    public  static final String  REQUIRE_ARGUMENT ="REQUIRE_ARGUMENT";
    /**
     * 无效参数 (格式不对, 长度过长或过短等)
     */
    public  static final String INVALID_ARGUMENT="INVALID_ARGUMENT";
    /**
     * 未授权 (默认)
     */
    public  static final String UNAUTHORIZED ="UNAUTHORIZED";
    /**
     * 授权已过期
     */
    public  static final String AUTH_TOKEN_EXPIRED ="AUTH_TOKEN_EXPIRED";
    /**
     * 无效的授权 (如token不存在、需要mac签名、mac签名无效、nonce无效、重复提交等)
     */
    public  static final String AUTH_INVALID_TOKEN ="AUTH_INVALID_TOKEN";
    /**
     * 无效的时间戳，当时间戳与系统的差异大于5分钟后，产生该错误，客户端需要进行校时操作。
     */
    public  static final String AUTH_INVALID_TIMESTAMP ="AUTH_INVALID_TIMESTAMP";
    /**
     * 请求受限 (默认);
     */
    public  static final String REQUEST_DENIED ="REQUEST_DENIED";
    /**
     * 授权受限（无权限或IP地址受限等）
     */
    public  static final String AUTH_DENIED="AUTH_DENIED";
    /**
     * 请求的路径不存在 (默认)
     */
    public  static final String NOT_FOUND ="NOT_FOUND";
    /**
     * 请求的方法不支持
     */
    public  static final String METHOD_NOT_ALLOWED ="METHOD_NOT_ALLOWED";
    /**
     * 服务器无法提供请求时指定的数据响应格式
     */
    public  static final String NOT_ACCEPTABLE ="NOT_ACCEPTABLE";
    /**
     *  服务器不支持请求所提交的数据格式
     */
    public  static final String UNSUPPORTED_MEDIA_TYPE="UNSUPPORTED_MEDIA_TYPE";
    /**
     * 请求过于频繁
     */
    public  static final String REQUEST_RATE_LIMITED ="REQUEST_RATE_LIMITED";
    /**
     * 服务器内部错误 (默认)
     */
    public  static final String INTERNAL_SERVER_ERROR ="INTERNAL_SERVER_ERROR";
    /**
     * 无效网关
     */
    public  static final String BAD_GATEWAY ="BAD_GATEWAY";
    /**
     * 服务不可用
     */
    public  static final String SERVICE_UNAVAILABLE ="SERVICE_UNAVAILABLE";


}

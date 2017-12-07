/**
 * @CoypRight:nd.com (c) 2015 All Rights Reserved
 *
 * @date 2015年10月30日 下午7:49:36
 * @version V1.0
 */
package com.nd.common;

/**
 * <p>
 * </p>
 *
 * @author Administrator
 */
public class ResultVo {
    /**
     * 结果码，0成功，-1失败
     */
    private int code = -1;
    private String msg;

    /**
     * @return the code
     */
    public int getCode() {
        return code;
    }

    /**
     * @param code the code to set
     */
    public void setCode(int code) {
        this.code = code;
    }

    /**
     * @return the msg
     */
    public String getMsg() {
        return msg;
    }

    /**
     * @param msg the msg to set
     */
    public void setMsg(String msg) {
        this.msg = msg;
    }

}

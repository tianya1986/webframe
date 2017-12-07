package com.nd.common;

import io.netty.channel.Channel;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Hashtable;

import org.apache.log4j.Logger;

import com.nd.common.util.ObjectUtils;
import com.service.socketservice.dto.ThreadPoolInfo;

public class ConstantsUtil {
	private final static Logger logger = Logger.getLogger(ConstantsUtil.class);
	public static final int SERVICE_APP_START = 1;// 应用启动
	public static final int SERVICE_APP_STOP = 0;// 应用停止
	public static HashMap<String, Channel> channelMap = new HashMap<String, Channel>();//pad的连接,
	public static Hashtable<String, Channel> serverChannel = new Hashtable<String, Channel>();//服务link
	public static HashMap<String, ThreadPoolInfo> threadPoolInfoMap = new HashMap<String, ThreadPoolInfo>();//threadpool properties
	public static final int SIZE = Integer.parseInt(System.getProperty("size",
			"256"));
	public static final String actcode = "actcode";
	public static final String mac = "mac";
	public static final String serialid = "serialid";
  
    public static String printlog=null;
	public static String getIp() {
		if (ObjectUtils.isEmpty(localIP)) {
			localIP = getLocalIP();
		}
		return localIP;
	}

	public static String localIP;

	public static void setLocalIP(String ip) {
		localIP = ip;
		// System.out.println("设置ip："+ip);
	}

	/**
	 * 判断当前操作是否Windows.
	 * 
	 * @return true---是Windows操作系统
	 */
	public static boolean isWindowsOS() {
		boolean isWindowsOS = false;
		String osName = System.getProperty("os.name");
		if (osName.toLowerCase().indexOf("windows") > -1) {
			isWindowsOS = true;
		}
		return isWindowsOS;
	}

	/**
	 * 获取本机IP地址，并自动区分Windows还是Linux操作系统
	 * 
	 * @return String
	 */
	public static String getLocalIP() {
		String sIP = "";
		InetAddress ip = null;
		try {
			// 如果是Windows操作系统
			if (isWindowsOS()) {
				ip = InetAddress.getLocalHost();
				logger.info("当前为Windows操作系统");
			}
			// 如果是Linux操作系统
			else {
				logger.info("当前为Linux操作系统");
				boolean bFindIP = false;
				Enumeration<NetworkInterface> netInterfaces = NetworkInterface
						.getNetworkInterfaces();
				while (netInterfaces.hasMoreElements()) {
					if (bFindIP) {
						break;
					}
					NetworkInterface ni = netInterfaces.nextElement();
					// ----------特定情况，可以考虑用ni.getName判断
					// 遍历所有ip
					Enumeration<InetAddress> ips = ni.getInetAddresses();
					while (ips.hasMoreElements()) {
						ip = ips.nextElement();
						if (ip.isSiteLocalAddress() && !ip.isLoopbackAddress() // 127.开头的都是lookback地址
								&& ip.getHostAddress().indexOf(":") == -1) {
							bFindIP = true;
							break;
						}
					}

				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (null != ip) {
			sIP = ip.getHostAddress();
		}
		logger.info("本机ip="+sIP);
		return sIP;
	}

	public static byte[] intToByteArray( int integer) {
		int byteNum = (40 - Integer.numberOfLeadingZeros(integer < 0 ? ~integer
				: integer)) / 8;
		byte[] byteArray = new byte[4];

		for (int n = 0; n < byteNum; n++)
			byteArray[3 - n] = (byte) (integer >>> (n * 8));

		return (byteArray);
	}

	public static int byteArrayToInt(byte[] b, int offset) {
		int value = 0;
		for (int i = 0; i < 4; i++) {
			int shift = (4 - 1 - i) * 8;
			value += (b[i + offset] & 0x000000FF) << shift;
		}
		return value;
	}
	/*public static void info( Logger logger,String info){
		if(printlog==null||printlog.equals("true")){
			logger.info(info);
		}
	}*/
}

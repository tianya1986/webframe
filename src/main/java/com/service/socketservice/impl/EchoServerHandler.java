/*
 * Copyright 2012 The Netty Project
 *
 * The Netty Project licenses this file to you under the Apache License,
 * version 2.0 (the "License"); you may not use this file except in compliance
 * with the License. You may obtain a copy of the License at:
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
package com.service.socketservice.impl;


import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandler.Sharable;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandler;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.channel.ChannelPipeline;

import org.apache.log4j.Logger;

import com.nd.common.ConstantsUtil;
import com.nd.common.SpringContextUtils;
import com.nd.system.cache.service.ICacheToolsService;
import com.nd.system.cache.service.impl.CacheToolsService;
import com.service.socketservice.IThreadPoolService;

/**
 * Handler implementation for the echo server.
 */
@Sharable
public class EchoServerHandler extends ChannelInboundHandlerAdapter {
	private final static Logger logger = Logger.getLogger(EchoServerHandler.class);
	static IThreadPoolService threadPoolService;
	static ICacheToolsService cacheToolsService;
	//private static HashMap<String,byte[]> map=new HashMap<String,byte[]>();
	@Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
		if(threadPoolService==null){
    		threadPoolService=(IThreadPoolService)SpringContextUtils.getBean(ThreadPoolService.class);
    	}
		if(cacheToolsService==null){
			cacheToolsService=(ICacheToolsService)SpringContextUtils.getBean(CacheToolsService.class);
		}
		logger.info("Welcome!!!"+ctx.channel().remoteAddress());
    }
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) {
    	/**
    	 * ByteBuf的几个重要方法

discardReadBytes()
    	 */
    	ByteBuf buf = (ByteBuf) msg;
    	send(buf,ctx);
     

    }

    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) {
        ctx.flush();
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        // Close the connection when an exception is raised.
        cause.printStackTrace();
        ctx.close();
    }
    /**
     * Calls {@link ChannelHandlerContext#fireChannelInactive()} to forward
     * to the next {@link ChannelInboundHandler} in the {@link ChannelPipeline}.
     *
     * Sub-classes may override this method to change behavior.
     */
    @Override
    public void channelInactive(ChannelHandlerContext ctx) throws Exception {
    	String ipport=ctx.channel().remoteAddress().toString();
    	String macKey=cacheToolsService.getMacKey(ipport);//设置每次连接对应的clientKey
    	cacheToolsService.deleteServerIp(macKey, ConstantsUtil.getIp());//维护客户端与服务端的消息通道ip   避免直接关机
    	logger.debug(" 关闭   remove key "+ipport+ "macKey:"+macKey);
    	cacheToolsService.deleteChannelKey(macKey, ipport);
    	ConstantsUtil.channelMap.remove(ipport);//维护客户端与服务端的消息通道
        ctx.fireChannelInactive();
    }
    private  void send(ByteBuf buf,ChannelHandlerContext ctx){
        byte[] headreq = new byte[8];
        buf.readBytes(headreq,0,8);
        byte[] protocolbyte=new byte[2];
        protocolbyte[0]=headreq[0];
        protocolbyte[1]=headreq[1];
        if(protocolbyte[0]==(byte)0xaf){//&&protocolbyte[1]==(byte)0xbe
	        byte[] infolengbyte=new byte[4];
	    	infolengbyte[0]=headreq[4];
	    	infolengbyte[1]=headreq[5];
	    	infolengbyte[2]=headreq[6];
	    	infolengbyte[3]=headreq[7];
	    	/*if(headreq[2]==0x00&&headreq[3]==0x00){
	    		logger.debug("断点");
	    	}*/
	    	int infoleng=ConstantsUtil.byteArrayToInt(infolengbyte, 0);
	    	logger.debug("长度："+infoleng);
	    	if(infoleng>=0){
	    	byte[] bodyreq = new byte[infoleng];
	    	    if(buf.readableBytes()<infoleng){
	    	    	logger.debug(" 包尾不够长");
	    	    	byte[] allByte=new byte[8+buf.readableBytes()];
	    	    	byte[] remainingByte=new byte[buf.readableBytes()];
	        		buf.readBytes(remainingByte);
	        		
	        		for(int i=0;i<8;i++){
	        			allByte[i]=headreq[i];
	        		}
	        		for(int i=0;i<remainingByte.length;i++){
	        			allByte[i+8]=remainingByte[i];
	        		}
	    	    	cacheToolsService.setByte(ctx.channel().remoteAddress().toString(), allByte);
	    	    	return ;
	    	    }
		    	buf.readBytes(bodyreq,0,infoleng);
		    	buf.discardReadBytes();
		  //  	EchoTaskThread echoTaskThread=new EchoTaskThread(headreq,bodyreq,ctx);
		      //  threadPoolService.execute(echoTaskThread);
		        if(buf.isReadable()){
		        	if(buf.readableBytes()>20){
		        		send(buf,ctx);
		        		logger.debug(" 可以继续读");
		        	}else{
		        		logger.debug(" 包尾断掉");
		        		byte[] remainingByte=new byte[buf.readableBytes()];
		        		buf.readBytes(remainingByte);
		        		cacheToolsService.setByte(ctx.channel().remoteAddress().toString(), remainingByte);
		        	}
		        }
	    	}
        }else{
        	byte[] cacheByte=cacheToolsService.getByte(ctx.channel().remoteAddress().toString());
        	byte[] allByte=new byte[cacheByte.length+8+buf.readableBytes()];
        	for(int i=0;i<cacheByte.length;i++){////拷贝字节
        		allByte[i]=cacheByte[i];
        	}
        	for(int i=0;i<8;i++){//拷贝头
        		allByte[i+cacheByte.length]=headreq[i];
        	}
        	byte[] remainingByte=new byte[buf.readableBytes()];
    		buf.readBytes(remainingByte);
    		int start=8+cacheByte.length;
    	
    		System.out.println ("allByte="+allByte.length+" cacheByte= "+cacheByte.length+"  remainingByte="+remainingByte.length);
    		for(int i=0;i<remainingByte.length;i++){//拷贝本送剩下
    			allByte[i+start]=remainingByte[i];
    		}
        	cacheToolsService.deleteByte(ctx.channel().remoteAddress().toString());
        	logger.debug(" 接上继续读");
        	sendCacheBuffer(allByte,ctx);
    		
        }
    }
    public void  sendCacheBuffer(byte[] allByte,ChannelHandlerContext ctx){
    	 byte[] headreq = new byte[8];
    	 for(int i=0;i<8;i++){
    		 headreq[i]=allByte[i];
    	 }
         if(headreq[0]==(byte)0xaf){//&&protocolbyte[1]==(byte)0xbe
 	        byte[] infolengbyte=new byte[4];
 	    	infolengbyte[0]=headreq[4];
 	    	infolengbyte[1]=headreq[5];
 	    	infolengbyte[2]=headreq[6];
 	    	infolengbyte[3]=headreq[7];
 	    	int infoleng=ConstantsUtil.byteArrayToInt(infolengbyte, 0);
 	    	if(infoleng>0){
 	    	byte[] bodyreq = new byte[infoleng];
 	    	    if(allByte.length<infoleng+8){
 	    	    	logger.debug(" 包尾byte不够长");
 	    	    	cacheToolsService.setByte(ctx.channel().remoteAddress().toString(),allByte);
 	    	    	return ;
 	    	    }
 		    	for(int i=0;i<bodyreq.length;i++){
 		    		bodyreq[i]=allByte[i+8];
 		    	}
// 		    	EchoTaskThread echoTaskThread=new EchoTaskThread(headreq,bodyreq,ctx);
// 		        threadPoolService.execute(echoTaskThread);
 		        int startl=8+infoleng;
 		        if(allByte.length-startl>0){
	 		        byte[] remainingByte=new byte[allByte.length-startl];
	 		        
	 		        for(int i=0;i<allByte.length-startl;i++){
	 		        	remainingByte[i]=allByte[i+startl];
	 		        }
	 		        	if(remainingByte.length>8){
	 		        		sendCacheBuffer(remainingByte,ctx);
	 		        		logger.debug(" 可以byte继续读");
	 		        	}else{
	 		        		logger.debug(" 包尾byte断掉");
	 		        		cacheToolsService.setByte(ctx.channel().remoteAddress().toString(), remainingByte);
	 		        	}
 		        }
 	    	}
         }else{
         	logger.debug(" 接上  byte错误");
     		
         }
    }
}

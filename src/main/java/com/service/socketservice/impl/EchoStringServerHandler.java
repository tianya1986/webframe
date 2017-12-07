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
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandler.Sharable;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandler;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.channel.ChannelPipeline;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.nd.common.ConstantsUtil;

/**
 * Handler implementation for the echo server.
 */
@Sharable
public class EchoStringServerHandler extends ChannelInboundHandlerAdapter {
	private final static Logger logger = Logger
			.getLogger(EchoStringServerHandler.class);

	private static List<ChannelHandlerContext> clientlist = new ArrayList<ChannelHandlerContext>();
	
	@Override
	public void channelRegistered(ChannelHandlerContext ctx) throws Exception {
	    super.channelRegistered(ctx);
	}

	// private static HashMap<String,byte[]> map=new HashMap<String,byte[]>();
	@Override
	public void channelActive(ChannelHandlerContext ctx) throws Exception {

		logger.info("Welcome!!!" + ctx.channel().remoteAddress());
		
		clientlist.add(ctx);
	}

	@Override
	public void channelRead(ChannelHandlerContext ctx, Object msg) {
		/**
		 * ByteBuf的几个重要方法
		 * 
		 * discardReadBytes()
		 */
		String buf = (String) msg;
		 
	//	ctx.write(sendMsg);
	        
	      //  ChannelFuture future=	ctx.channel().writeAndFlush(sendMsg);
		sendStr(buf, ctx);
	}

	@Override
	public void channelReadComplete(ChannelHandlerContext ctx) {
		ctx.flush();
	}

	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
		// Close the connection when an exception is raised.
		clientlist.remove(ctx);
		cause.printStackTrace();
		ctx.close();
	}

	/**
	 * Calls {@link ChannelHandlerContext#fireChannelInactive()} to forward to
	 * the next {@link ChannelInboundHandler} in the {@link ChannelPipeline}.
	 *
	 * Sub-classes may override this method to change behavior.
	 */
	@Override
	public void channelInactive(ChannelHandlerContext ctx) throws Exception {
		String ipport = ctx.channel().remoteAddress().toString();
		clientlist.remove(ctx);
		ctx.fireChannelInactive();
	}

	private void sendStr(String msg, ChannelHandlerContext ctx) {
		System.out.println("rec=" + msg);
        ByteBuf sendMsg = Unpooled.buffer(ConstantsUtil.SIZE);
        
        sendMsg.writeBytes(msg.getBytes());
       
		ctx.writeAndFlush(sendMsg);
	}
	

    public static boolean sendMsgToClients(String msg) {
        if (clientlist.size() == 0) {
            return true;
        } else {
            for (int i = 0; i < clientlist.size(); i++) {
                
                sendmsg(msg,clientlist.get(i));
            }
        }
        return true;
    }
    
    private static void sendmsg(String msg,ChannelHandlerContext ctx){
        
        if(ctx.channel()!=null&&ctx.channel().isActive()){
          ByteBuf sendMsg = Unpooled.buffer(ConstantsUtil.SIZE);
            
            sendMsg.writeBytes(msg.getBytes());
           
            ctx.writeAndFlush(sendMsg);
        }
    
    }

}

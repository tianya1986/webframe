package com.service.socketservice.impl;

import org.apache.log4j.Logger;



import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.timeout.IdleState;
import io.netty.handler.timeout.IdleStateEvent;

public class EchoHeartBeatHandler extends SimpleChannelInboundHandler<String>{
	private final static Logger logger = Logger.getLogger(EchoServerHandler.class);
    @Override
    public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
  
    	if (evt instanceof IdleStateEvent) {
    	  	
    		 IdleStateEvent event = (IdleStateEvent) evt;
             if (event.state().equals(IdleState.READER_IDLE)) {
            	 logger.debug(ctx.channel().remoteAddress()+" 超时READER_IDLE");
                 ctx.close();
             }
        }
    }

	@Override
	protected void channelRead0(ChannelHandlerContext ctx, String msg)
			throws Exception {
		// TODO Auto-generated method stub
		System.out.println("############");
		
	}

}

package com.service.socketservice.impl;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.string.StringDecoder;
import io.netty.handler.logging.LogLevel;
import io.netty.handler.logging.LoggingHandler;
import io.netty.handler.ssl.SslContext;
import io.netty.handler.ssl.SslContextBuilder;
import io.netty.handler.ssl.util.SelfSignedCertificate;
import io.netty.handler.timeout.IdleStateHandler;

import java.util.concurrent.TimeUnit;

import org.apache.log4j.Logger;


public class EchoInitThead extends Thread{
	private final static Logger logger = Logger.getLogger(EchoInitThead.class);
	static final boolean SSL = System.getProperty("ssl") != null;
    int PORT = Integer.parseInt(System.getProperty("port", "8001"));

	public void run() {
		
		try {
			logger.info("\r\nnetty服务端启动. echo..port="+PORT);
			startservice();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public  void startservice() throws Exception {
        // Configure SSL.
    	//System.out.println("netty服务端启动...");
        final SslContext sslCtx;
        if (SSL) {
            SelfSignedCertificate ssc = new SelfSignedCertificate();
            sslCtx = SslContextBuilder.forServer(ssc.certificate(), ssc.privateKey()).build();
        } else {
            sslCtx = null;
        }

        // Configure the server.
        EventLoopGroup bossGroup = new NioEventLoopGroup(1);
        EventLoopGroup workerGroup = new NioEventLoopGroup();
        try {
            ServerBootstrap b = new ServerBootstrap();
            b.group(bossGroup, workerGroup)
             .channel(NioServerSocketChannel.class)
             .option(ChannelOption.SO_BACKLOG, 100)
             .handler(new LoggingHandler(LogLevel.INFO))
             .childHandler(new ChannelInitializer<SocketChannel>() {
                 @Override
                 public void initChannel(SocketChannel ch) throws Exception {
                     ChannelPipeline p = ch.pipeline();
                     if (sslCtx != null) {
                         p.addLast(sslCtx.newHandler(ch.alloc()));
                     }
                     /**
                      * Creates a new instance firing {@link IdleStateEvent}s.
                      *
                      * @param readerIdleTime
                      *        an {@link IdleStateEvent} whose state is {@link IdleState#READER_IDLE}
                      *        will be triggered when no read was performed for the specified
                      *        period of time.  Specify {@code 0} to disable.
                      * @param writerIdleTime
                      *        an {@link IdleStateEvent} whose state is {@link IdleState#WRITER_IDLE}
                      *        will be triggered when no write was performed for the specified
                      *        period of time.  Specify {@code 0} to disable.
                      * @param allIdleTime
                      *        an {@link IdleStateEvent} whose state is {@link IdleState#ALL_IDLE}
                      *        will be triggered when neither read nor write was performed for
                      *        the specified period of time.  Specify {@code 0} to disable.
                      * @param unit
                      *        the {@link TimeUnit} of {@code readerIdleTime},
                      *        {@code writeIdleTime}, and {@code allIdleTime}
                      */
                     p.addLast(new IdleStateHandler(5, 8, 8, TimeUnit.MINUTES));//开启超时机制
                     p.addLast(new EchoHeartBeatHandler());//心跳处理
                     p.addLast(new StringDecoder());
                   //半包解决
                   //  p.addLast(new LineBasedFrameDecoder(1024));
                     p.addLast(new EchoStringServerHandler());
                 }
             });

            // Start the server.
            ChannelFuture f = b.bind(PORT).sync();

            // Wait until the server socket is closed.
            f.channel().closeFuture().sync();
        } finally {
            // Shut down all event loops to terminate all threads.
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }
}

package com.nd;

import java.util.Date;
import java.util.concurrent.TimeUnit;

import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.nd.common.cache.redis.IHashCacheService;
import com.nd.common.cache.redis.IListCacheService;
import com.nd.common.cache.redis.IValueCacheService;
import com.nd.common.cache.redis.IZsetCacheService;
import com.nd.common.cache.redis.impl.HashCacheService;
import com.nd.common.encrypt.Base64;

/**
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author 吴杰明
 * @date 2014-6-30 下午3:01:27
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:/spring/applicationContext.xml")
public class CommentTest extends AbstractJUnit4SpringContextTests {

	@Resource
	IZsetCacheService<String, String> zsetCacheService;//redis中的zset
	@Resource
	IHashCacheService HashCacheService;//
	@Resource
	IValueCacheService valueCacheService;
	@Resource
	IListCacheService listCacheServce;
	
	
	@Resource(name="redisTemplate")
	private ZSetOperations zSetOps;
	@Resource(name="redisTemplate")
	private HashOperations hashOps;
	@org.junit.Test
	public void stupidTest() {
		System.out.println("**@@@***********");

	}
	@Test
	public void testmq() {
		System.out.println(Base64.encode("FNVWIpWCowiG6JgUs1tt"));
 
    } 
     
	@Test
	public void redis() {
		
		listCacheServce.delete("a");
		listCacheServce.leftPush("a", "1b");
		listCacheServce.expire("a", 50, TimeUnit.HOURS);
		listCacheServce.leftPush("a", "6b");
		listCacheServce.expire("a", 1, TimeUnit.SECONDS);
		try {
			Thread.sleep(1000*1);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		listCacheServce.leftPush("a", "3b");
		listCacheServce.expire("a", 51, TimeUnit.SECONDS);
		//listCacheServce.expire("a", 50, TimeUnit.SECONDS);
		try {
			Thread.sleep(1000*1);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(listCacheServce.range("a", 0, -1));
		/*long size=listCacheServce.size("a");
		System.out.println("size="+size);
		String re=listCacheServce.range("a", 0, 0).get(0).toString();
		System.out.println(re+" "+listCacheServce.range("a", size-1, size-1).toString());
		System.out.println(listCacheServce.range("a", 0, -1));
		listCacheServce.remove("a",- 1, "6b");
		System.out.println(listCacheServce.range("a", 0, -1));
		zsetCacheService.add("test", "tsetxxx", 1);
		zsetCacheService.add("test", "aa",2);
		zsetCacheService.add("test", "c",1);
		HashCacheService.put("aaa", "bbb", "cc");
		HashCacheService.put("aaa", "ccc", "ac");
		System.out.println("HashCacheService=="+HashCacheService.get("aaa", "bbb"));
		System.out.println("HashCacheService=="+HashCacheService.get("aaa", "ccc"));
		HashCacheService.delete("aaa", "bbb");//这样只能一个一个删除，能不能一下全部删除比如delete("aaa"）
		System.out.println("HashCacheService=="+HashCacheService.values("aaa"));
		System.out.println("HashCacheService=="+HashCacheService.values("aaa").size());*/
    } 
	public void sendDataToCrQueue() {
    } 

}

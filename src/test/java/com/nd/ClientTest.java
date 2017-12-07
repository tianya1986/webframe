package com.nd;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import com.alibaba.fastjson.JSONObject;

public class ClientTest {

	public static void main(String[] args) throws IOException {
		delete();
		//update();
		//save();
		select();
		//getById();
		
		
	}
	
	
	/**
	 * 查询
	 */
	public static void test() {
		try {
			URL url = new URL("http://localhost:8080/admin/webServiceSource/5fc96802");
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-Type", "text/json");
			BufferedReader rd = new BufferedReader(new InputStreamReader(conn
					.getInputStream()));
			String line;
			while ((line = rd.readLine()) != null) {
				System.out.println(line);
			}

			rd.close();
		} catch (Exception e) {
			System.out.println("Error" + e);
			
			
		}
	}
	
	/**
	 * 查询
	 */
	public static void filter() {
		try {
			URL url = new URL("http://localhost:8080/admin/serviceApplyInfo?$filter=111&$orderby=state");
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-Type", "text/json");
			BufferedReader rd = new BufferedReader(new InputStreamReader(conn
					.getInputStream()));
			String line;
			while ((line = rd.readLine()) != null) {
				System.out.println(line);
			}

			rd.close();
		} catch (Exception e) {
			System.out.println("Error" + e);
			
			
		}
	}
	
	/**
	 * 查询
	 */
	public static void select() {
		try {
			URL url = new URL("http://localhost:8080/elasticwebs");
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("GET");
			//conn.setRequestProperty("Content-Type", "text/json");
			conn.setRequestProperty("Accept", "application/dev.nd+json; version=1");
			BufferedReader rd = new BufferedReader(new InputStreamReader(conn
					.getInputStream()));
			String line;
			while ((line = rd.readLine()) != null) {
				System.out.println(line);
			}

			rd.close();
		} catch (Exception e) {
			System.out.println("Error" + e);
		}
	}
	
	
	/**
	 * 查询
	 */
	public static void getById() {
		try {
			URL url = new URL("http://localhost:8080/elasticwebs/b3df467a-55a2-11e4-a8ac-002219b9e604");
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("GET");
			conn.setRequestProperty("Content-Type", "text/json");
			BufferedReader rd = new BufferedReader(new InputStreamReader(conn
					.getInputStream()));
			String line;
			while ((line = rd.readLine()) != null) {
				System.out.println(line);
			}

			rd.close();
		} catch (Exception e) {
			System.out.println("Error" + e);
		}
	}
	
	
	/**
	 * 删除
	 */
	public static void delete() {
		try {
			URL url = new URL("http://localhost:8080/elasticwebs/b3df467a-55a2-11e4-a8ac-002219b9e604");
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("DELETE");
			conn.setRequestProperty("Content-Type", "application/json");
			BufferedReader rd = new BufferedReader(new InputStreamReader(conn
					.getInputStream()));
			String line;
			while ((line = rd.readLine()) != null) {
				System.out.println(line);
			}

			rd.close();
		} catch (Exception e) {
			System.out.println("Error" + e);
		}
	}
	
	/**
	 * 修改
	 */
	public static void update() {
		try {
			String encoding="UTF-8";
			String params="{\"appName\":\"111\",\"containerType\":0,\"domainName\":\"11\",\"id\":11,\"ip\":\"11\",\"packageTools\":1,\"packageUrl\":\"11\",\"region\":0}";
		    byte[] data = params.getBytes(encoding);
		    URL url = new URL("http://localhost:8080/elasticwebs/64772f96-550a-11e4-a8ac-002219b9e604");
	        HttpURLConnection conn = (HttpURLConnection)url.openConnection();
	        conn.setRequestMethod("PUT");
	        conn.setDoOutput(true);
	       
	        conn.setRequestProperty("Content-Type", "application/json; charset="+ encoding);
	        conn.setRequestProperty("Content-Length", String.valueOf(data.length));
	        conn.setConnectTimeout(5*1000);
	        OutputStream outStream = conn.getOutputStream();
	        outStream.write(data);
	        outStream.flush();
	        outStream.close();
	        System.out.println(conn.getResponseCode());
					
			BufferedReader rd = new BufferedReader(new InputStreamReader(conn
					.getInputStream()));
			String line;
			while ((line = rd.readLine()) != null) {
				System.out.println(line);
			}

			rd.close();
		} catch (Exception e) {
			System.out.println("Error" + e);
		}
	}
	
	/**
	 * 保存
	 */
	public static void save() {
		try {
			String encoding="UTF-8";
			String params="{'appName':'111','containerType':0,'domainName':'www.baidu.com'}";
		    byte[] data = params.getBytes(encoding);
		    URL url = new URL("http://localhost:8080/elasticwebs");
	        HttpURLConnection conn = (HttpURLConnection)url.openConnection();
	        conn.setRequestMethod("POST");
	        conn.setDoOutput(true);
	       
	       conn.setRequestProperty("Content-Type", "application/json");
	        conn.setRequestProperty("Content-Length", String.valueOf(data.length));
	      conn.setRequestProperty("Accept", "application/dev.nd+json; version=1");
	        conn.setConnectTimeout(5*1000);
	        OutputStream outStream = conn.getOutputStream();
	        outStream.write(data);
	        outStream.flush();
	        outStream.close();
	        System.out.println(conn.getResponseCode());
					
			BufferedReader rd = new BufferedReader(new InputStreamReader(conn
					.getInputStream()));
			String line;
			while ((line = rd.readLine()) != null) {
				System.out.println(line);
			}

			rd.close();
		} catch (Exception e) {
			System.out.println("Error" + e);
		}
	}
	
	
	/**
	 * 保存
	 */
	public static void saveResourse() {
		try {
			String encoding="UTF-8";
			String params="{'ip':'127.0.0.1','outernet':0,'domain':'ssss','port':8000,'type':0,'status':0}";
		    byte[] data = params.getBytes(encoding);
		    URL url = new URL("http://localhost:8080/resourse");
	        HttpURLConnection conn = (HttpURLConnection)url.openConnection();
	        conn.setRequestMethod("POST");
	        conn.setDoOutput(true);
	       
	        conn.setRequestProperty("Content-Type", "application/json");
	        conn.setRequestProperty("Content-Length", String.valueOf(data.length));
	        conn.setConnectTimeout(5*1000);
	        OutputStream outStream = conn.getOutputStream();
	        outStream.write(data);
	        outStream.flush();
	        outStream.close();
	        System.out.println(conn.getResponseCode());
					
			BufferedReader rd = new BufferedReader(new InputStreamReader(conn
					.getInputStream()));
			String line;
			while ((line = rd.readLine()) != null) {
				System.out.println(line);
			}

			rd.close();
		} catch (Exception e) {
			System.out.println("Error" + e);
		}
	}
	
	public static void save2() {
		try {
			String encoding="UTF-8";
			String params="{\"users\":[\"621955\",\"1000124\",\"1000125\"],\"msg\":{\"onlineonly\":0,\"content\":\"<body>这是一条XML格式的应用消息</body>\"}}";
		    byte[] data = params.getBytes(encoding);
		    URL url = new URL("http://172.24.133.14:2900/msg/usermsg");
	        HttpURLConnection conn = (HttpURLConnection)url.openConnection();
	        conn.setRequestMethod("POST");
	        conn.setDoOutput(true);
	       
	       //conn.setRequestProperty("Content-Type", "application/json");
	       conn.setRequestProperty("Content-Length", String.valueOf(data.length));
	        conn.setConnectTimeout(5*1000);
	        conn.setRequestProperty("token","ppppp");
	        
	        OutputStream outStream = conn.getOutputStream();
	        outStream.write(data);
	        outStream.flush();
	        outStream.close();
	        System.out.println(conn.getResponseCode());
					
			BufferedReader rd = new BufferedReader(new InputStreamReader(conn
					.getInputStream()));
			String line;
			while ((line = rd.readLine()) != null) {
				System.out.println(line);
			}

			rd.close();
		} catch (Exception e) {
			System.out.println("Error" + e);
		}
	}
	
	public static void imTest(){

    	JSONObject jobject=null;
        // 创建默认的httpClient实例.  
   		CloseableHttpClient httpclient = HttpClients.createDefault();
   		// 创建httppost  
   		HttpPost httppost = new HttpPost("http://172.24.133.14:2900/msg/usermsg");
   		// 创建参数队列  
   		List<NameValuePair> formparams = new ArrayList<NameValuePair>();
   		
	   /*	for (String key : datas.keySet()) {
	   		 formparams.add(new BasicNameValuePair(key, datas.get(key)));
	   	}*/
	   	UrlEncodedFormEntity uefEntity;
   		try {
   		
   			httppost.setHeader("token","");
   			
   			httppost.setHeader("Accept", "application/json");
   			uefEntity = new UrlEncodedFormEntity(formparams, "UTF-8");
   			httppost.setEntity(uefEntity);
   			CloseableHttpResponse response = httpclient.execute(httppost);
   			try {
   				org.apache.http.HttpEntity entity = response.getEntity();response.getEntity();
   				if (entity != null) {
   					String bodyAsString = 	EntityUtils.toString(response.getEntity());
   					System.out.println("Response content: " + bodyAsString);
   					jobject=JSONObject.parseObject(bodyAsString);
   				}
   			} finally {
   				response.close();
   			}
   		} catch (ClientProtocolException e) {
   			e.printStackTrace();
   		} catch (UnsupportedEncodingException e1) {
   			e1.printStackTrace();
   		} catch (IOException e) {
   			e.printStackTrace();
   		} finally {
   			// 关闭连接,释放资源  
   			try {
   				httpclient.close();
   			} catch (IOException e) {
   				e.printStackTrace();
   			}
   		}    
        System.out.println(jobject);		
    
	}
}

package com.example.weixin.plugins;


import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import com.example.weixin.constants.RemoteUrlConstant;


//测试自定义插件
public class MyCordovaPlugin extends CordovaPlugin {
	public static final String ACTION_CALL = "call";  
	public static final String ACTION_BACK = "back";  
	public static final String ACTION_HTTP_POST = "httpPost"; 
	public static final String ACTION_HTTP_REGIST = "regist";
	
    public static final String POST_URL = "http://"+RemoteUrlConstant.REMOTE_ACTION_IP+":"+RemoteUrlConstant.REMOTE_ACTION_PORT+"/user/listjson";
    public static final String REJIST_URL = "http://"+RemoteUrlConstant.REMOTE_ACTION_IP+":"+RemoteUrlConstant.REMOTE_ACTION_PORT+"/user/regist";

	 @Override  
     public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {  
         if (action.equals(ACTION_CALL)) {
        	 return  call( args,  callbackContext);
        }else if(action.equals(ACTION_HTTP_POST)){
        	 return  httpPost(args,  callbackContext);
        } else if(action.equals(ACTION_BACK)){
        	System.out.println("退出APP");
        	System.exit(0);
        } else if(action.equals(ACTION_HTTP_REGIST)){
        	try {
				regist(args.getString(0), args.getString(1), args.getString(2));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        }  
        return true;  
     } 
	 
	 private boolean httpPost(JSONArray args, CallbackContext callbackContext) {
		 try {
     		String re =readContentFromPost();
     		PluginResult mPlugin = new PluginResult(PluginResult.Status.NO_RESULT);  
             mPlugin.setKeepCallback(true);  
             callbackContext.sendPluginResult(mPlugin);  
             callbackContext.success(re);  
			} catch (Exception e) {
				callbackContext.success("调用失败:"+e);
             return false;  
			}
		return true;
	}
	 
	private boolean call(JSONArray args, CallbackContext callbackContext) {
		 try {    
      	   System.out.println("测试自定义插件");
      	   System.out.println("MyCordovaPlugin args:"+args);
              //下面三句为cordova插件回调页面的逻辑代码  
      	    if("1".equals(args.getString(0)) && "1".equals(args.getString(1))){
      	    	PluginResult mPlugin = new PluginResult(PluginResult.Status.NO_RESULT);  
                  mPlugin.setKeepCallback(true);  
                  callbackContext.sendPluginResult(mPlugin);  
                  callbackContext.success("调用成功,入参为1,1");  
                  return true;  
      	    }else{
      	    	callbackContext.success("调用失败,入参为"+args.getString(0)+","+args.getString(1));
      	    	return false;  
      	    }
       } catch (Exception e) {    
      	callbackContext.success("调用失败,入参为"+args);
          return false;  
      }  
	}
	
	public static String readContentFromPost() throws IOException {
	        // Post请求的url，与get不同的是不需要带参数
	       URL postUrl = new URL(POST_URL);
	        // 打开连接
	       HttpURLConnection connection = (HttpURLConnection) postUrl
	                .openConnection();
	       connection.setDoOutput(true);
	       connection.setDoInput(true);
	       connection.setRequestMethod("POST");
	       connection.setUseCaches(false);
	       connection.setInstanceFollowRedirects(true);
	       connection.setRequestProperty("Content-Type",
	                "application/x-www-form-urlencoded");
	       connection.connect();
	        DataOutputStream out = new DataOutputStream(connection
	                .getOutputStream());
	       String content = "firstname=" + URLEncoder.encode("一个大肥人", "utf-8");
	       out.writeBytes(content); 
	       out.flush();
	       out.close(); // flush and close
	       BufferedReader reader = new BufferedReader(new InputStreamReader(
	                connection.getInputStream()));
	        String lineEnd="";
	        String line="";
	        System.out.println("=============================");
	        System.out.println("Contents of post request");
	        System.out.println("=============================");
	        while ((line = reader.readLine()) != null) {
	            System.out.println(line);
	            lineEnd+=line;
	        }
	        System.out.println("=============================");
	        System.out.println("Contents of post request ends");
	        System.out.println("=============================");
	        reader.close();
	        connection.disconnect();
			return lineEnd;
	    }
	 
	 public static String regist(String email,String passWord,String name) throws IOException {
	        // Post请求的url，与get不同的是不需要带参数
	       URL postUrl = new URL(REJIST_URL);
	        // 打开连接
	       HttpURLConnection connection = (HttpURLConnection) postUrl
	                .openConnection();
	       connection.setDoOutput(true);
	       connection.setDoInput(true);
	       connection.setRequestMethod("POST");
	       connection.setUseCaches(false);
	       connection.setInstanceFollowRedirects(true);
	       connection.setRequestProperty("Content-Type",
	                "application/x-www-form-urlencoded");
	       connection.connect();
	        DataOutputStream out = new DataOutputStream(connection
	                .getOutputStream());
	       String content = "email=" + URLEncoder.encode(email, "utf-8")+"&"+
	    		   			"passWord=" + URLEncoder.encode(passWord, "utf-8")+"&"+
	    		   			"name=" + URLEncoder.encode(name, "utf-8");
	       out.writeBytes(content); 
	       out.flush();
	       out.close(); // flush and close
	       BufferedReader reader = new BufferedReader(new InputStreamReader(
	                connection.getInputStream()));
	        String lineEnd="";
	        String line="";
	        System.out.println("=============================");
	        System.out.println("Contents of post request");
	        System.out.println("=============================");
	        while ((line = reader.readLine()) != null) {
	            System.out.println(line);
	            lineEnd+=line;
	        }
	        System.out.println("=============================");
	        System.out.println("Contents of post request ends");
	        System.out.println("=============================");
	        reader.close();
	        connection.disconnect();
			return lineEnd;
	    }
}


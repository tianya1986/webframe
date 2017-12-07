package com.nd.common;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;


public class TimeUtils {

    public static Timestamp getCurrentTime() {
        Date date = new Date();
        return new Timestamp(date.getTime());
    }

    public static Date getDateByFormat(String time){
        Date date=null;
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            date = sdf.parse(time);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return  date;
    }
    
    public static int getTime(String user_time) {  
    	int re_time = 0;  
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");  
    	Date d;  
    	try {  
    	  
    	  
    	d = sdf.parse(user_time);  
    	long l = d.getTime();  
    	re_time=(int)(l/1000);
    
    	  
    	} catch (Exception e) {  
    	// TODO Auto-generated catch block  
    	e.printStackTrace();  
    	}  
    	return re_time;
    	}  
}

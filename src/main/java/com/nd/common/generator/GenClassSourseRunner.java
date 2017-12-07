package com.nd.common.generator;

/**
 * 
 * 项目名字:appbuilder
 * 类名称:GenClassSourseRunner
 * 类描述: 代码生成器
 * 创建人:涂清平
 * 创建时间:
 * 修改人:
 * 修改时间:
 * 修改备注:
 * @version
 */
public class GenClassSourseRunner {
	
	public static void main(String args[]){
		//生成Bean BeamExample BeanMapper.xml
		PaginationPlugin.generate();  
		
		//生成IService Service DAO Controller
		 TempBuilder.generate("mysql");
	}

}

package ${package.value}.service.impl;

import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import ${package.value}.dao.${bean.value}Dao;
import ${package.value}.dto.${bean.value};
import ${package.value}.dto.${bean.value}Example;
import ${package.value}.dto.${bean.value}Example.Criteria;
import ${package.value}.service.I${bean.value}Service;
import com.nd.common.util.ObjectUtils;
import com.nd.common.util.Page;
import com.nd.common.util.StringUtils;
<#if  bean.upload!="">
import org.springframework.web.multipart.MultipartFile;
</#if>


/**
 * 类名称:${bean.value}Service
 * 类描述:${bean.name}
 * 创建人:${creater.value}
 * 创建时间:${_now}
 * @version
 */
@Service
public class ${bean.value}Service implements I${bean.value}Service {
	
	@Resource
	${bean.value}Dao ${bean.value?uncap_first}Dao;
	
	@Override
	public boolean insert(${bean.value} record) {
		boolean flag = false;		
		int i = ${bean.value?uncap_first}Dao.insert(record);
		if(i>0){
			flag = true;
		}
		return flag;
	}

	@Override
	public boolean delete(Integer id) {
		boolean flag = false;
		if(ObjectUtils.isNotEmpty(id)){
			if(${bean.value?uncap_first}Dao.deleteByPrimaryKey(id)>0){
				flag = true;
			}
		}
		return flag;
	}

	@Override
	public List<${bean.value}> getList(${bean.value}Example example) {
		return ${bean.value?uncap_first}Dao.selectByExample(example);
	}

	@Override
	public boolean update(${bean.value} record) {
		boolean  flag = false;
		if(ObjectUtils.isNotEmpty(record.getId())){
			if(${bean.value?uncap_first}Dao.updateByPrimaryKey(record)>0){
				flag = true;
			}
		}
		return flag;
	}
	@Override
	public boolean updateByPrimaryKeySelective(${bean.value} record) {
		boolean  flag = false;
		if(ObjectUtils.isNotEmpty(record.getId())){
			if(${bean.value?uncap_first}Dao.updateByPrimaryKeySelective(record)>0){
				flag = true;
			}
		}
		return flag;
	}
	@Override
	public ${bean.value} getById(Integer id) {
		return ${bean.value?uncap_first}Dao.selectByPrimaryKey(id);
	}

	@Override
	public int countByExample(${bean.value}Example example) {
		return ${bean.value?uncap_first}Dao.countByExample(example);
	}
	
	<#if  bean.upload=="upload">
	@Override
	public String upload(MultipartFile file){
	
		return "";
	}
	<#elseif  bean.upload=="uploadForm">
	@Override
	public String upload(MultipartFile file,${bean.value} ${bean.value?uncap_first}){
		return "";
	}
	</#if>
	
	}

package ${package.value}.service;

import java.util.List;
import ${package.value}.dto.${bean.value};
import ${package.value}.dto.${bean.value}Example;
import com.nd.common.util.Page;
<#if  bean.upload!="">
import org.springframework.web.multipart.MultipartFile;
</#if>

/**
 * 类名称:I${bean.value}Service<br/>
 * 类描述:${bean.name}<br/>
 * 创建人:${creater.value}<br/>
 * 创建时间:${_now}<br/>
 * @version
 */
public interface I${bean.value}Service {
	
	/**
	 * 保存记录
	 * @param record
	 * @return
	 */
	public boolean insert(${bean.value} record);
	/**
	 * 删除记录
	 * @param id
	 * @return
	 */
	public boolean delete(Integer id);
	/**
	 * 获取${bean.name}类型
	 * @param example
	 * @return
	 */
	public List<${bean.value}> getList(${bean.value}Example example);
	/**
	 * 更新
	 * @param record
	 * @return
	 */
	public boolean update(${bean.value} record);
	/**
	 * 更新
	 * @param record
	 * @return
	 */
	public boolean updateByPrimaryKeySelective(${bean.value} record);
	/**
	 * 获取记录
	 * @param id
	 * @return
	 */
	public ${bean.value} getById(Integer id);
	/**
	 * 统计数量
	 * @param ${bean.value} record
	 * @return
	 */
	int countByExample(${bean.value}Example example);
	
	<#if  bean.upload=="upload">
	String upload(MultipartFile file);
	<#elseif  bean.upload=="uploadForm">
	String upload(MultipartFile file,${bean.value} ${bean.value?uncap_first});
	</#if>
	
}

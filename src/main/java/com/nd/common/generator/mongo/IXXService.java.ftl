package ${package.value}.service;

import ${package.value}.dto.${bean.value};
import java.util.List;
import com.nd.common.util.Page;

/**
 * 类名称:I${bean.value}Service
 * 类描述:${bean.name}
 * 创建人:${creater.value}
 * 创建时间:${_now}
 * @version
 */
public interface I${bean.value}Service {
	
	/**
	 * 保存内容 
	 * @param record
	 * @return mongodb ID
	 */
	public String insert(${bean.value} record);
	/**
	 * 根据mongoDB ID 获取记录
	 * @param id
	 * @return ${bean.value}
	 */
	public ${bean.value} getById(String id);
	
	/**
	 * 修改内容
	 * @param record
	 * @return 是否成功
	 */
	public boolean updateById(${bean.value} record);
	
	/**
	 * 根据ID删除内容
	 * @param id
	 * @return 是否成功
	 */
	public boolean deleteById(String id);
	/**
	 * 查询
	 * @param page 分页信息
	 * @return 返回查询结果
	 */
	public List<${bean.value}> getList(${bean.value} record,Page page);
	
}


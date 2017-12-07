package ${package.value}.service.impl;

import javax.annotation.Resource;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import com.google.code.morphia.Key;
import com.google.code.morphia.mapping.Mapper;
import com.google.code.morphia.query.Query;
import com.google.code.morphia.query.UpdateOperations;
import com.google.code.morphia.query.UpdateResults;
import com.mongodb.WriteResult;
import ${package.value}.dao.${bean.value}Dao;
import ${package.value}.dto.${bean.value};
import ${package.value}.service.I${bean.value}Service;
import com.nd.common.util.ObjectUtils;
import java.util.List;
import com.nd.common.util.Page;

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
	public String insert(${bean.value} record) {
		String _id = null;//mongodb记录id
		if(ObjectUtils.isNotEmpty(record)){
			Key<${bean.value}> key = ${bean.value?uncap_first}Dao.save(record);		
			if(ObjectUtils.isNotEmpty(key.getId())){
				//存储成功获取返回的mongodb记录id
				_id = key.getId().toString();
			}
		}
		return _id;
	}
	
	@Override
	public ${bean.value} getById(String id) {
		//String ID转换为mongodb主键ObjectId new ObjectId(id)
		return ${bean.value?uncap_first}Dao.get(new ObjectId(id));
	}

	@Override
	public boolean updateById(${bean.value} record) {
		//根据ID创建查询query
		Query<${bean.value}> query = ${bean.value?uncap_first}Dao.createQuery().field(Mapper.ID_KEY).equal(record.getOid());		
		UpdateOperations<${bean.value}> coursewareOps = ${bean.value?uncap_first}Dao.createUpdateOperations();
		//设置更新内容
		/*if(StringUtils.isNotEmpty(record.getContext()))
			coursewareOps.set("context", record.getContext());
		//更新内容
		*/
		UpdateResults<${bean.value}> results =  ${bean.value?uncap_first}Dao.updateFirst(query, coursewareOps);	
		return !results.getHadError();
	}
	@Override
	public boolean deleteById(String id) {
		boolean flag = false;
		WriteResult result = null;
		try{
			//判断是否存在此记录
			if(${bean.value?uncap_first}Dao.exists(Mapper.ID_KEY, new ObjectId(id))){
				//根据ID删除记录 
				result = ${bean.value?uncap_first}Dao.deleteById(new ObjectId(id));
				if(ObjectUtils.isNotEmpty(result)){
					flag = result.isUpdateOfExisting();
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return flag;
	}
	/**
	 * 查询
	 * @return 结果
	 */
	public List<${bean.value}> getList(${bean.value} record,Page page){

        Query<${bean.value}> q = ${bean.value?uncap_first}Dao.createQuery();
        //q.order("order_column");
        List<${bean.value}> list=q.offset((page.getPage()-1)*page.getRows()).limit(page.getRows()).asList();
		return list;
	}
}

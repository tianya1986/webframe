package ${package.value}.dao;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import com.google.code.morphia.Datastore;
import com.google.code.morphia.dao.BasicDAO;
import ${package.value}.dto.${bean.value};
/**
 * 类描述:${bean.name}
 * 创建人:${creater.value}
 * 创建时间:${_now}
 * @version
 */
@Repository(value="${bean.value?uncap_first}")
public class ${bean.value}Dao extends BasicDAO<${bean.value}, ObjectId> {
		@Autowired
		protected ${bean.value}Dao(@Qualifier("datastore") Datastore ds) {
			super(ds);
		}

	}
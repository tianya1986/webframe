package com.nd.common;

import org.bson.types.ObjectId;

import com.google.code.morphia.annotations.Id;

public abstract class BaseEntity {
	@Id
	private ObjectId oid;
	
	public ObjectId getOid() {
		return oid;
	}

	public void setOid(ObjectId oid) {
		this.oid = oid;
	}
	
//	public String get_id(){
//		return oid.toStringMongod();
//	}
	
}

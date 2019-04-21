package pt.systemChurch.criteria;

import javax.persistence.EntityManager;

import pt.systemChurch.entity.MembroGcEntity;
import pt.systemChurch.repository.MembroGcRepository;

public class MembroGcCriteria {
	
	
	
	public static Boolean salvarMembroGc(MembroGcEntity membroGc,EntityManager manager) {

		try {
	
			manager.persist(membroGc);	
			
			return Boolean.TRUE;
			
		} catch (Exception e) {
			return Boolean.FALSE;
		}
	
		
		
		
	}

}

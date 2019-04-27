package pt.systemChurch.service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pt.systemChurch.base.BaseService;
import pt.systemChurch.criteria.MembroGcCriteria;
import pt.systemChurch.entity.MembroEntity;
import pt.systemChurch.entity.MembroGcEntity;
import pt.systemChurch.repository.MembroGcRepository;

@Service
@Transactional
public class MembroGcService  extends BaseService<MembroGcEntity, MembroGcRepository>{
	
	
	@PersistenceContext
	private EntityManager entityManager;
	
	@Autowired
	MembroGcRepository membroGcRepository;
	
	
	public Boolean salvarMembroGc(MembroGcEntity membroGc) {

		return MembroGcCriteria.salvarMembroGc(membroGc, this.entityManager);
	}

}

package pt.systemChurch.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;

import pt.systemChurch.base.BaseService;
import pt.systemChurch.criteria.GcCriteria;
import pt.systemChurch.entity.GcEntity;
import pt.systemChurch.repository.GcRepository;

public class GcService extends BaseService<GcEntity, GcRepository> {

	@Autowired
	GcRepository gcRepository;
	
	@PersistenceContext
	private EntityManager entityManager;

	public GcEntity salvarGc(GcEntity gc) {
		return this.gcRepository.save(gc);
	}
	
	public List<GcEntity> pesquisaGc(GcEntity gc) {
		return GcCriteria.pesquisaGc(gc, this.entityManager);
	}
	
}

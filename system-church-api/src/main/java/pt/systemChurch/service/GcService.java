package pt.systemChurch.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pt.systemChurch.base.BaseService;
import pt.systemChurch.criteria.GcCriteria;
import pt.systemChurch.criteria.MembroCriteria;
import pt.systemChurch.dto.ResponseGcDto;
import pt.systemChurch.dto.ResponsePesquisaMembroDto;
import pt.systemChurch.entity.GcEntity;
import pt.systemChurch.repository.GcRepository;

@Service
@Transactional
public class GcService extends BaseService<GcEntity, GcRepository> {

	@Autowired
	GcRepository gcRepository;

	@PersistenceContext
	private EntityManager entityManager;

	public boolean salvarGc(GcEntity gc) {
		return GcCriteria.salvarGc(gc, entityManager);
	}
		public List<ResponseGcDto> pesquisarGc(){
		return GcCriteria.pesquisarGcs(this.entityManager);
	}
}

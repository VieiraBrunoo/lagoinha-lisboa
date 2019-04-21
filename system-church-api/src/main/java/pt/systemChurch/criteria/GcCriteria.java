package pt.systemChurch.criteria;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import pt.systemChurch.entity.GcEntity;
import pt.systemChurch.entity.MembroEntity;
import pt.systemChurch.entity.MembroGcEntity;
import org.springframework.stereotype.Repository;

import pt.systemChurch.dto.ResponseGcDto;
import pt.systemChurch.entity.GcEntity;
import pt.systemChurch.entity.MembroEntity;
import pt.systemChurch.entity.MembroGcEntity;

@Repository
public class GcCriteria {

	public static List<ResponseGcDto> pesquisarGcs(EntityManager entityManager) {

		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<GcEntity> criteriaQuery = criteriaBuilder.createQuery(GcEntity.class);
		Root<GcEntity> gcRoot = criteriaQuery.from(GcEntity.class);
		Join<GcEntity, MembroGcEntity> joinMembro = gcRoot.join("membrosGc",JoinType.INNER);
		criteriaQuery.distinct(true);
		criteriaQuery = criteriaQuery.select(gcRoot);
		TypedQuery<GcEntity> query = entityManager.createQuery(criteriaQuery);
		List<GcEntity> resultQuery = query.getResultList();

		List<ResponseGcDto> listGc = new ArrayList<ResponseGcDto>();

		for (GcEntity gc : resultQuery) {
			ResponseGcDto gcs = new ResponseGcDto();
			gcs.setId(gc.getId());
			gcs.setNome(gc.getNome());
			gcs.setEndereco(gc.getLogradouro());
		for(MembroGcEntity m : gc.getMembrosGc()) {	
				if(m.getMembro().getFlagLiderGc().equalsIgnoreCase("S"))
					gcs.setIdLider(m.getMembro().getId());
			}
			listGc.add(gcs);
		}

		return listGc;
	}

	public static boolean salvarGc(GcEntity gc, EntityManager entityManager) {
		try {
			entityManager.persist(gc);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public static ResponseGcDto pesquisarGcPorId(long id, EntityManager entityManager)
			throws UnsupportedEncodingException {
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<GcEntity> criteriaQuery = criteriaBuilder.createQuery(GcEntity.class);
		Root<GcEntity> gcRoot = criteriaQuery.from(GcEntity.class);
		Join<MembroEntity, MembroGcEntity> joinMembro = gcRoot.join("membrosGc", JoinType.LEFT);
		List<Predicate> predicates = new ArrayList<Predicate>();
		criteriaQuery.distinct(true);

		if (id != 0) {
			predicates.add(criteriaBuilder.equal(gcRoot.get("id"), id));
		}

		if (predicates.size() > 0) {
			criteriaQuery.select(gcRoot).where(predicates.toArray(new Predicate[] {}));
		} else {
			criteriaQuery = criteriaQuery.select(gcRoot);

		}
		TypedQuery<GcEntity> query = entityManager.createQuery(criteriaQuery);
		List<GcEntity> resultQuery = query.getResultList();
		ResponseGcDto gc = new ResponseGcDto();

		for (GcEntity gcs : resultQuery) {

			gc.setId(gcs.getId());
			gc.setNome(gcs.getNome());
			gc.setDiaSemana(gcs.getDiaSemana());
			gc.setEndereco(gcs.getLogradouro());
			gc.setZona(gcs.getZona());
			for (MembroGcEntity membroGc : gcs.getMembrosGc()) {
				gc.getMembrosGc().add(membroGc.getMembro());
			}
		}
		return gc;

	}
}

package pt.systemChurch.criteria;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Repository;

import pt.systemChurch.dto.ResponseGcDto;
import pt.systemChurch.entity.GcEntity;
import pt.systemChurch.entity.MembroEntity;

@Repository
public class GcCriteria {
	
	
	public static List<ResponseGcDto> pesquisarGcs(EntityManager entityManager) {

		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<GcEntity> criteriaQuery = criteriaBuilder.createQuery(GcEntity.class);
		Root<GcEntity> gcRoot = criteriaQuery.from(GcEntity.class);
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
			gcs.setIdLider(gc.getMembroResponsavel().getId());
			listGc.add(gcs);
		}

		return listGc;
	}

}

package pt.systemChurch.criteria;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Root;
import pt.systemChurch.entity.GcEntity;
import pt.systemChurch.entity.MembroEntity;
import pt.systemChurch.entity.MembroGcEntity;

import org.springframework.stereotype.Repository;
import pt.systemChurch.dto.ResponseGcDto;

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

	
	public static boolean salvarGc(GcEntity gc,EntityManager entityManager) {
		 try {
			 entityManager.persist(gc);
			 return true;
		} catch (Exception e) {
			 return false;
	}
	 }
}

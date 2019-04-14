package pt.systemChurch.criteria;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.repository.JpaRepository;

import pt.systemChurch.entity.GcEntity;

public interface GcCriteria extends JpaRepository<GcEntity, Long>{

	
	static List<GcEntity> pesquisaGc(GcEntity gc, EntityManager entityManager) {

		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<GcEntity> criteriaQuery = criteriaBuilder.createQuery(GcEntity.class);
		Root<GcEntity> gcRoot = criteriaQuery.from(GcEntity.class);
		List<Predicate> predicates = new ArrayList<Predicate>();
		criteriaQuery.distinct(true);

		if (!gc.getNome().isEmpty() && gc.getNome() != null) {
			predicates.add(criteriaBuilder.like(gcRoot.get("nome"), "%" + gc.getNome() + "%"));
		}

		if (!gc.getZona().isEmpty() && gc.getZona() != null) {
			predicates.add(criteriaBuilder.equal(gcRoot.get("zona"), gc.getZona()));
		}

		if (!gc.getDiaSemana().isEmpty() && gc.getDiaSemana() != null) {
			predicates.add(criteriaBuilder.equal(gcRoot.get("dia_semana"), gc.getDiaSemana()));
		}
		
		if (!gc.getLogradouro().isEmpty() && gc.getLogradouro() != null) {
			predicates.add(criteriaBuilder.like(gcRoot.get("logradouro"), "%" + gc.getLogradouro() + "%"));
		}
		
		if (!gc.getMembroResponsavel().equals(null)) {
			predicates.add(criteriaBuilder.equal(gcRoot.get("id_membro_responsavel"), gc.getMembroResponsavel().getId()));
		}

		if (predicates.size() > 0) {
			criteriaQuery.select(gcRoot).where(predicates.toArray(new Predicate[] {}));
		} else {
			criteriaQuery = criteriaQuery.select(gcRoot);

		}
		TypedQuery<GcEntity> query = entityManager.createQuery(criteriaQuery);
		List<GcEntity> resultQuery = query.getResultList();

		List<GcEntity> gcs = new ArrayList<GcEntity>();

		for (GcEntity gcEntity : resultQuery) {
			GcEntity gce = new GcEntity();

			gce.setId(gcEntity.getId());
			gce.setNome(gcEntity.getNome());
			gce.setDiaSemana(gce.getDiaSemana());
			gce.setLogradouro(gcEntity.getLogradouro());
			gce.setZona(gcEntity.getZona());
			gce.setMembroResponsavel(gcEntity.getMembroResponsavel());
			
			gcs.add(gce);

		}

		return gcs;
	}
}

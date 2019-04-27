package pt.systemChurch.criteria;

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

import pt.systemChurch.dto.RequestGcDto;
import pt.systemChurch.dto.ResponseGcDto;
import pt.systemChurch.dto.ResponsePesquisaMembroDto;

@Repository
public class GcCriteria {
	
	
	public static List<ResponseGcDto> pesquisarGcs(EntityManager entityManager) {

		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<GcEntity> criteriaQuery = criteriaBuilder.createQuery(GcEntity.class);
		Root<GcEntity> gcRoot = criteriaQuery.from(GcEntity.class);
		Join<GcEntity, MembroGcEntity> joinMembro = gcRoot.join("membrosGc",JoinType.LEFT);
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
			gcs.setHorario(gc.getHorario());
			gcs.setZona(gc.getZona());
			for(MembroGcEntity m : gc.getMembrosGc()) {	
				if(m.getMembro().getFlagLiderGc().equalsIgnoreCase("S"))
					gcs.setIdLider(m.getMembro().getId());
					gcs.setNomeLider(m.getMembro().getNome());
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



	public static List<ResponseGcDto> pesquisaDetalhadaGc(RequestGcDto gc,EntityManager entityManager) {

		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<GcEntity> criteriaQuery = criteriaBuilder.createQuery(GcEntity.class);
		Root<GcEntity> gcRoot = criteriaQuery.from(GcEntity.class);
		Join<GcEntity, MembroGcEntity> joinMembro = gcRoot.join("membrosGc",JoinType.LEFT);
		List<Predicate> predicates = new ArrayList<Predicate>();
		criteriaQuery.distinct(true);
		
		if (!gc.getNomeGc().isEmpty() && gc.getNomeGc()!= null) {
			predicates.add(criteriaBuilder.like(gcRoot.get("nome"), "%" + gc.getNomeGc() + "%"));
		}

		if (!gc.getZona().isEmpty() && gc.getZona()!= null) {
			predicates.add(criteriaBuilder.equal(gcRoot.get("zona"), gc.getZona()));
		}

		if (!gc.getHorario().isEmpty() && gc.getHorario() != null) {
			predicates.add(criteriaBuilder.equal(gcRoot.get("horario"), gc.getHorario()));
		}

		if (gc.getIdLider()!= 0) {
			predicates.add(criteriaBuilder.equal(joinMembro.get("membro").get("id"), gc.getIdLider()));
		}
				
		criteriaQuery = criteriaQuery.select(gcRoot);
		TypedQuery<GcEntity> query = entityManager.createQuery(criteriaQuery);
		List<GcEntity> resultQuery = query.getResultList();

		List<ResponseGcDto> listGc = new ArrayList<ResponseGcDto>();

		for (GcEntity g : resultQuery) {
			ResponseGcDto gcs = new ResponseGcDto();
			ResponsePesquisaMembroDto mem = new ResponsePesquisaMembroDto();
			gcs.setId(g.getId());
			gcs.setNome(g.getNome());
			gcs.setEndereco(g.getLogradouro());
			gcs.setHorario(g.getHorario());
			gcs.setZona(g.getZona());
			for(MembroGcEntity m : g.getMembrosGc()) {	
				if(m.getMembro().getFlagLiderGc().equalsIgnoreCase("S")) {
					gcs.setIdLider(m.getMembro().getId());
					gcs.setNomeLider(m.getMembro().getNome());
				} 		
				}
			listGc.add(gcs);
		}

		return listGc;
	}

	public static ResponseGcDto DetalharGc(long idGc,EntityManager entityManager) {

		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<GcEntity> criteriaQuery = criteriaBuilder.createQuery(GcEntity.class);
		Root<GcEntity> gcRoot = criteriaQuery.from(GcEntity.class);
		Join<GcEntity, MembroGcEntity> joinMembro = gcRoot.join("membrosGc",JoinType.LEFT);
		List<Predicate> predicates = new ArrayList<Predicate>();
		criteriaQuery.distinct(true);
				
		predicates.add(criteriaBuilder.equal(gcRoot.get("id"),idGc));
		
				
		criteriaQuery = criteriaQuery.select(gcRoot);
		TypedQuery<GcEntity> query = entityManager.createQuery(criteriaQuery);
		List<GcEntity> resultQuery = query.getResultList();

		List<ResponsePesquisaMembroDto> membros = new ArrayList<ResponsePesquisaMembroDto>();

		ResponseGcDto gcs = new ResponseGcDto();
		int i =1;
		for (GcEntity g : resultQuery) {
			gcs.setId(g.getId());
			gcs.setNome(g.getNome());
			gcs.setEndereco(g.getLogradouro());
			gcs.setHorario(g.getHorario());
			gcs.setZona(g.getZona());
			gcs.setDiaSemana(g.getDiaSemana());
			for(MembroGcEntity m : g.getMembrosGc()) {	
			ResponsePesquisaMembroDto mem = new ResponsePesquisaMembroDto();
				if(m.getMembro().getFlagLiderGc().equalsIgnoreCase("S")) {
					gcs.setIdLider(m.getMembro().getId());
					gcs.setNomeLider(m.getMembro().getNome());
				}
			
				else {
					mem.setPosicao(i);
					mem.setNomeMembro(m.getMembro().getNome());
					mem.setCelular(MembroCriteria.formatarNumeroCelular(m.getMembro().getCelular()));
					mem.setDataCadastro(m.getMembro().getDtCadastro());
					membros.add(mem);
					i++;
					}
				
					if(membros.size() > 0) {
						gcs.setMembros(membros);
					}
						
			}
		}

		return gcs;
	}



	
	


}

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
import org.springframework.stereotype.Repository;

import pt.systemChurch.dto.RequestPesquisaMembroDto;
import pt.systemChurch.dto.ResponsePesquisaMembroDetalhadoDto;
import pt.systemChurch.dto.ResponsePesquisaMembroDto;
import pt.systemChurch.entity.MembroEntity;

@Repository
public interface MembroCriteria extends JpaRepository<MembroEntity, Long> {

	static List<ResponsePesquisaMembroDto> pesquisarMembro(RequestPesquisaMembroDto dto, EntityManager entityManager) {

		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<MembroEntity> criteriaQuery = criteriaBuilder.createQuery(MembroEntity.class);
		Root<MembroEntity> membroRoot = criteriaQuery.from(MembroEntity.class);
		List<Predicate> predicates = new ArrayList<Predicate>();
		criteriaQuery.distinct(true);

		if (!dto.getNomeMembro().isEmpty() && dto.getNomeMembro()!= null) {
			predicates.add(criteriaBuilder.like(membroRoot.get("nome"), "%" + dto.getNomeMembro() + "%"));
		}

		if (!dto.getEstadoCivil().isEmpty() && dto.getEstadoCivil() != null) {
			predicates.add(criteriaBuilder.equal(membroRoot.get("estadoCivil"), dto.getEstadoCivil()));
		}

		if (!dto.getSexo().isEmpty() && dto.getSexo() != null) {
			predicates.add(criteriaBuilder.equal(membroRoot.get("sexo"), dto.getSexo()));
		}
		
		if (!dto.getZona().isEmpty() && dto.getZona() != null) {
			predicates.add(criteriaBuilder.equal(membroRoot.get("zona"), dto.getZona()));
		}
	
		
		if (predicates.size() > 0) {
			criteriaQuery.select(membroRoot).where(predicates.toArray(new Predicate[] {}));
		} else {
			criteriaQuery = criteriaQuery.select(membroRoot);

		}
		TypedQuery<MembroEntity> query = entityManager.createQuery(criteriaQuery);
		List<MembroEntity> resultQuery = query.getResultList();

		List<ResponsePesquisaMembroDto> membros = new ArrayList<ResponsePesquisaMembroDto>();
		
		for (MembroEntity membro : resultQuery) {
			ResponsePesquisaMembroDto mem = new ResponsePesquisaMembroDto();
			
			mem.setIdMembro(membro.getId());
			mem.setNomeMembro(membro.getNome());
			mem.setIdGc(membro.getGc().getId());
			mem.setNomeGc(membro.getGc().getNome());
			mem.setEstadoCivil(membro.getEstadoCivil());
			mem.setMorada(membro.getEnderecoResidencial() + " - " + membro.getZona());
			mem.setSexo(membro.getSexo());
	
			membros.add(mem);

		}

		return membros;
	}

	
	
	static List<ResponsePesquisaMembroDetalhadoDto> pesquisarMembroDetalhado(RequestPesquisaMembroDto dto, EntityManager entityManager) {

		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<MembroEntity> criteriaQuery = criteriaBuilder.createQuery(MembroEntity.class);
		Root<MembroEntity> membroRoot = criteriaQuery.from(MembroEntity.class);
		List<Predicate> predicates = new ArrayList<Predicate>();
		criteriaQuery.distinct(true);

		if (!dto.getNomeMembro().isEmpty() && dto.getNomeMembro()!= null) {
			predicates.add(criteriaBuilder.like(membroRoot.get("nome"), "%" + dto.getNomeMembro() + "%"));
		}

		if (!dto.getEstadoCivil().isEmpty() && dto.getEstadoCivil() != null) {
			predicates.add(criteriaBuilder.equal(membroRoot.get("estadoCivil"), dto.getEstadoCivil()));
		}

		if (!dto.getSexo().isEmpty() && dto.getSexo() != null) {
			predicates.add(criteriaBuilder.equal(membroRoot.get("sexo"), dto.getSexo()));
		}
		
		if (!dto.getZona().isEmpty() && dto.getZona() != null) {
			predicates.add(criteriaBuilder.equal(membroRoot.get("zona"), dto.getZona()));
		}
	
		
		if (predicates.size() > 0) {
			criteriaQuery.select(membroRoot).where(predicates.toArray(new Predicate[] {}));
		} else {
			criteriaQuery = criteriaQuery.select(membroRoot);

		}
		TypedQuery<MembroEntity> query = entityManager.createQuery(criteriaQuery);
		List<MembroEntity> resultQuery = query.getResultList();

		List<ResponsePesquisaMembroDetalhadoDto> membros = new ArrayList<ResponsePesquisaMembroDetalhadoDto>();
		
		for (MembroEntity membro : resultQuery) {
			ResponsePesquisaMembroDetalhadoDto mem = new ResponsePesquisaMembroDetalhadoDto();
			
			mem.setIdMembro(membro.getId());
			mem.setNomeMembro(membro.getNome());
			mem.setIdGc(membro.getGc().getId());
			mem.setNomeGc(membro.getGc().getNome());
			mem.setEstadoCivil(membro.getEstadoCivil());
			mem.setMorada(membro.getEnderecoResidencial() + " - " + membro.getZona());
			mem.setSexo(membro.getSexo());
			if(membro.getFotoPerfil() != null ) {
			mem.setImgPerfil(membro.getFotoPerfil());	
			}
			mem.setPais(membro.getPais());
			mem.setQtdFilhos(membro.getQtdFilhos());
			mem.setNomePai(membro.getNomePai());
			mem.setNomeMae(membro.getNomeMae());
			if(membro.getNomeConjuge() != null) {
			mem.setNomeConjuge(membro.getNomeConjuge());
			}
			if(membro.getDtCasamento() != null) {
			mem.setDtCasamento(membro.getDtCasamento());
			}
			if(membro.getEmail() != null) {
			mem.setEmail(membro.getEmail());
			}
			mem.setNrDoc(membro.getNrDocumento());
			if(membro.getDtBatismo() != null) {
			mem.setDtBatismo(membro.getDtBatismo());
			}
			mem.setNacionalidade(membro.getNacionalidade());
			membros.add(mem);

		}

		return membros;
	}

	
	
	
	
	
	
}

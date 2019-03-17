package pt.systemChurch.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pt.systemChurch.base.BaseService;
import pt.systemChurch.criteria.MembroCriteria;
import pt.systemChurch.dto.RequestPesquisaMembroDto;
import pt.systemChurch.dto.ResponsePesquisaMembroDetalhadoDto;
import pt.systemChurch.dto.ResponsePesquisaMembroDto;
import pt.systemChurch.entity.MembroEntity;
import pt.systemChurch.repository.MembroRepository;

@Service
@Transactional
public class MembroService extends BaseService<MembroEntity, MembroRepository>  {
	

	@PersistenceContext
	private EntityManager entityManager;
	
	@Autowired
	MembroRepository membroRepository;

	
	public MembroEntity salvarMembro(MembroEntity membro) {

		return this.membroRepository.save(membro);
	}

	
	public List<ResponsePesquisaMembroDto> pesquisarMembro(RequestPesquisaMembroDto dto) {

		return MembroCriteria.pesquisarMembro(dto, this.entityManager);
	}
	
	
	public List<ResponsePesquisaMembroDetalhadoDto> pesquisarMembroDetalhado(RequestPesquisaMembroDto dto) {

		return MembroCriteria.pesquisarMembroDetalhado(dto, this.entityManager);
	}
	

}

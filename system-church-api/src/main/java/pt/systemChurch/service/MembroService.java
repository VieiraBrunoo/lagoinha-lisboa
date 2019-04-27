package pt.systemChurch.service;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import pt.systemChurch.base.BaseService;
import pt.systemChurch.criteria.MembroCriteria;
import pt.systemChurch.dto.RequestPesquisaMembroDto;
import pt.systemChurch.dto.ResponsePesquisaMembroDetalhadoDto;
import pt.systemChurch.dto.ResponsePesquisaMembroDto;
import pt.systemChurch.entity.MembroEntity;
import pt.systemChurch.repository.GcRepository;
import pt.systemChurch.repository.MembroRepository;

@Service
@Transactional
public class MembroService extends BaseService<MembroEntity, MembroRepository>  {
	

	@PersistenceContext
	private EntityManager entityManager;
	
	@Autowired
	MembroRepository membroRepository;
	
	@Autowired
	GcRepository gcRepository;
	
    @Autowired
    private MembroGcService membroGcService;
	

	
	public MembroEntity salvarMembro(MembroEntity membro) {

		return this.membroRepository.save(membro);
	}

	
	public List<ResponsePesquisaMembroDto> pesquisarMembro(RequestPesquisaMembroDto dto) {

		return MembroCriteria.pesquisarMembro(dto, this.entityManager);
	}
	
	
	public List<ResponsePesquisaMembroDetalhadoDto> pesquisarMembroDetalhado(RequestPesquisaMembroDto dto) {

		return MembroCriteria.pesquisarMembroDetalhado(dto, this.entityManager);
	}
	
	
	public ResponsePesquisaMembroDetalhadoDto pesquisarMembroPorId(long id) throws UnsupportedEncodingException {
		return MembroCriteria.pesquisarMembroPorId(id, this.entityManager);
		
		
	}
	
	public Integer cadastrarMembro(MembroEntity membro) {
		return MembroCriteria.salvarMembro(membro, this.entityManager,this.membroRepository,this.gcRepository,this.membroGcService);
		
	}
	
	
	public boolean atualizarMembro(MembroEntity membro) {
		return MembroCriteria.atualizarMembro(membro, this.entityManager);
		
	}
	
	
	public String ativarDesativarMembro(long id, String status) {

		return MembroCriteria.ativarDesativarMembro(id, status, this.entityManager, this.membroRepository);
	}
	
	public boolean verificarMembro(String nrDoc) {
		return MembroCriteria.verificarMembroCadastrado(nrDoc, entityManager,membroRepository);
		
	}

	public List<ResponsePesquisaMembroDto> pesquisarMembro(){
		return MembroCriteria.pesquisarMembrosLideresGc(this.entityManager);
	}
}

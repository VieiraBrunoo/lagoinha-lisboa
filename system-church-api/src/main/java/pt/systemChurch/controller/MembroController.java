package pt.systemChurch.controller;

import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import pt.systemChurch.base.BaseController;
import pt.systemChurch.dto.RequestPesquisaMembroDto;
import pt.systemChurch.dto.ResponsePesquisaMembroDetalhadoDto;
import pt.systemChurch.dto.ResponsePesquisaMembroDto;
import pt.systemChurch.entity.GcEntity;
import pt.systemChurch.entity.MembroEntity;
import pt.systemChurch.repository.MembroRepository;
import pt.systemChurch.service.MembroService;

@RestController
@RequestMapping(path="lagoinha-api/membro",produces = {MediaType.APPLICATION_JSON_VALUE })
public class MembroController extends BaseController<MembroEntity, MembroService> {

	@Autowired
	private MembroRepository membroRepository;
	
	
	@CrossOrigin
	@PostMapping(value = "/salvarMembro/")
	public ResponseEntity<MembroEntity> save(
			@RequestPart("fotoPerfil") MultipartFile foto,
			@RequestPart("membro") MembroEntity membro)
		 {

		try {
			byte[] arrayFoto = foto.getBytes();
			membro.setFotoPerfil(arrayFoto);
			GcEntity gc = new GcEntity();
			gc.setId(membro.getGc().getId());
			membro.setGc(gc);
			MembroEntity retorno = membroRepository.save(membro);
			return ResponseEntity.ok(retorno);
			}
		 catch (Exception ex) {
			String errorMessage;
			System.out.println(errorMessage = ex + " <== error");
			return new ResponseEntity(errorMessage, HttpStatus.BAD_REQUEST);
		}
	}
	
	@CrossOrigin
	@PostMapping(value = "/pesquisarMembros")
	public List<ResponsePesquisaMembroDto> pesquisarMembro(@RequestBody RequestPesquisaMembroDto requestMembroDto) {
		List<ResponsePesquisaMembroDto> list = this.getService().pesquisarMembro(requestMembroDto);
		return list;
	}
	
	
	@CrossOrigin
	@PostMapping(value = "/pesquisarMembrosDetalhado")
	public List<ResponsePesquisaMembroDetalhadoDto> pesquisarMembroDetalhado(@RequestBody RequestPesquisaMembroDto requestMembroDto) {
		List<ResponsePesquisaMembroDetalhadoDto> list = this.getService().pesquisarMembroDetalhado(requestMembroDto);
		return list;
	}
	
	@CrossOrigin
	@RequestMapping(value="/findAllMembro/")
	public Iterable<MembroEntity> findAllMembro(){
	return membroRepository.findAll();
	}
	
	@CrossOrigin
	@RequestMapping(value="/findByMembroId/{id}")
	public MembroEntity findByIdMembro(@PathVariable("id") long id){
		MembroEntity m = membroRepository.findById(id);
		return m;
	}
	
}

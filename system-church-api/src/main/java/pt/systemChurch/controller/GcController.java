package pt.systemChurch.controller;

import java.io.UnsupportedEncodingException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import pt.systemChurch.base.BaseController;
import pt.systemChurch.dto.RequestGcDto;
import pt.systemChurch.dto.ResponseGcDto;
import pt.systemChurch.dto.ResponsePesquisaMembroDetalhadoDto;
import pt.systemChurch.entity.GcEntity;
import pt.systemChurch.entity.MembroEntity;
import pt.systemChurch.repository.GcRepository;
import pt.systemChurch.repository.MembroRepository;
import pt.systemChurch.service.GcService;

@RestController
@RequestMapping(path = "lagoinha-api/gc", produces = { MediaType.APPLICATION_JSON_VALUE })
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class GcController extends BaseController<GcEntity, GcService>{

	@Autowired
	private GcRepository gcRepository;
	
	@Autowired
	private MembroRepository membroRepository;
	
	
	@CrossOrigin
	@RequestMapping(value="/findAllGc/", method = RequestMethod.GET)
	public List<ResponseGcDto> findAllGc(){
		return this.getService().pesquisarGc();
	}
	
	@CrossOrigin
	@PostMapping(value = "/salvarGc/", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean saveGc(@RequestPart("gc") GcEntity gc){
		
		try {
		MembroEntity membroResponsavel = membroRepository.findById(gc.getIdMembroResponsavel());
			boolean retorno = this.getService().salvarGc(gc);
			return retorno;
			}
		 catch (Exception ex) {
			String errorMessage;
			System.out.println(errorMessage = ex + " <== error");
			return false;
		}
}
	
	@CrossOrigin
	@PostMapping(value = "/pesquisaGc")
	public List<ResponseGcDto> pesquisaGc(@RequestBody RequestGcDto gc) {
		List<ResponseGcDto> list = this.getService().pesquisaDetalhadaGc(gc);
		return list;
	}
	
	
	
	@CrossOrigin
	@RequestMapping(value = "/findByGcId/{id}", method = RequestMethod.GET)
	public ResponseGcDto findByIdGc(@PathVariable("id") long id)
			throws UnsupportedEncodingException {
		ResponseGcDto gc = this.getService().pesquisarGcPorId(id);

		return gc;
	}
	
	
	
	@CrossOrigin
	@RequestMapping(value = "/detalharGc/{idGc}", method = RequestMethod.GET)
	public ResponseGcDto detalharGc(@PathVariable("idGc") long idGc) {
		ResponseGcDto gc = this.getService().pesquisaDetalhadaGc(idGc);
		return gc;
	}
	
}
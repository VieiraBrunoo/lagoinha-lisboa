package pt.systemChurch.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import pt.systemChurch.base.BaseController;
import pt.systemChurch.dto.ResponseGcDto;
import pt.systemChurch.entity.GcEntity;
import pt.systemChurch.entity.MembroEntity;
import pt.systemChurch.repository.GcRepository;
import pt.systemChurch.repository.MembroRepository;
import pt.systemChurch.service.GcService;

@RestController
@RequestMapping("lagoinha-api/gc")
public class GcController extends BaseController<GcEntity, GcService> {
	
	
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
	@PostMapping(value = "/salvarGc/")
	public ResponseEntity<GcEntity> save(@RequestBody GcEntity gc){
		try {
			MembroEntity membroResponsavel = membroRepository.findById(gc.getIdMembroResponsavel());
			gc.setMembroResponsavel(membroResponsavel);
			GcEntity retorno = gcRepository.save(gc);
				return ResponseEntity.ok(retorno);
			}
		 catch (Exception ex) {
			String errorMessage;
			System.out.println(errorMessage = ex + " <== error");
			return new ResponseEntity(errorMessage, HttpStatus.BAD_REQUEST);
		}

}
}
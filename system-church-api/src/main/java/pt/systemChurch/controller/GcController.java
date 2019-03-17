package pt.systemChurch.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import pt.systemChurch.entity.GcEntity;
import pt.systemChurch.repository.GcRepository;
import pt.systemChurch.repository.MembroRepository;

@RestController
@RequestMapping("lagoinha-api/gc")
public class GcController {
	
	
	@Autowired
	private GcRepository gcRepository;
	
	@Autowired
	private MembroRepository membroRepository;
	
	
	@CrossOrigin
	@RequestMapping(value="/findAllGc/", method = RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public Iterable<GcEntity> findAllGc(){
	return gcRepository.findAll();
	}
	
	@CrossOrigin
	@PostMapping(value = "/salvarGc/")
	public ResponseEntity<GcEntity> save(@RequestBody GcEntity gc){
		try {
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
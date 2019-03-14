package pt.systemChurch.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import pt.systemChurch.entity.ParametroEntity;
import pt.systemChurch.repository.ParametroRepository;

@RestController
@RequestMapping("lagoinha-api/parametro")
public class ParametroController {

	@Autowired
	private ParametroRepository parametroRepository;
	
	
	@CrossOrigin
	@RequestMapping(value="/findByNomeConstante/{constante}", method = RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public Iterable<ParametroEntity> findByNomeConstante(@PathVariable("constante") String constante){
	return parametroRepository.findByNomeConstante(constante);
	}
	
}

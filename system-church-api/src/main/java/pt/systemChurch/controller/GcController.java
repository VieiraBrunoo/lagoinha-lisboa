package pt.systemChurch.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import pt.systemChurch.entity.GcEntity;
import pt.systemChurch.repository.GcRepository;

@RestController
@RequestMapping("lagoinha-api/gc")
public class GcController {
	
	
	@Autowired
	private GcRepository gcRepository;
	
	
	@CrossOrigin
	@RequestMapping(value="/findAllGc/", method = RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public Iterable<GcEntity> findAllGc(){
	return gcRepository.findAll();
	}
	

}

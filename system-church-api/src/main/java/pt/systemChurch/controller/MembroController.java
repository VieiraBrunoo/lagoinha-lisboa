package pt.systemChurch.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import pt.systemChurch.entity.MembroEntity;
import pt.systemChurch.repository.MembroRepository;
import pt.systemChurch.service.MembroService;

@RestController
@RequestMapping("lagoinha-api/membro")
public class MembroController {

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
			MembroEntity retorno = membroRepository.save(membro);
				return ResponseEntity.ok(retorno);
			}
		 catch (Exception ex) {
			String errorMessage;
			System.out.println(errorMessage = ex + " <== error");
			return new ResponseEntity(errorMessage, HttpStatus.BAD_REQUEST);
		}
	}
	
	
	
}

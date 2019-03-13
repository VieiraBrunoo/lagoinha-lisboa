package pt.systemChurch.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import pt.systemChurch.entity.UsuarioEntity;
import pt.systemChurch.repository.UsuarioRepository;

@RestController
@RequestMapping("lagoinha-api/usuario")
public class UsuarioController {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	
	@RequestMapping(value="/buscarPorId/{id}", method = RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public UsuarioEntity buscar(@PathVariable("id") long id){
 		return usuarioRepository.findById(id);
	}
	
	
	@CrossOrigin
	@RequestMapping(value="/autenticar/{login}/{senha}", method = RequestMethod.GET, produces=MediaType.APPLICATION_JSON_VALUE)
	public UsuarioEntity buscar(@PathVariable("login") String login,@PathVariable("senha") String senha){
		UsuarioEntity usu = new UsuarioEntity();
		usu=usuarioRepository.findByLoginAndSenha(login, senha);
		return usu;
	}
	

}

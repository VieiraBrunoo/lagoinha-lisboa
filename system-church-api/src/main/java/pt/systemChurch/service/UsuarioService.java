package pt.systemChurch.service;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import pt.systemChurch.base.BaseService;
import pt.systemChurch.entity.UsuarioEntity;
import pt.systemChurch.repository.UsuarioRepository;

@Service
@Transactional
public class UsuarioService extends BaseService<UsuarioEntity,UsuarioRepository>{

	
	


}

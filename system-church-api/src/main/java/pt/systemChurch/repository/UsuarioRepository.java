package pt.systemChurch.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pt.systemChurch.entity.UsuarioEntity;

public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long>  {
	
	
	UsuarioEntity findById(long id);
	UsuarioEntity findByLoginAndSenha(String login,String senha);
}

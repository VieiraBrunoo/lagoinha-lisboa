package pt.systemChurch.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pt.systemChurch.entity.ParametroEntity;
import java.lang.String;
import java.util.List;



public interface ParametroRepository extends JpaRepository<ParametroEntity, Long> {
	
	List<ParametroEntity> findByNomeConstante(String constante);

}

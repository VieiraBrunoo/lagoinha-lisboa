package pt.systemChurch.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;

import pt.systemChurch.entity.MembroEntity;

public interface MembroRepository extends JpaRepository<MembroEntity, Long> {
	
		MembroEntity findById(long id);
		
}

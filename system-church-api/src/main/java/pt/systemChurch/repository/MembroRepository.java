package pt.systemChurch.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pt.systemChurch.entity.MembroEntity;

public interface MembroRepository extends JpaRepository<MembroEntity, Long> {
	

}

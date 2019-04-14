package pt.systemChurch.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import pt.systemChurch.entity.GcEntity;

public interface GcRepository extends JpaRepository<GcEntity, Long>{
	
	List<GcEntity> findAll();
	GcEntity findById(long id);

}

package pt.systemChurch.service;

import org.springframework.beans.factory.annotation.Autowired;

import pt.systemChurch.base.BaseService;
import pt.systemChurch.entity.GcEntity;
import pt.systemChurch.repository.GcRepository;

public class GcService extends BaseService<GcEntity, GcRepository> {

	@Autowired
	GcRepository gcRepository;

	public GcEntity salvarGc(GcEntity gc) {
		return this.gcRepository.save(gc);
	}
	
}

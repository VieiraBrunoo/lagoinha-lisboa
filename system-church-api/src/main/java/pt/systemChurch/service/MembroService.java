package pt.systemChurch.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pt.systemChurch.base.BaseService;
import pt.systemChurch.entity.MembroEntity;
import pt.systemChurch.repository.MembroRepository;

@Service
@Transactional
public class MembroService extends BaseService<MembroEntity, MembroRepository>  {
	

	@Autowired
	MembroRepository membroRepository;

	
	public MembroEntity salvarMembro(MembroEntity membro) {

		return this.membroRepository.save(membro);
	}

	
	
	
	

}

package pt.systemChurch.base;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;


public class BaseService<Entity, Repository extends JpaRepository<Entity, Long>>{

    private static final Logger LOGGER = LoggerFactory.getLogger(BaseService.class);

    @Autowired
    private Repository repository;

    public Iterable<Entity> findAll() {
        return repository.findAll();
    }

    public Entity findById(Long id) {
		Optional<Entity> entity = repository.findById(id);
        if (entity.isPresent()) {
            return entity.get();
        }
        return null;
    }

    public Entity save(Entity entity) throws Exception {
        try {
            return repository.save(entity);
        } catch (Exception e) {
            LOGGER.error("Falhar salvar", e.getCause());
            throw new Exception("Falha ao salvar o item.");
        }
    }

    public List<Entity> save(Iterable<Entity> entities) throws Exception {
        try {
            return repository.saveAll(entities);
        } catch (Exception e) {
            LOGGER.error("Falhar salvar", e.getCause());
            throw new Exception("Falha ao salvar os items.");
        }
    }

    public Entity update(Entity entity) throws Exception {
        try {
            return repository.save(entity);
        } catch (Exception e) {
            LOGGER.error("Falhar atualizar", e.getCause());
            throw new Exception("Falha ao atualizar o item.");
        }
    }

    public List<Entity> update(Iterable<Entity> entities) throws Exception {
        try {
            return repository.saveAll(entities);
        } catch (Exception e) {
            LOGGER.error("Falhar atualizar", e.getCause());
            throw new Exception("Falha ao atualizar os items.");
        }
    }

    public void delete(Long id) throws Exception {
        try {
            repository.deleteById(id);
        } catch (Exception e) {
            LOGGER.error("Falhar remover", e.getCause());
            throw new Exception("Falha ao remover o item.");
        }
    }

    public void delete(Iterable<Entity> entities) throws Exception {
        try {
            repository.deleteAll(entities);
        } catch (Exception e) {
            LOGGER.error("Falhar remover", e.getCause());
            throw new Exception("Falha ao remover os items.");
        }
    }

    public Repository getRepository() {
        return repository;
    }

    public Long count() {
        return this.getRepository().count();
    }
}

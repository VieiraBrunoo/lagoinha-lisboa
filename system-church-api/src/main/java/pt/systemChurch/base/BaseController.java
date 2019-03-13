package pt.systemChurch.base;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@SuppressWarnings("rawtypes")
public abstract class BaseController<Entity, Service extends BaseService> {

	@Autowired
	private Service service;
	
    @SuppressWarnings("unchecked")
	@RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Iterable<Entity>> findAll() { return ResponseEntity.ok(service.findAll()); }

    @SuppressWarnings("unchecked")
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
    public ResponseEntity<Entity> findById(@PathVariable(value = "id") Long id) { return ResponseEntity.ok((Entity)service.findById(id)); }

    @SuppressWarnings("unchecked")
	@RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Entity> save(@RequestBody Entity entity) throws Exception {return ResponseEntity.ok( (Entity)service.save(entity)); }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable(value = "id") Long id) throws Exception { service.delete(id); }

    public Service getService(){
        return service;
    }
}

package pt.systemChurch.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "MEMBRO_GC")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class MembroGcEntity {

	
	@Id
	@Column(name = "ID_MEMBRO_GC")
	private long id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="ID_MEMBRO")
	private MembroEntity membro;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="ID_GC")
	private GcEntity gc;
		
	
	public MembroGcEntity() {
		// TODO Auto-generated constructor stub
	}

	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public MembroEntity getMembro() {
		return membro;
	}

	public void setMembro(MembroEntity membro) {
		this.membro = membro;
	}

	public GcEntity getGc() {
		return gc;
	}

	public void setGc(GcEntity gc) {
		this.gc = gc;
	}

		
	
	
	
	
}

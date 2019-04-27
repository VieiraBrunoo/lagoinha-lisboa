package pt.systemChurch.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "GC")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class GcEntity {
	
	@Id
	@Column(name = "ID_GC")
	private long id;
		
	@Column(name = "NOME")
	private String nome;

	@Column(name = "DIA_SEMANA")
	private String diaSemana;
	
	@Column(name = "LOGRADOURO")
	@NotNull
	private String logradouro;
	
	@Column(name = "ZONA")
	@NotNull
	private String zona;
	
	@Transient
	private long idMembroResponsavel;
	 /*
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ID_MEMBRO_RESPONSAVEL")
	private MembroEntity membroResponsavel; */ 

	@OneToMany(mappedBy = "gc", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<MembroGcEntity> membrosGc;
	
	@Column(name="HORARIO")
	private String horario;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDiaSemana() {
		return diaSemana;
	}

	public void setDiaSemana(String diaSemana) {
		this.diaSemana = diaSemana;
	}

	public String getLogradouro() {
		return logradouro;
	}

	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}

	public String getZona() {
		return zona;
	}

	public void setZona(String zona) {
		this.zona = zona;
	}

	/*
	public MembroEntity getMembroResponsavel() {
		return membroResponsavel;
	}

	public void setMembroResponsavel(MembroEntity membroResponsavel) {
		this.membroResponsavel = membroResponsavel;
	} */

	public List<MembroGcEntity> getMembrosGc() {
		return membrosGc;
	}

	public void setMembrosGc(List<MembroGcEntity> membrosGc) {
		this.membrosGc = membrosGc;
	}

	public long getIdMembroResponsavel() {
		return idMembroResponsavel;
	}

	public void setIdMembroResponsavel(long idMembroResponsavel) {
		this.idMembroResponsavel = idMembroResponsavel;
	}

	public String getHorario() {
		return horario;
	}

	public void setHorario(String horario) {
		this.horario = horario;
	}
	
	
	

}
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

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "GC")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class GcEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ID_GC")
	private long id;
		
	@Column(name = "NOME")
	private String nome;

	@Column(name = "DIA_SEMANA")
	private String diaSemana;
	
	@Column(name = "LOGRADOURO")
	@NotNull
	private String enderecoResidencial;
	
	@Column(name = "ZONA")
	@NotNull
	private String zona;
	
	@Transient
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ID_MEMBRO_RESPONSAVEL")
	private MembroEntity membroResponsavel;

	@Transient
	@OneToMany(mappedBy = "gc", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<MembroEntity> membrosGc;
	

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

	public String getEnderecoResidencial() {
		return enderecoResidencial;
	}

	public void setEnderecoResidencial(String enderecoResidencial) {
		this.enderecoResidencial = enderecoResidencial;
	}

	public String getZona() {
		return zona;
	}

	public void setZona(String zona) {
		this.zona = zona;
	}

	
	public MembroEntity getMembroResponsavel() {
		return membroResponsavel;
	}

	public void setMembroResponsavel(MembroEntity membroResponsavel) {
		this.membroResponsavel = membroResponsavel;
	}

	public List<MembroEntity> getMembrosGc() {
		return membrosGc;
	}

	public void setMembrosGc(List<MembroEntity> membrosGc) {
		this.membrosGc = membrosGc;
	}
	
	
	

}
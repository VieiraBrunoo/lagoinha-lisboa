package pt.systemChurch.dto;

import java.util.List;

import pt.systemChurch.entity.MembroEntity;
import pt.systemChurch.entity.MembroGcEntity;

public class ResponseGcDto {

	
	private long id;
	private String nome;
	private String diaSemana;
	private String endereco;
	private String horario;
	private String zona;
	private List<MembroEntity> membrosGc;
	public List<MembroEntity> getMembrosGc() {
		return membrosGc;
	}
	public void setMembrosGc(List<MembroEntity> membrosGc) {
		this.membrosGc = membrosGc;
	}
	public String getZona() {
		return zona;
	}
	public void setZona(String zona) {
		this.zona = zona;
	}
	private long idLider;
	
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
	public String getEndereco() {
		return endereco;
	}
	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}
	public String getHorario() {
		return horario;
	}
	public void setHorario(String horario) {
		this.horario = horario;
	}
	public long getIdLider() {
		return idLider;
	}
	public void setIdLider(long idLider) {
		this.idLider = idLider;
	}
	
	
	
	
	
}

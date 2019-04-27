package pt.systemChurch.dto;

import java.util.List;

public class ResponseGcDto {

	
	private long id;
	private String nome;
	private String diaSemana;
	private String endereco;
	private String horario;
	private long idLider;
	private String zona;
	private String nomeLider;
	private List<ResponsePesquisaMembroDto> membros;
	
	
	
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
	public String getZona() {
		return zona;
	}
	public void setZona(String zona) {
		this.zona = zona;
	}
	public String getNomeLider() {
		return nomeLider;
	}
	public void setNomeLider(String nomeLider) {
		this.nomeLider = nomeLider;
	}
	public List<ResponsePesquisaMembroDto> getMembros() {
		return membros;
	}
	public void setMembros(List<ResponsePesquisaMembroDto> membros) {
		this.membros = membros;
	}
	
	
	
	
	
}

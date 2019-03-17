package pt.systemChurch.dto;

public class ResponsePesquisaMembroDto {

	
	private long idMembro;
	private	String nomeMembro;
	private long idGc;
	private String nomeGc;
	private String sexo;
	private String estadoCivil;
	private String morada;
	private String status;
	
	
	public long getIdMembro() {
		return idMembro;
	}
	public void setIdMembro(long idMembro) {
		this.idMembro = idMembro;
	}
	public String getNomeMembro() {
		return nomeMembro;
	}
	public void setNomeMembro(String nomeMembro) {
		this.nomeMembro = nomeMembro;
	}
	public long getIdGc() {
		return idGc;
	}
	public void setIdGc(long idGc) {
		this.idGc = idGc;
	}
	public String getNomeGc() {
		return nomeGc;
	}
	public void setNomeGc(String nomeGc) {
		this.nomeGc = nomeGc;
	}
	public String getSexo() {
		return sexo;
	}
	public void setSexo(String sexo) {
		this.sexo = sexo;
	}
	public String getEstadoCivil() {
		return estadoCivil;
	}
	public void setEstadoCivil(String estadoCivil) {
		this.estadoCivil = estadoCivil;
	}
	public String getMorada() {
		return morada;
	}
	public void setMorada(String morada) {
		this.morada = morada;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
}

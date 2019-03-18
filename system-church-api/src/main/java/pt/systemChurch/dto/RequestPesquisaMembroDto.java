package pt.systemChurch.dto;

public class RequestPesquisaMembroDto {
	
	
	private String nomeMembro;
	private String sexo;
	private String estadoCivil;
	private String zona;
	private String status;
	private String flagLiderGc;
	private String funcaoMembro;
	
	public String getNomeMembro() {
		return nomeMembro;
	}
	public void setNomeMembro(String nomeMembro) {
		this.nomeMembro = nomeMembro;
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
	public String getZona() {
		return zona;
	}
	public void setZona(String zona) {
		this.zona = zona;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getFlagLiderGc() {
		return flagLiderGc;
	}
	public void setFlagLiderGc(String flagLiderGc) {
		this.flagLiderGc = flagLiderGc;
	}
	public String getFuncaoMembro() {
		return funcaoMembro;
	}
	public void setFuncaoMembro(String funcaoMembro) {
		this.funcaoMembro = funcaoMembro;
	}
	
	

}

package pt.systemChurch.entity;

import java.sql.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "MEMBRO")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class MembroEntity{
	
	
	@Id
	@Column(name = "ID_MEMBRO")
	private long id;
	
	@Column(name = "NOME")
	@NotNull
	private String nome;
	
	@Column(name = "NUMERO_DOCUMENTO")
	@NotNull
	private String nrDocumento;	
	
	@Column(name = "DATA_VALIDADE_DOCUMENTO")
	private Date dtValidadeDoc;
	
	@Column(name = "NACIONALIDADE")
	private String nacionalidade;

	@Column(name = "SEXO")
	@NotNull
	private String sexo;
	
	@Column(name = "LOGRADOURO")
	@NotNull
	private String enderecoResidencial;
	
	@Column(name = "ZONA")
	@NotNull
	private String zona;
	
	@Column(name = "CIDADE")
	@NotNull
	private String cidade;
	
	@Column(name = "PAIS")
	@NotNull
	private String pais;
	
	@Column(name = "EMAIL")
	private String email;
	
	@Column(name = "FOTO")
	private byte[] fotoPerfil;
	
	@Column(name = "NOME_PAI")
	private String nomePai;
	
	@Column(name = "NOME_MAE")
	private String nomeMae;
	
	@Column(name = "ESTADO_CIVIL")
	@NotNull
	private String estadoCivil;
	
	@Column(name = "NOME_CONJUGE")
	private String nomeConjuge;

	@Column(name = "DATA_CASAMENTO")
	private Date dtCasamento;
	
	@Column(name = "QTD_FILHOS")
	private Integer qtdFilhos;
	
	@Column(name = "DATA_BATISMO")
	private Date dtBatismo;
	
	@Column(name = "IGREJA_BATISMO")
	private String igrejaBatismo;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "GC")
	private GcEntity gc;

	@Column(name = "CELULAR")
	private String celular;
	
	@Column(name = "FLAG_LIDER_GC")
	private String flagLiderGc;
	
	@Column(name = "STATUS")
	@NotNull
	private String status;
	
	
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

	public String getNrDocumento() {
		return nrDocumento;
	}

	public void setNrDocumento(String nrDocumento) {
		this.nrDocumento = nrDocumento;
	}

	public Date getDtValidadeDoc() {
		return dtValidadeDoc;
	}

	public void setDtValidadeDoc(Date dtValidadeDoc) {
		this.dtValidadeDoc = dtValidadeDoc;
	}

	public String getNacionalidade() {
		return nacionalidade;
	}

	public void setNacionalidade(String nacionalidade) {
		this.nacionalidade = nacionalidade;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
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

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getPais() {
		return pais;
	}

	public void setPais(String pais) {
		this.pais = pais;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public byte[] getFotoPerfil() {
		return fotoPerfil;
	}

	public void setFotoPerfil(byte[] fotoPerfil) {
		this.fotoPerfil = fotoPerfil;
	}

	public String getNomePai() {
		return nomePai;
	}

	public void setNomePai(String nomePai) {
		this.nomePai = nomePai;
	}

	public String getNomeMae() {
		return nomeMae;
	}

	public void setNomeMae(String nomeMae) {
		this.nomeMae = nomeMae;
	}

	public String getEstadoCivil() {
		return estadoCivil;
	}

	public void setEstadoCivil(String estadoCivil) {
		this.estadoCivil = estadoCivil;
	}

	public String getNomeConjuge() {
		return nomeConjuge;
	}

	public void setNomeConjuge(String nomeConjuge) {
		this.nomeConjuge = nomeConjuge;
	}

	public Date getDtCasamento() {
		return dtCasamento;
	}

	public void setDtCasamento(Date dtCasamento) {
		this.dtCasamento = dtCasamento;
	}

	public Integer getQtdFilhos() {
		return qtdFilhos;
	}

	public void setQtdFilhos(Integer qtdFilhos) {
		this.qtdFilhos = qtdFilhos;
	}

	public Date getDtBatismo() {
		return dtBatismo;
	}

	public void setDtBatismo(Date dtBatismo) {
		this.dtBatismo = dtBatismo;
	}

	public String getIgrejaBatismo() {
		return igrejaBatismo;
	}

	public void setIgrejaBatismo(String igrejaBatismo) {
		this.igrejaBatismo = igrejaBatismo;
	}

	public GcEntity getGc() {
		return gc;
	}

	public void setGc(GcEntity gc) {
		this.gc = gc;
	}

	public String getCelular() {
		return celular;
	}

	public void setCelular(String celular) {
		this.celular = celular;
	}

	public String getFlagLiderGc() {
		return flagLiderGc;
	}

	public void setFlagLiderGc(String flagLiderGc) {
		this.flagLiderGc = flagLiderGc;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
	

}

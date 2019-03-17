package pt.systemChurch.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "PARAMETROS")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ParametroEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "ID_PARAMETRO")
	private long id;

	@Column(name = "PARAMETRO_CONSTANTE")
	@NotNull
	private String nomeConstante;

	@Column(name = "DESCRICAO_PARAMETRO")
	@NotNull
	private String descricao;

	@Column(name = "SIGLA_PARAMETRO")
	@NotNull
	private String sigla;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNomeConstante() {
		return nomeConstante;
	}

	public void setNomeConstante(String nomeConstante) {
		this.nomeConstante = nomeConstante;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getSigla() {
		return sigla;
	}

	public void setSigla(String sigla) {
		this.sigla = sigla;
	}

}

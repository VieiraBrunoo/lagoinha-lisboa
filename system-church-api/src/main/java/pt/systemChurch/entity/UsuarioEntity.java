package pt.systemChurch.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="USUARIOS")
public class UsuarioEntity {
	
	@Id
	@GeneratedValue(strategy= GenerationType.AUTO)
	@Column(name="ID_USUARIO")
	private long id;
	
	
	@Column(name="LOGIN")
	@NotNull
	private String login;
	
	@Column(name="SENHA")
	@NotNull
	private String  senha;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	
	
	
}

package pt.systemChurch.criteria;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.swing.text.MaskFormatter;

import org.apache.logging.log4j.message.StringFormattedMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pt.systemChurch.dto.RequestPesquisaMembroDto;
import pt.systemChurch.dto.ResponsePesquisaMembroDetalhadoDto;
import pt.systemChurch.dto.ResponsePesquisaMembroDto;
import pt.systemChurch.entity.GcEntity;
import pt.systemChurch.entity.MembroEntity;

@Repository
public interface MembroCriteria extends JpaRepository<MembroEntity, Long> {

	static List<ResponsePesquisaMembroDto> pesquisarMembro(RequestPesquisaMembroDto dto, EntityManager entityManager) {

		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<MembroEntity> criteriaQuery = criteriaBuilder.createQuery(MembroEntity.class);
		Root<MembroEntity> membroRoot = criteriaQuery.from(MembroEntity.class);
		List<Predicate> predicates = new ArrayList<Predicate>();
		criteriaQuery.distinct(true);

		if (!dto.getNomeMembro().isEmpty() && dto.getNomeMembro() != null) {
			predicates.add(criteriaBuilder.like(membroRoot.get("nome"), "%" + dto.getNomeMembro() + "%"));
		}

		if (!dto.getEstadoCivil().isEmpty() && dto.getEstadoCivil() != null) {
			predicates.add(criteriaBuilder.equal(membroRoot.get("estadoCivil"), dto.getEstadoCivil()));
		}

		if (!dto.getSexo().isEmpty() && dto.getSexo() != null) {
			predicates.add(criteriaBuilder.equal(membroRoot.get("sexo"), dto.getSexo()));
		}

		if (!dto.getZona().isEmpty() && dto.getZona() != null) {
			predicates.add(criteriaBuilder.equal(membroRoot.get("zona"), dto.getFlagLiderGc()));
		}

		if (!dto.getStatus().isEmpty() && dto.getStatus() != null) {
			predicates.add(criteriaBuilder.equal(membroRoot.get("status"), dto.getStatus()));
		}

		if (!dto.getFlagLiderGc().isEmpty() && dto.getFlagLiderGc() != null) {
			predicates.add(criteriaBuilder.equal(membroRoot.get("flagLiderGc"), dto.getFlagLiderGc()));
		}

		if (predicates.size() > 0) {
			criteriaQuery.select(membroRoot).where(predicates.toArray(new Predicate[] {}));
		} else {
			criteriaQuery = criteriaQuery.select(membroRoot);

		}
		TypedQuery<MembroEntity> query = entityManager.createQuery(criteriaQuery);
		List<MembroEntity> resultQuery = query.getResultList();

		List<ResponsePesquisaMembroDto> membros = new ArrayList<ResponsePesquisaMembroDto>();

		for (MembroEntity membro : resultQuery) {
			ResponsePesquisaMembroDto mem = new ResponsePesquisaMembroDto();

			mem.setIdMembro(membro.getId());
			mem.setNomeMembro(membro.getNome());
			mem.setIdGc(membro.getGc().getId());
			if (membro.getFlagLiderGc() != null) {
				if (membro.getFlagLiderGc().equalsIgnoreCase("S")) {
					mem.setNomeGc("Líder - " + membro.getGc().getNome());
				}

			} else {
				mem.setNomeGc(membro.getGc().getNome());
			}
			mem.setEstadoCivil(descricaoEstadoCivil(membro.getEstadoCivil()));
			mem.setMorada(membro.getEnderecoResidencial() + " - " + membro.getZona());
			mem.setSexo(descricaoSexo(membro.getSexo()));
			mem.setStatus(membro.getStatus());

			membros.add(mem);

		}

		return membros;
	}

	static List<ResponsePesquisaMembroDetalhadoDto> pesquisarMembroDetalhado(RequestPesquisaMembroDto dto,
			EntityManager entityManager) {

		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<MembroEntity> criteriaQuery = criteriaBuilder.createQuery(MembroEntity.class);
		Root<MembroEntity> membroRoot = criteriaQuery.from(MembroEntity.class);
		List<Predicate> predicates = new ArrayList<Predicate>();
		criteriaQuery.distinct(true);

		if (!dto.getNomeMembro().isEmpty() && dto.getNomeMembro() != null) {
			predicates.add(criteriaBuilder.like(membroRoot.get("nome"), "%" + dto.getNomeMembro() + "%"));
		}

		if (!dto.getEstadoCivil().isEmpty() && dto.getEstadoCivil() != null) {
			predicates.add(criteriaBuilder.equal(membroRoot.get("estadoCivil"), dto.getEstadoCivil()));
		}

		if (!dto.getSexo().isEmpty() && dto.getSexo() != null) {
			predicates.add(criteriaBuilder.equal(membroRoot.get("sexo"), dto.getSexo()));
		}

		if (!dto.getZona().isEmpty() && dto.getZona() != null) {
			predicates.add(criteriaBuilder.equal(membroRoot.get("zona"), dto.getZona()));
		}

		if (!dto.getFuncaoMembro().isEmpty() && dto.getFuncaoMembro() != null) {
			predicates.add(criteriaBuilder.equal(membroRoot.get("funcaoMembro"), dto.getFuncaoMembro()));
		}
		
		if (!dto.getFlagLiderGc().isEmpty() && dto.getFlagLiderGc() != null) {
			predicates.add(criteriaBuilder.equal(membroRoot.get("flagLiderGc"), dto.getFlagLiderGc()));
		}


		if (predicates.size() > 0) {
			criteriaQuery.select(membroRoot).where(predicates.toArray(new Predicate[] {}));
		} else {
			criteriaQuery = criteriaQuery.select(membroRoot);

		}
		TypedQuery<MembroEntity> query = entityManager.createQuery(criteriaQuery);
		List<MembroEntity> resultQuery = query.getResultList();

		List<ResponsePesquisaMembroDetalhadoDto> membros = new ArrayList<ResponsePesquisaMembroDetalhadoDto>();

		for (MembroEntity membro : resultQuery) {
			ResponsePesquisaMembroDetalhadoDto mem = new ResponsePesquisaMembroDetalhadoDto();

			mem.setIdMembro(membro.getId());
			mem.setNomeMembro(membro.getNome());
			mem.setIdGc(membro.getGc().getId());
			if (membro.getFlagLiderGc() != null) {
				if (membro.getFlagLiderGc().equalsIgnoreCase("S")) {
					mem.setNomeGc("Líder - " + membro.getGc().getNome());
			}
			} else {
				mem.setNomeGc(membro.getGc().getNome());
			}
			mem.setEstadoCivil(descricaoEstadoCivil(membro.getEstadoCivil()));
			mem.setMorada(membro.getEnderecoResidencial() + " - " + membro.getZona());
			mem.setSexo(descricaoSexo(membro.getSexo()));
			if (membro.getFotoPerfil() != null) {
				mem.setImgPerfil(membro.getFotoPerfil());
			}
			mem.setPais(membro.getPais());
			mem.setQtdFilhos(membro.getQtdFilhos());
			mem.setNomePai(membro.getNomePai());
			mem.setNomeMae(membro.getNomeMae());
			if (membro.getNomeConjuge() != null) {
				mem.setNomeConjuge(membro.getNomeConjuge());
			}
			if (membro.getDtCasamento() != null) {
				mem.setDtCasamento(membro.getDtCasamento());
			}
			if (membro.getEmail() != null) {
				mem.setEmail(membro.getEmail());
			}
			mem.setNrDoc(membro.getNrDocumento());
			if (membro.getDtBatismo() != null) {
				mem.setDtBatismo(membro.getDtBatismo());
			}
			mem.setIgrejaBatismo(membro.getIgrejaBatismo());
			mem.setNacionalidade(membro.getNacionalidade());
			mem.setStatus(membro.getStatus());
			mem.setCelular(formatarNumeroCelular(membro.getCelular()));
			membros.add(mem);

		}

		return membros;
	}

	static String descricaoEstadoCivil(String sigla) {
		String retorno = null;
		switch (sigla) {
		case "CAS":
			retorno = "Casado";
			break;
		case "SOL":
			retorno = "Solteiro";
			break;
		case "DIV":
			retorno = "Divorciado";
			break;
		case "VIU":
			retorno = "Viúvo";
			break;

		default:
			break;
		}
		return retorno;

	}

	static String descricaoSexo(String sigla) {
		String retorno = null;
		switch (sigla) {
		case "MASC":
			retorno = "Masculino";
			break;
		case "FEM":
			retorno = "Feminino";
			break;

		default:
			break;
		}
		return retorno;

	}

	
	static String formatarNumeroCelular(String numero) {
		  String cel = formatString(numero,"### ### ###");
		return cel;

	}
	
	
	 static String formatString(String value, String pattern) {
        MaskFormatter mf;
        try {
            mf = new MaskFormatter(pattern);
            mf.setValueContainsLiteralCharacters(false);
            return mf.valueToString(value);
        } catch (ParseException ex) {
            return value;
        }
    }
	 
	 
	 
	 static MembroEntity pesquisarMembroPorId(long id, EntityManager entityManager) {
		 	CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
			CriteriaQuery<MembroEntity> criteriaQuery = criteriaBuilder.createQuery(MembroEntity.class);
			Root<MembroEntity> membroRoot = criteriaQuery.from(MembroEntity.class);
			List<Predicate> predicates = new ArrayList<Predicate>();
			criteriaQuery.distinct(true);

			if (id!= 0) {
				predicates.add(criteriaBuilder.equal(membroRoot.get("id"),id));
			}
			
			TypedQuery<MembroEntity> query = entityManager.createQuery(criteriaQuery);
			List<MembroEntity> resultQuery = query.getResultList();
			MembroEntity mem = new MembroEntity();


			for (MembroEntity membro : resultQuery) {

				mem.setId(membro.getId());
				mem.setNome(membro.getNome());
				mem.getGc().setId(membro.getGc().getId());
				if (membro.getFlagLiderGc() != null) {
					if (membro.getFlagLiderGc().equalsIgnoreCase("S")) {
						mem.getGc().setNome("Líder - " + membro.getGc().getNome());
				}
				} else {
					mem.getGc().setNome(membro.getGc().getNome());
				}
				mem.setEstadoCivil(descricaoEstadoCivil(membro.getEstadoCivil()));
				mem.setEnderecoResidencial(membro.getEnderecoResidencial() + " - " + membro.getZona());
				mem.setSexo(descricaoSexo(membro.getSexo()));
				if (membro.getFotoPerfil() != null) {
					mem.setFotoPerfil(membro.getFotoPerfil());
				}
				mem.setPais(membro.getPais());
				mem.setQtdFilhos(membro.getQtdFilhos());
				mem.setNomePai(membro.getNomePai());
				mem.setNomeMae(membro.getNomeMae());
				if (membro.getNomeConjuge() != null) {
					mem.setNomeConjuge(membro.getNomeConjuge());
				}
				if (membro.getDtCasamento() != null) {
					mem.setDtCasamento(membro.getDtCasamento());
				}
				if (membro.getEmail() != null) {
					mem.setEmail(membro.getEmail());
				}
				mem.setNrDocumento(membro.getNrDocumento());
				if (membro.getDtBatismo() != null) {
					mem.setDtBatismo(membro.getDtBatismo());
				}
				mem.setIgrejaBatismo(membro.getIgrejaBatismo());
				mem.setNacionalidade(membro.getNacionalidade());
				mem.setStatus(membro.getStatus());
				mem.setCelular(formatarNumeroCelular(membro.getCelular()));
				mem.setFlagLiderGc(membro.getFlagLiderGc());
				mem.setFuncaoMembro(membro.getFuncaoMembro());
				mem.setLevitaFuncao(membro.getLevitaFuncao());

			}
			return mem;

						

	 }
}

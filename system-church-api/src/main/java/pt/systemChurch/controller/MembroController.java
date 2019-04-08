package pt.systemChurch.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import pt.systemChurch.base.BaseController;
import pt.systemChurch.dto.RequestPesquisaMembroDto;
import pt.systemChurch.dto.ResponsePesquisaMembroDetalhadoDto;
import pt.systemChurch.dto.ResponsePesquisaMembroDto;
import pt.systemChurch.entity.GcEntity;
import pt.systemChurch.entity.MembroEntity;
import pt.systemChurch.repository.GcRepository;
import pt.systemChurch.repository.MembroRepository;
import pt.systemChurch.service.MembroService;

@RestController
@RequestMapping(path = "lagoinha-api/membro", produces = { MediaType.APPLICATION_JSON_VALUE })
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class MembroController extends BaseController<MembroEntity, MembroService> {

	@Autowired
	private MembroRepository membroRepository;

	@Autowired
	private GcRepository gcRepository;
	
    @Autowired private JavaMailSender mailSender;


	@CrossOrigin
	@PostMapping(value = "/salvarMembro/", produces = MediaType.APPLICATION_JSON_VALUE)
	public boolean save(@RequestPart("fotoPerfil") Optional<MultipartFile> arquivo,
			@RequestPart("membro") MembroEntity membro) {

		try {
				GcEntity gc = gcRepository.findById(membro.getIdGc());
				membro.setGc(gc);
				if(membro.getFlagLiderGc().equalsIgnoreCase("S") && gc.getMembroResponsavel().getId()!=0) {
				return false;
				}
				if (arquivo.isPresent()) {
					byte[] fotoBytes = arquivo.get().getBytes();
					membro.setFotoPerfil(fotoBytes);
				}
				boolean retorno = this.getService().cadastrarMembro(membro);
				return retorno;
		} catch (Exception ex) {
			String errorMessage;
			System.out.println(errorMessage = ex + " <== error");
			return false;
		}
	}

	@CrossOrigin
	@PostMapping(value = "/pesquisarMembros")
	public List<ResponsePesquisaMembroDto> pesquisarMembro(@RequestBody RequestPesquisaMembroDto requestMembroDto) {
		List<ResponsePesquisaMembroDto> list = this.getService().pesquisarMembro(requestMembroDto);
		return list;
	}

	@CrossOrigin
	@PostMapping(value = "/pesquisarMembrosDetalhado")
	public List<ResponsePesquisaMembroDetalhadoDto> pesquisarMembroDetalhado(
			@RequestBody RequestPesquisaMembroDto requestMembroDto) {
		List<ResponsePesquisaMembroDetalhadoDto> list = this.getService().pesquisarMembroDetalhado(requestMembroDto);
		return list;
	}

	@CrossOrigin
	@RequestMapping(value = "/findAllMembro/")
	public Iterable<MembroEntity> findAllMembro() {
		return membroRepository.findAll();
	}

	@CrossOrigin
	@RequestMapping(value = "/findByMembroId/{id}")
	public ResponsePesquisaMembroDetalhadoDto findByIdMembro(@PathVariable("id") long id)
			throws UnsupportedEncodingException {
		ResponsePesquisaMembroDetalhadoDto membro = this.getService().pesquisarMembroPorId(id);

		return membro;
	}

	@CrossOrigin
	@PostMapping(value = "/atualizarMembro/")
	public boolean atualizarMebro(@RequestPart("fotoPerfil") Optional<MultipartFile> arquivo,
			@RequestPart("membro") MembroEntity membro) throws IOException {
		try {
			GcEntity gc = gcRepository.findById(membro.getIdGc());
			membro.setGc(gc);
			if (arquivo.isPresent()) {
				byte[] fotoBytes = arquivo.get().getBytes();
				membro.setFotoPerfil(fotoBytes);
			}
			boolean retorno = this.getService().atualizarMembro(membro);
			return retorno;

		} catch (Exception e) {
			return false;
		}

	}
	
    @RequestMapping(path = "/email-send", method = RequestMethod.GET)
	 public String sendMail() {
	        try {
	            MimeMessage mail = mailSender.createMimeMessage();

	            MimeMessageHelper helper = new MimeMessageHelper(mail);
	            helper.setFrom("Igreja Lagoinha Lisboa <geral@lagoinhalisboa.pt>");
	            helper.setTo( "bruno.vieira@widescope.pt" );
	            helper.setSubject( "Teste Envio de e-mail" );
	            helper.setText("<p>Hello from Spring Boot Application</p>", true);
	            mailSender.send(mail);

	            return "OK";
	        } catch (Exception e) {
	            e.printStackTrace();
	            return "Erro ao enviar e-mail";
	        }
	    }
	
	
}

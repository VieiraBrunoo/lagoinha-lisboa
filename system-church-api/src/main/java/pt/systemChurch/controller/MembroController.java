package pt.systemChurch.controller;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.Transport;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.swing.ImageIcon;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
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
import pt.systemChurch.entity.MembroGcEntity;
import pt.systemChurch.repository.GcRepository;
import pt.systemChurch.repository.MembroRepository;
import pt.systemChurch.service.MembroGcService;
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
    
    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private MembroGcService membroGcService;

	@CrossOrigin
	@PostMapping(value = "/salvarMembro/", produces = MediaType.APPLICATION_JSON_VALUE)
	public String save(@RequestPart("fotoPerfil") Optional<MultipartFile> arquivo,
			@RequestPart("membro") MembroEntity membro) {
		String retorno =null;
		try {
				boolean membroExistente = this.getService().verificarMembro(membro.getNrDocumento());
				GcEntity gc = gcRepository.findById(membro.getIdGc());
			
				if(membroExistente) {
					retorno="NME";
					return retorno ;	
				}
				if (arquivo.isPresent()) {
					byte[] fotoBytes = arquivo.get().getBytes();
					membro.setFotoPerfil(fotoBytes);
				}
						
				 retorno = this.getService().cadastrarMembro(membro);
				 
				 if(membro.getEmail()!=null && !membro.getEmail().isEmpty()) {
				 enviarMail(membro.getEmail());
				 }
				 
				 if(membro.getIdGc()!= 0) {
					 MembroEntity m = membroRepository.findByNrDocumento(membro.getNrDocumento());
					 					 }
				 
				return retorno;
		} catch (Exception ex) {
			String errorMessage;
			System.out.println(errorMessage = ex + " <== error");
				return "NOK";
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
	
	 public Boolean enviarMail(String emailMembro) throws URISyntaxException {
    	    	   	
	        try {
	            MimeMessage message = emailSender.createMimeMessage();
	        	 MimeMessageHelper helper = new MimeMessageHelper(message,true);
	        	        //Enviar Arquivo Anexo
	                   /*  MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
	                     StandardCharsets.UTF_8.name());*/
	        	   helper.setTo(emailMembro);
		             helper.setFrom("Igreja Lagoinha Lisboa <geral@lagoinhalisboa.pt>");

	             helper.addAttachment("lagoinhai.png", new ClassPathResource("lagoinhai.png"));
	             helper.setSubject("PNG");
	             helper.setText("<html><body>TESTE ENVIO EMAIL COM FOTO<br>:<img src='cid:picture' /></body></html>",true);
	             
	             FileSystemResource file = new FileSystemResource(new File("src/main/resources/lagoinhai.png"));
	             helper.addInline("picture", file);
	          
	             emailSender.send(message);
	        	return Boolean.TRUE;
	        } catch (Exception e) {
	            e.printStackTrace();
	            return Boolean.FALSE;
	        }
	    }
    
    
    @RequestMapping(value = "/ativarDesativarMembro/{id}/{status}", method = RequestMethod.GET)
	public String ativarDesativarMembro(@PathVariable("id") long id,@PathVariable("status") String status) {
		 String retorno = getService().ativarDesativarMembro(id, status);
		 return retorno;
	}
	
	
}

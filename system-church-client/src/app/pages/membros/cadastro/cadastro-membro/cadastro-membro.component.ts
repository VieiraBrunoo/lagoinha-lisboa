import { AcaoService } from '../../../../service/acao/acao.service';
import { DocumentoService } from '../../../../service/documento/documento.service';
import { DocenteService } from '../../../../service/docente/docente.service';
import { Docente } from '../../../../models/docente';
import { DadosPessoaisComponent } from './../dados-pessoais/dados-pessoais.component';
import { Component, OnInit, ViewChild, QueryList } from '@angular/core';
import { DadosBatimosComponent } from '../dados-batismo/dados-batismo.component';
import { IdentityStorage } from 'src/app/auth/_models/identity.storage';
import { DadosGcComponent } from '../dados-gc/dados-gc.component';
import { MatStepper, MatTableDataSource, MatPaginator } from '@angular/material';
import { DadosFamiliaresComponent } from '../dados-familiares/dados-familiares.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Documento } from 'src/app/models/documento';
import { Membro } from 'src/app/models/membro';
import { MembroService } from 'src/app/service/membro/membro.service';
import { Gc } from 'src/app/models/gc-cadastro-membro';
import { runInThisContext } from 'vm';
import { ResponsePesquisaDetalhadoMembros } from 'src/app/models/response-pesquisa-detalhado-membro';
import { ToasterModule } from 'angular2-toaster';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-cadastro-membro',
  templateUrl: './cadastro-membro.component.html',
  styleUrls: ['./cadastro-membro.component.css'],
})
export class CadastroMembroComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('dadosPessoais') dadosPessoais: DadosPessoaisComponent;
  @ViewChild('dadosFamiliares') dadosFamiliares: DadosFamiliaresComponent;
  @ViewChild('dadosBatismos') dadosBatismos: DadosBatimosComponent;
  @ViewChild('dadosGc') dadosGc: DadosGcComponent;
  @BlockUI() blockUI: NgBlockUI;

  private toasterService: ToastrService;
  isOptional = false;
  idMembro:number;
  membro: MembroDto;
  fotoPerfil: File;
  responseMembro:ResponsePesquisaDetalhadoMembros;
  nome:string;

  constructor(
    private acaoService: AcaoService,
    private membroService: MembroService,
    private documentoService: DocumentoService,
    private identityStorage: IdentityStorage,
    private route: ActivatedRoute,
    public router: Router,
    toasterService: ToastrService, ) {
    this.toasterService = toasterService;
  }

  ngOnInit() { 

    this.route.queryParams.subscribe((queryParams: any) => { this.idMembro = queryParams['id']; });
     if (this.idMembro && this.idMembro !== null) {
        this.blockUI.start();
        this.membroService.findByMembroId(this.idMembro).subscribe(retorno => {
        this.carregarMembro(retorno);
      });
      this.blockUI.stop();
    }


  }

  stepClick(ev) {

    if (ev.selectedIndex === 1) {
      this.dadosFamiliares.nomeMembro = this.dadosPessoais.dadosPessoaisForm.controls['nome'].value;
    }

    if (ev.selectedIndex === 2) {
      this.dadosBatismos.nomeMembro = this.dadosPessoais.dadosPessoaisForm.controls['nome'].value;
    }
    
    if (ev.selectedIndex === 3) {
      this.dadosGc.nomeMembro = this.dadosPessoais.dadosPessoaisForm.controls['nome'].value;

    }
  }

  salvar() {
    if (this.dadosPessoais.dadosPessoaisForm.valid && this.dadosBatismos.dadosBatismoForm.valid && this.dadosFamiliares.dadosFamiliaresForm.valid && this.dadosGc.dadosGcForm.valid) {
      this.blockUI.start();
      this.createMembro();
      if(this.membro.id==0 || this.membro.id==null){
      this.membroService.saveMembro(this.membro,this.fotoPerfil).subscribe(data => {
        if(data==1){
          this.toasterService.success('Membro Cadastrado com Sucesso!');
          this.router.navigate(['pesquisa/pesquisa-membro']);
          this.blockUI.stop();
          }    
      
        if (data==2){
          this.toasterService.warning('Membro Já Cadastrado');
          this.blockUI.stop();
        }
      

        if(data==3){
          this.toasterService.warning('GC associado já possui um Líder');
          this.blockUI.stop();

        }


      }
      
      );
    } else{
  
      this.membroService.updateMembro(this.membro,this.fotoPerfil).subscribe(data => {
      if(data==true){
        this.toasterService.success('Membro Alterado com Sucesso!');
        this.blockUI.stop();
        this.router.navigate(['pesquisa/pesquisa-membro']);
      } else {
        error => {
          this.toasterService.error(error.error);
          this.blockUI.stop();
        }

      }
      });

    } 
    } else{
    this.toasterService.error('Todos os Campos Obrigatorios * precisam ser preenchidos');
        this.blockUI.stop();
    }
  }

  private createMembro() {

    this.membro = new MembroDto();

    //Dados Pessoais
    this.membro.nome = this.dadosPessoais.dadosPessoaisForm.controls['nome'].value;
    this.membro.dtNascimento = this.dadosPessoais.dadosPessoaisForm.controls['dtNascimento'].value;
    this.membro.nrDocumento = this.dadosPessoais.dadosPessoaisForm.controls['nrDocumento'].value;
    this.membro.dtValidadeDoc = this.dadosPessoais.dadosPessoaisForm.controls['dtValidadeDoc'].value;
    this.membro.nacionalidade = this.dadosPessoais.dadosPessoaisForm.controls['nacionalidade'].value;
    this.membro.sexo = this.dadosPessoais.dadosPessoaisForm.controls['sexo'].value;
    this.membro.enderecoResidencial = this.dadosPessoais.dadosPessoaisForm.controls['enderecoResidencial'].value;
    this.membro.zona = this.dadosPessoais.dadosPessoaisForm.controls['zona'].value;
    this.membro.cidade = this.dadosPessoais.dadosPessoaisForm.controls['cidade'].value;
    this.membro.pais = this.dadosPessoais.dadosPessoaisForm.controls['pais'].value;
    this.membro.email = this.dadosPessoais.dadosPessoaisForm.controls['email'].value;
    this.membro.celular = this.dadosPessoais.dadosPessoaisForm.controls['celular'].value
    this.membro.flagLiderGc=this.dadosPessoais.dadosPessoaisForm.controls['flagLiderGc'].value;
    this.membro.status='ATIVO';
    this.membro.funcaoMembro=this.dadosPessoais.dadosPessoaisForm.controls['funcaoMembro'].value;
    this.membro.levitaFuncao=this.dadosPessoais.dadosPessoaisForm.controls['funcaoLevita'].value;
    this.membro.id=this.idMembro;
    if (this.dadosPessoais.fotoPerfil != null) {
      this.fotoPerfil = new File([this.dadosPessoais.fotoPerfil], this.membro.nome.substring(0, 10),{ type: '.jpg' });
      } else{
        this.fotoPerfil=null;
      }
    //Dados Familiares 
    this.membro.nomePai = this.dadosFamiliares.dadosFamiliaresForm.controls['nomePai'].value;
    this.membro.nomeMae = this.dadosFamiliares.dadosFamiliaresForm.controls['nomeMae'].value;
    this.membro.estadoCivil = this.dadosFamiliares.dadosFamiliaresForm.controls['estadoCivil'].value;
    this.membro.nomeConjuge = this.dadosFamiliares.dadosFamiliaresForm.controls['nomeConjuge'].value;
    this.membro.dtCasamento = this.dadosFamiliares.dadosFamiliaresForm.controls['dataCasamento'].value;
    this.membro.qtdFilhos = this.dadosFamiliares.dadosFamiliaresForm.controls['qtdFilhos'].value;

    // Dados Batismo
    this.membro.dtBatismo = this.dadosBatismos.dadosBatismoForm.controls['dataBatismo'].value;
    this.membro.igrejaBatismo = this.dadosBatismos.dadosBatismoForm.controls['igrejaBatismo'].value;


    //Dados GC
    this.membro.gc = new Gc();
    this.dadosGc.gc.id= this.dadosGc.dadosGcForm.controls['gc'].value;
    this.membro.gc = this.dadosGc.gc;
    this.membro.idGc=this.dadosGc.dadosGcForm.controls['gc'].value;
      console.log(this.fotoPerfil);

  }

  private carregarMembro(responseMembro: ResponsePesquisaDetalhadoMembros) {

    this.responseMembro = new ResponsePesquisaDetalhadoMembros;
   
    // Dados Pessoais
    this.idMembro=responseMembro.idMembro;
    this.dadosPessoais.dadosPessoaisForm.get('nome').setValue(responseMembro.nomeMembro);
    this.dadosPessoais.dadosPessoaisForm.get('nrDocumento').setValue(responseMembro.nrDoc);
    this.dadosPessoais.dadosPessoaisForm.get('dtValidadeDoc').setValue(responseMembro.dtValidadeDoc);
    this.dadosPessoais.dadosPessoaisForm.get('nacionalidade').setValue(responseMembro.nacionalidade);
    this.dadosPessoais.dadosPessoaisForm.get('sexo').setValue(responseMembro.sexo);
    this.dadosPessoais.dadosPessoaisForm.get('enderecoResidencial').setValue(responseMembro.enderecoResidencial);
    this.dadosPessoais.dadosPessoaisForm.get('zona').setValue(responseMembro.zona);
    this.dadosPessoais.dadosPessoaisForm.get('cidade').setValue(responseMembro.cidade);
    this.dadosPessoais.dadosPessoaisForm.get('pais').setValue(responseMembro.pais);
    this.dadosPessoais.dadosPessoaisForm.get('email').setValue(responseMembro.email);
    this.dadosPessoais.dadosPessoaisForm.get('celular').setValue(responseMembro.celular);
    this.dadosPessoais.dadosPessoaisForm.get('flagLiderGc').setValue(responseMembro.flagLiderGc);
    this.dadosPessoais.dadosPessoaisForm.get('funcaoMembro').setValue(responseMembro.funcaoMembro);
    this.dadosPessoais.dadosPessoaisForm.get('funcaoLevita').setValue(responseMembro.levitaFuncao);
    if (responseMembro.imgPerfil!=null) {
      this.dadosPessoais.url = ('data:image/jpeg;base64,' +responseMembro.imgPerfil);
      this.fotoPerfil = new File([responseMembro.imgPerfil], responseMembro.nomeMembro.substring(0, 10),{ type: '.jpg' })
      this.dadosPessoais.fotoPerfil = this.fotoPerfil ;
      this.dadosPessoais.exibirBotaoRemover = true;
    }
    this.dadosPessoais.dadosPessoaisForm.get('dtNascimento').setValue(responseMembro.dtNasc);
    if(responseMembro.funcaoMembro!=null && responseMembro.funcaoMembro!=""){
      this.dadosPessoais.dadosPessoaisForm.get('flagFuncao').setValue('S');
      this.dadosPessoais.dadosPessoaisForm.get('funcaoMembro').setValue(responseMembro.funcaoMembro);
      this.dadosPessoais.dadosPessoaisForm.get('funcaoLevita').setValue(responseMembro.levitaFuncao);
    } else{

      this.dadosPessoais.dadosPessoaisForm.get('flagFuncao').setValue('N');

    }

    // Dados Familiares
    this.dadosFamiliares.dadosFamiliaresForm.get('nomePai').setValue(responseMembro.nomePai);
    this.dadosFamiliares.dadosFamiliaresForm.get('nomeMae').setValue(responseMembro.nomeMae);
    this.dadosFamiliares.dadosFamiliaresForm.get('estadoCivil').setValue(responseMembro.estadoCivil);
    this.dadosFamiliares.dadosFamiliaresForm.get('nomeConjuge').setValue(responseMembro.nomeConjuge);
    this.dadosFamiliares.dadosFamiliaresForm.get('dataCasamento').setValue(responseMembro.dtCasamento);
    this.dadosFamiliares.dadosFamiliaresForm.get('qtdFilhos').setValue(responseMembro.qtdFilhos);
    
    // Dados Batismo
    if(responseMembro.dtBatismo!=null && responseMembro.igrejaBatismo!=null){
    this.dadosBatismos.dadosBatismoForm.get('flagBatizado').setValue('S')
    this.dadosBatismos.dadosBatismoForm.get('dataBatismo').setValue(responseMembro.dtBatismo);
    this.dadosBatismos.dadosBatismoForm.get('igrejaBatismo').setValue(responseMembro.igrejaBatismo);
     } else{
     this.dadosBatismos.dadosBatismoForm.get('flagBatizado').setValue('N')
    }
  

    //Dados GC{
    if(responseMembro.idGc!= 0){
     this.dadosGc.dadosGcForm.get('flagParticipaGc').setValue('S');
    this.dadosGc.dadosGcForm.get('gc').setValue(responseMembro.idGc);
  } else {
    this.dadosGc.dadosGcForm.get('flagParticipaGc').setValue('N');


  }
  }
  



}


export class MembroDto {
  id:number;
  nome: string;
  nrDocumento: string;
  dtValidadeDoc: Date;
  nacionalidade: string;
  sexo: string;
  enderecoResidencial: string;
  zona: string;
  cidade: string;
  pais: string;
  email: string;
  nomePai: string;
  nomeMae: string;
  estadoCivil: string;
  nomeConjuge: string;
  dtCasamento: Date;
  qtdFilhos: number;
  dtBatismo: Date;
  igrejaBatismo: string;
  gc: Gc;
  celular:string;
  flagLiderGc:string;
  status:string;
  funcaoMembro:string;
  levitaFuncao:string;
  dtNascimento:Date;
  idGc:number;
  fotoPerfil:String;
}


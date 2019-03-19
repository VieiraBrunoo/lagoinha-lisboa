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
import { ToasterService } from 'angular2-toaster';
import { Documento } from 'src/app/models/documento';
import { Membro } from 'src/app/models/membro';
import { MembroService } from 'src/app/service/membro/membro.service';
import { Gc } from 'src/app/models/gc-cadastro-membro';
import { runInThisContext } from 'vm';
import { ActivatedRoute } from '@angular/router';


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

  private toasterService: ToasterService;
  isOptional = false;
  idMembro:number;
  membro: MembroDto;
  fotoPerfil: File;
  

  constructor(
    private acaoService: AcaoService,
    private membroService: MembroService,
    private documentoService: DocumentoService,
    private identityStorage: IdentityStorage,
    private route: ActivatedRoute,

    toasterService: ToasterService, ) {
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
//    if (this.dadosPessoais.dadosPessoaisForm.valid && this.dadosBatismos.dadosBatismoForm.valid && this.dadosFamiliares.dadosFamiliaresForm.valid && this.dadosGc.dadosGcForm.valid) {

      this.blockUI.start();
      this.createMembro();

      this.membroService.saveDocente(this.fotoPerfil, this.membro).subscribe(data => {

        if (data == null) {
//   console.log("NULL");
          this.blockUI.stop();
        }

        this.toasterService.pop('success', 'Membro cadastrado com sucesso!');
        this.blockUI.stop();
  });
   // }
  }

  private createMembro() {

    this.membro = new MembroDto();

    //Dados Pessoais
    this.membro.nome = this.dadosPessoais.dadosPessoaisForm.controls['nome'].value;
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
    console.log(this.membro.gc.id);
    this.membro.gc = this.dadosGc.gc;    
    if (this.dadosPessoais.fotoPerfil && this.dadosPessoais.fotoPerfil !== null) {
    this.fotoPerfil = this.dadosPessoais.fotoPerfil;
    }


  }

  private carregarMembro(membro: MembroDto) {

    this.membro = new MembroDto;
   
    // Dados Pessoais
    this.dadosPessoais.dadosPessoaisForm.get('nome').setValue(membro.nome);
    this.dadosPessoais.dadosPessoaisForm.get('nrDocumento').setValue(membro.nrDocumento);
    this.dadosPessoais.dadosPessoaisForm.get('dtValidadeDoc').setValue(membro.dtValidadeDoc);
    this.dadosPessoais.dadosPessoaisForm.get('nacionalidade').setValue(membro.nacionalidade);
    this.dadosPessoais.dadosPessoaisForm.get('sexo').setValue(membro.sexo);
    this.dadosPessoais.dadosPessoaisForm.get('enderecoResidencial').setValue(membro.enderecoResidencial);
    this.dadosPessoais.dadosPessoaisForm.get('zona').setValue(membro.zona);
    this.dadosPessoais.dadosPessoaisForm.get('cidade').setValue(membro.cidade);
    this.dadosPessoais.dadosPessoaisForm.get('pais').setValue(membro.pais);
    this.dadosPessoais.dadosPessoaisForm.get('email').setValue(membro.email);
    this.dadosPessoais.dadosPessoaisForm.get('celular').setValue(membro.celular);
    this.dadosPessoais.dadosPessoaisForm.get('flagLiderGc').setValue(membro.flagLiderGc);
    this.dadosPessoais.dadosPessoaisForm.get('funcaoMembro').setValue(membro.funcaoMembro);
    this.dadosPessoais.dadosPessoaisForm.get('funcaoLevita').setValue(membro.levitaFuncao);
    if (membro.fotoPerfil!=null) {
      this.dadosPessoais.url = ('data:image/jpeg;base64,' + membro.fotoPerfil);
      this.dadosPessoais.exibirBotaoRemover = true;
    }

    // Dados Familiares
    this.dadosFamiliares.dadosFamiliaresForm.get('nomePai').setValue(membro.nomePai);
    this.dadosFamiliares.dadosFamiliaresForm.get('nomeMae').setValue(membro.nomeMae);
    this.dadosFamiliares.dadosFamiliaresForm.get('estadoCivil').setValue(membro.estadoCivil);
    this.dadosFamiliares.dadosFamiliaresForm.get('nomeConjuge').setValue(membro.nomeConjuge);
    this.dadosFamiliares.dadosFamiliaresForm.get('dataCasamento').setValue(membro.dtCasamento);
    this.dadosFamiliares.dadosFamiliaresForm.get('qtdFilhos').setValue(membro.qtdFilhos);
    
    // Dados Batismo
    this.dadosBatismos.dadosBatismoForm.get['dataBatismo'].setValue(membro.dtBatismo);
    this.dadosBatismos.dadosBatismoForm.get['igrejaBatismo'].setValue(membro.igrejaBatismo);

    //Dados GC{
    if(membro.gc.id!= null){
     this.membro.gc = new Gc();
     this.dadosGc.dadosGcForm.get['flagParticipaGc'].setValue('S');
    this.dadosGc.dadosGcForm.controls['gc'].setValue(membro.gc.nome);
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
  fotoPerfil: File;
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
}

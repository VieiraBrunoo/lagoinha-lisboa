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

  membro: MembroDto;
  fotoPerfil: File;

  constructor(
    private acaoService: AcaoService,
    private membroService: MembroService,
    private documentoService: DocumentoService,
    private identityStorage: IdentityStorage,
    toasterService: ToasterService, ) {
    this.toasterService = toasterService;
  }

  ngOnInit() { }

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
    this.membro.status='ATIVO'
   
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
}


export class MembroDto {

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
}

import { AcaoService } from '../../../../service/acao/acao.service';
import { Acao } from '../../../../models/acao';
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
import { DocenteTemaAtuacao } from 'src/app/models/docenteTemaAtuacao';
import { Capacitacao } from 'src/app/models/siec/capacitacao';
import { Parametro } from 'src/app/models/parametro';


@Component({
  selector: 'app-cadastro-membro',
  templateUrl: './cadastro-membro.component.html',
  styleUrls: ['./cadastro-membro.component.css'],
})
export class CadastroMembroComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('dadosPessoais') dadosGerais: DadosPessoaisComponent;
  @ViewChild('dadosBatismos') dadosBancarios: DadosBatimosComponent;
  @ViewChild('dadosGc') dadosAdministrativos: DadosGcComponent;
  @ViewChild('dadosFamiliares') acoesComoDiscente: DadosFamiliaresComponent;
  @BlockUI() blockUI: NgBlockUI;

  private toasterService: ToasterService;
  isOptional = false;

  documento: Documento;
  docente: Docente;
  fotoPerfil: File;

  constructor(
    private acaoService: AcaoService,
    private docenteService: DocenteService,
    private documentoService: DocumentoService,
    private identityStorage: IdentityStorage,
    toasterService: ToasterService, ) {
    this.toasterService = toasterService;
  }

  ngOnInit() { }

  stepClick(ev) {

    if (ev.selectedIndex === 2) {
      this.dadosAdministrativos.nomeDocente = this.dadosGerais.dadosGeraisForm.controls['nome'].value;
    }

    if (ev.selectedIndex === 3) {
    /*  
      this.acoesComoDiscente.nomeDocente = this.dadosGerais.dadosGeraisForm.controls['nome'].value;
      this.acoesComoDiscente.dataSourceCapacitacaoDiscente = new MatTableDataSource<any>(null);
      this.acoesComoDiscente.dataSourceCapacitacaoEnfam = new MatTableDataSource<any>(null);
  */
      if(this.dadosGerais.capacitacaoDiscenteList && this.dadosGerais.capacitacaoDiscenteList.length > 0) {
    /*    this.acoesComoDiscente.showCapacitacaoDiscente = true;
        this.acoesComoDiscente.capacitacaoDiscenteLength = this.dadosGerais.capacitacaoDiscenteList.length;
        this.acoesComoDiscente.dataSourceCapacitacaoDiscente = new MatTableDataSource<any>(this.dadosGerais.capacitacaoDiscenteList);
        this.acoesComoDiscente.dataSourceCapacitacaoDiscente.paginator = this.acoesComoDiscente.paginator.toArray()[0];
      */}
  
      if(this.dadosGerais.capacitacaoDocenteList && this.dadosGerais.capacitacaoDocenteList.length > 0) {
        /*this.acoesComoDiscente.showCapacitacaoEnfam = true;
        this.acoesComoDiscente.capacitacaoEnfamLength = this.dadosGerais.capacitacaoEnfamList.length;
        this.acoesComoDiscente.dataSourceCapacitacaoEnfam = new MatTableDataSource<any>(this.dadosGerais.capacitacaoEnfamList);
        this.acoesComoDiscente.dataSourceCapacitacaoEnfam.paginator = this.acoesComoDiscente.paginator.toArray()[1];*/
      }
    }
    
    if (ev.selectedIndex === 4) {
      /*
      this.acoesComoDocente.nomeDocente = this.dadosGerais.dadosGeraisForm.controls['nome'].value;
      this.acoesComoDocente.dataSourceCapacitacaoDocente = new MatTableDataSource<any>(null);
  
      if(this.dadosGerais.capacitacaoDocenteList && this.dadosGerais.capacitacaoDocenteList.length > 0) {
        this.acoesComoDocente.capacitacaoDocenteLength = this.dadosGerais.capacitacaoDocenteList.length;
        this.acoesComoDocente.dataSourceCapacitacaoDocente = new MatTableDataSource<any>(this.dadosGerais.capacitacaoDocenteList);
        this.acoesComoDocente.dataSourceCapacitacaoDocente.paginator = this.acoesComoDiscente.paginator.toArray()[0];
      }*/
    }

    /*if (ev.selectedIndex === 5) {
      this.createDocente();

      this.bancoDocente.strNomeDocente = this.dadosGerais.dadosGeraisForm.controls['nome'].value;
      this.bancoDocente.strFigurarDocentes = this.dadosGerais.dadosGeraisForm.controls['flagBancoDocentes'].value === '1' ? 'Sim' : 'Não';
    //  this.bancoDocente.gerarTableData(this.dadosGerais.atuacaoList, this.dadosGerais.parametroDescricaoList);
      this.bancoDocente.validarCadastro(this.docente, this.documento);
    }*/
  }

  salvar() {

    if (this.dadosGerais.dadosGeraisForm.valid && this.dadosBancarios.dadosBancariosForm.valid && this.dadosAdministrativos.dadosAdministrativosForm.valid) {

      this.blockUI.start();
      this.createDocente();

      this.docenteService.saveDocente(this.fotoPerfil, this.docente).subscribe(data => {

        if (data == null) {
       //   console.log("NULL");
          this.blockUI.stop();
        } else {

          let documentos = this.dadosAdministrativos.documentosMultipart;
          let arquivos = this.dadosAdministrativos.arquivosMultipart;
          let idDocente = data.id;

          this.documentoService.saveDocumento(arquivos, documentos, idDocente).subscribe(data => {
            let acoes = new Array<Acao>();
            
           /* this.acoesComoDocente.acaoList.forEach(acao => {
              acao.docente = idDocente;
              acoes.push(acao);
            });*/

            this.acoesComoDiscente.acaoList.forEach(acao => {
              acao.docente = idDocente;
              acoes.push(acao);
            });
            
            this.acaoService.saveAcao(acoes).subscribe(data => {
              this.toasterService.pop('success', 'Docente cadastrado com sucesso!');
            });
          });
          this.blockUI.stop();
        }

      }, error => {
        console.log(error);
        this.blockUI.stop();
      });
      
    } else {

    }
  }

  private createDocente() {

    this.docente = new Docente();
    this.documento = new Documento();

    this.docente.escola = this.dadosGerais.dadosGeraisForm.controls['escola'].value;
    this.docente.tribunal = this.dadosGerais.dadosGeraisForm.controls['tribunal'].value;
    this.docente.banco = this.dadosBancarios.dadosBancariosForm.controls['banco'].value;
    this.docente.nome = this.dadosGerais.dadosGeraisForm.controls['nome'].value;
    this.docente.cpf = this.dadosGerais.dadosGeraisForm.controls['cpf'].value;
    this.docente.email = this.dadosGerais.dadosGeraisForm.controls['email'].value;
    this.docente.contato1 = this.dadosGerais.dadosGeraisForm.controls['contato1'].value;
    this.docente.contato2 = this.dadosGerais.dadosGeraisForm.controls['contato2'].value;
    this.docente.curriculoLattes = this.dadosGerais.dadosGeraisForm.controls['curriculumLattes'].value;
    this.docente.curriculoResumido = this.dadosGerais.dadosGeraisForm.controls['curriculoResumido'].value;
    this.docente.dataCriacao = new Date();
    this.docente.dataValidacao = new Date(); // PERGUNTAR
    this.docente.flagEstrangeiro = this.dadosGerais.dadosGeraisForm.controls['flagEstrangeiro'].value;
    this.docente.flagFigurarBanco = this.dadosGerais.dadosGeraisForm.controls['flagBancoDocentes'].value;
    this.docente.flagTipoConta = this.dadosBancarios.dadosBancariosForm.controls['flTipoConta'].value;
    this.docente.codigoAgencia = this.dadosBancarios.dadosBancariosForm.controls['cdAgencia'].value;
    this.docente.numeroConta = this.dadosBancarios.dadosBancariosForm.controls['numeroConta'].value;
    this.docente.operacao = this.dadosBancarios.dadosBancariosForm.controls['operacao'].value;
    this.docente.titulacao = this.dadosGerais.dadosGeraisForm.controls['titulacao'].value;
    this.docente.categoriaProfissional = this.dadosGerais.dadosGeraisForm.controls['categoriaProfissional'].value;
    this.docente.status = 'N'; //ALTERAR
    this.docente.usuarioValidacao = this.identityStorage.getIdentity().login;

    this.documento.usuario = this.identityStorage.getIdentity().login;

    this.preencherDocenteTemaAtucaoList();
    this.preencherDocenteAtuacaoList();

    this.fotoPerfil = this.dadosGerais.fotoPerfil;
  }

  private preencherDocenteTemaAtucaoList() {
    this.docente.docenteTemaAtuacaoList = new Array<DocenteTemaAtuacao>();
   /* this.dadosGerais.temaSelectedList.forEach(temaAtuacao => {
      let docenteTemaAtuacao = new DocenteTemaAtuacao();
      docenteTemaAtuacao.idTemaAtuacao = temaAtuacao.id;
      docenteTemaAtuacao.idTemaClassificacao = temaAtuacao.temaClassificacao.id;
      this.docente.docenteTemaAtuacaoList.push(docenteTemaAtuacao);
    }); */
  }

  private preencherDocenteAtuacaoList() {

    this.docente.docenteAtuacaoList = new Array<string>();
    let data = new Date();
    let usuario = this.identityStorage.getIdentity().login; // QUANDO USUARIO ESTIVER LOGADO
    let flagAptidao = 'S';

   /* this.dadosGerais.parametroAtuacaoList.forEach(element => {

      this.docente.docenteAtuacaoData = data;
      this.docente.docenteAtuacaoUsuario = usuario;
      // this.docente.docenteAtuacaoFlagAptidao = (
      //   this.bancoDocente.lstDataSourse.find(
      //     x => x.descricao === element
      //   ).aptidao
      // ) === true ? 'S' : 'N';
      this.docente.docenteAtuacaoList.push(element);
    }); */
  }
}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { IdentityStorage } from 'src/app/auth/_models/identity.storage';
import { Capacitacao } from 'src/app/models/siec/capacitacao';
import { SiecWsService } from 'src/app/service/siec-ws/siec.ws.service';
import { TemaAtuacaoService } from '../../../../service/tema-atuacao/tema.atuacao.service';
import { TemaClassificacaoService } from '../../../../service/tema-classificacao/tema.classificacao.service';
import { FotoCropDialogComponent } from '../foto-crop-dialog/foto-crop-dialog.component';
import { EscolaService } from '../../../../service/escola/escola.service';
import { ParametroService } from '../../../../service/parametro/parametro.service';
import { TribunalService } from '../../../../service/tribunal/tribunal.service';
import { MaterialErrorState } from '../../../util/material-error-state';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.css'],
})
export class DadosPessoaisComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void { }

  flags: any[] = [
    { key: 'S', value: 'Sim' },
    { key: 'N', value: 'Não' }
  ];

  dadosGeraisForm: FormGroup;
  docenteDTO: DocenteDTO;
  atuacaoList: Array<AtuacaoDTO>;
  temaClassificacaoList: Array<any>;
  escolaList: Array<any>;
  tribunalList: Array<any>;
  titulacaoList: Array<any>;
  categoriaList: Array<any>;
  ramoList: Array<any>;
  cpfDesabilitado: boolean;
  temaAtuacaoList: any[][];
  url: any;
  isServidor: boolean;
  exibirBotaoRemover: boolean;
  fotoPerfil: File = null;
  capacitacaoDocenteList: Array<Capacitacao>;
  capacitacaoDiscenteList: Array<Capacitacao>;
  nomeImagem: string;
  tipoImagem: string;
  ramo: any;
  flagValue: any;

  constructor(
    private escolaService: EscolaService,
    private tribunalService: TribunalService,
    private temaClassificacaoService: TemaClassificacaoService,
    private temaAtuacaoService: TemaAtuacaoService,
    private parametroService: ParametroService,
    private siecWsService: SiecWsService,
    private identityStorage: IdentityStorage,
    public dialog: MatDialog) {
  }


  ngOnInit() {
    this.creatForm();
    this.dadosGeraisForm.get('obterDadosDoSiec').setValue(false);
    this.getListCategorias();
    this.getListEscolas();
    this.getListRamos();
    this.getListTitulacoes();
    this.alterarCategoria();
  }

  private creatForm() {

    this.dadosGeraisForm = new FormGroup({
      flagEstrangeiro: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      contato1: new FormControl('', Validators.required),
      contato2: new FormControl(''),
      escola: new FormControl('', Validators.required),
      titulacao: new FormControl('', Validators.required),
      curriculumLattes: new FormControl(''),
      categoriaProfissional: new FormControl('', Validators.required),
      ramo: new FormControl('', Validators.required),
      tribunal: new FormControl('', Validators.required),
      flagBancoDocentes: new FormControl('', Validators.required),
      curriculoResumido: new FormControl('', Validators.required),
      matricula: new FormControl(''),

      contaCorrente: new FormControl(''),
      numAgencia: new FormControl(''),
      codBanco: new FormControl(''),
      tipoAluno: new FormControl(''),
      obterDadosDoSiec: new FormControl('')
    });

    if (!this.docenteDTO) {
      this.docenteDTO = new DocenteDTO();
      this.docenteDTO.atuacaoList = new Array<AtuacaoDTO>();
      this.docenteDTO.temaAtuacaoList = new Array<TemaAtuacaoDTO>();
    }
  }

  alterarCategoria() {

    const matriculaControl = this.dadosGeraisForm.get('matricula');

    this.dadosGeraisForm.get('categoriaProfissional').valueChanges.subscribe(
      (mode: string) => {
        if (mode === 'JS') {
          matriculaControl.setValidators([Validators.required]);
          this.isServidor = true;
        } else {
          matriculaControl.clearValidators();
          this.isServidor = false;
        }
        matriculaControl.updateValueAndValidity();
      }
    );
  }

  getListAtuacoes() {
    this.atuacaoList = new Array<AtuacaoDTO>();
   /* this.parametroService.findAtuacoes().subscribe(listRetorno => {
      listRetorno.forEach(atuacao => {
        if (this.docenteDTO && this.docenteDTO.id !== null && this.docenteDTO.atuacaoList.length > 0) {
          this.docenteDTO.atuacaoList.find(k => k.valor1 === atuacao.valor1 ? atuacao.checked = true : atuacao.checked = false);
        }
        if (this.docenteDTO.id && this.docenteDTO.id !== null) {
          atuacao.docente = this.docenteDTO.id;
        }
        this.atuacaoList.push(atuacao);
      });
    }) */
  }

  getListTemaAtuacoes() {

    this.temaClassificacaoList = new Array<any>();
    this.temaAtuacaoList = new Array<any>();
    let temaAtuacaoListAuxiliar = new Array<TemaAtuacaoDTO>();

    this.temaClassificacaoService.findAll().subscribe(listRetorno => {
      listRetorno.forEach(temaClassificacao => {
        this.temaClassificacaoList.push(temaClassificacao);
        this.temaAtuacaoList[temaClassificacao.id] = [];
        let index = 0;
        this.temaAtuacaoService.findByTemaClassificacao(temaClassificacao.id).subscribe(listRetorno_ => {
          listRetorno_.forEach(temaAtuacao => {
            this.temaAtuacaoList[temaClassificacao.id][index] = temaAtuacao;
            let x;

      /*      if (this.docenteDTO && this.docenteDTO.id !== null && this.docenteDTO.temaAtuacaoList.length > 0) {
              this.docenteDTO.temaAtuacaoList.find(k => k.classificacao === temaAtuacao.id ? x = true : x = false);
              temaAtuacao.checked = x;
              temaAtuacaoListAuxiliar.push(temaAtuacao);
            }
            index++;*/
          });
        });
      });
    });

    if (temaAtuacaoListAuxiliar.length > 0) {
      this.docenteDTO.temaAtuacaoList = temaAtuacaoListAuxiliar;
    }
  }

  getListEscolas() {
    this.escolaList = new Array<any>();
    this.escolaService.findAll().subscribe(listaRetorno => {
      listaRetorno.forEach(element => {
        this.escolaList.push(element);
      });
    });
  }

  getListTribunais(ramo: string) {
    this.docenteDTO.ramo = ramo;
    this.tribunalList = new Array<any>();
    this.tribunalService.findByRamo(ramo).subscribe(listaRetorno => {
      listaRetorno.forEach(element => {
        this.tribunalList.push(element);
      });
    });
  }

  getListTitulacoes() {
    this.titulacaoList = new Array<any>();
    this.parametroService.findByNomeConstante("TITULACAO").subscribe(listRetorno => {
      listRetorno.forEach(element => {
        this.titulacaoList.push(element);
      });
    });
  }

  getListCategorias() {
    this.categoriaList = new Array<any>();
    this.parametroService.findByNomeConstante("CATEGORIA_PROFISSIONAL").subscribe(listRetorno => {
      listRetorno.forEach(element => {
        this.categoriaList.push(element);
      });
    });
  }

  getListRamos() {
    this.ramoList = new Array<any>();
    this.parametroService.findByNomeConstante("RAMO").subscribe(listRetorno => {
      listRetorno.forEach(element => {
        this.ramoList.push(element);
      });
    });
  }

  /* ----------- EVENTOS ----------- */
  onFileChanged(event) {

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      };
      reader.readAsDataURL(event.target.files[0]);
      let selectedFiles = event.target.files;
      this.fotoPerfil = selectedFiles.item(0);
      this.exibirBotaoRemover = true;
    }
  }

  onChangeFlagEstrangeiro(value) {
    this.docenteDTO.flagEstrangeiro = value;
  }

  onChangeFlagBancoDocentes(value) {
    this.docenteDTO.flagBancoDocentes = value;
  }

  onSelectAtuacao(event, atuacao) {

    if (event.checked) {
      atuacao.data = new Date();
      atuacao.usuario = this.identityStorage.getIdentity().login;
      atuacao.flagAptidao = 'N';

      this.docenteDTO.atuacaoList.push(atuacao);
    } else {
      const index = this.docenteDTO.atuacaoList.findIndex(obj => obj.valor1 === atuacao.valor1);
      this.docenteDTO.atuacaoList.splice(index, 1);
    }
  }

  onSelectTemaAtuacao(event, temaAtuacao) {

    if (event.checked) {
      this.docenteDTO.temaAtuacaoList.push(temaAtuacao);
    } else {
      const index = this.docenteDTO.temaAtuacaoList.findIndex(obj => obj.id === temaAtuacao.id);
      this.docenteDTO.temaAtuacaoList.splice(index, 1);
    }
  }

  removerFoto(event) {
    this.fotoPerfil = null;
    this.url = null;
    this.exibirBotaoRemover = false;
    event.target.files = null;
    (<HTMLInputElement>document.getElementById('fotoPerfil')).value = '';
  }

  buscarCursosComoDocente(event) {

    const cpf = event.replace(/\./gi, "").replace(/\-/gi, "");

    if (cpf !== '') {
      this.capacitacaoDocenteList = new Array<Capacitacao>();
      this.capacitacaoDiscenteList = new Array<Capacitacao>();

      this.siecWsService.buscarAcoesComoDocente(cpf).subscribe(listRetorno => {
        listRetorno.forEach(element => {
          this.capacitacaoDocenteList.push(element);
        });
      });

    /*  this.siecWsService.buscarAcoesComoDiscente(cpf).subscribe(listRetorno => {
        listRetorno.forEach(element => {
          this.capacitacaoDiscenteList.push(element);
        });
      });

      if (this.docenteDTO.id === null) {
      /*  this.siecWsService.buscarDocente(cpf).subscribe(retorno => {
          const docenteSiecDto: DocenteSiecDto = retorno;
          this.dadosGeraisForm.get('nome').setValue(docenteSiecDto.nome);
          this.dadosGeraisForm.get('email').setValue(docenteSiecDto.email);
          this.dadosGeraisForm.get('contato1').setValue(docenteSiecDto.celular);
          this.dadosGeraisForm.get('contato2').setValue(docenteSiecDto.telefone);
          this.dadosGeraisForm.get('matricula').setValue(docenteSiecDto.matricula);

          this.dadosGeraisForm.get('contaCorrente').setValue(docenteSiecDto.contaCorrente);
          this.dadosGeraisForm.get('numAgencia').setValue(docenteSiecDto.numAgencia);
          this.dadosGeraisForm.get('codBanco').setValue(docenteSiecDto.codBanco);
          this.dadosGeraisForm.get('tipoAluno').setValue(docenteSiecDto.tipoAluno);
          this.dadosGeraisForm.get('obterDadosDoSiec').setValue(true);
        
      }*/
    } 
  }

  abrirModal(event) {

    this.nomeImagem = event.target.files.item(0).name;
    this.tipoImagem = event.target.files.item(0).type;
    const dialogRef = this.dialog.open(FotoCropDialogComponent, {
      panelClass: 'medium-width-dialog',
      data: {
        imageChangedEvent: event,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.url = result.croppedImage;
        this.base64ToImage(result.croppedImage.split(',')[1], this.nomeImagem, this.tipoImagem);
        this.exibirBotaoRemover = true;
      }
    });
  }

  base64ToImage(base64: string, nomeImagem: string, tipoImagem: string) {
    const imageBlob = this.dataURItoBlob(base64, tipoImagem);
    this.fotoPerfil = new File([imageBlob], nomeImagem, { type: tipoImagem });
  }

  dataURItoBlob(dataURI, tipo) {
    const byteString = atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: tipo });
    return blob;
  }
}


/*-------- OBJETOS ---------*/
export class DocenteDTO {

  id: number;
  flagEstrangeiro: string;
  cpf: string;
  email: string;
  nome: string;
  contato1: string;
  contato2: string;
  fotoPerfil: File = null;
  escola: number;
  titulacao: string;
  curriculumLattes: string;
  curriculumResumido: string;
  categoriaProfissional: string;
  matricula: string;
  ramo: string;
  tribunal: number;
  flagBancoDocentes: string;
  status: string;

  atuacaoList: Array<AtuacaoDTO>;
  temaAtuacaoList: Array<TemaAtuacaoDTO>;

  banco: number;
  flagTipoConta: string;
  codigoAgencia: string;
  numeroConta: string;
  operacao: string;

  usuario: string;
  dataCriacao: any;
  dataValidacao: any;
}

export class AtuacaoDTO {
  docente: number;
  valor1: string; // Sigla
  valor2: string; // Descrição
  checked: boolean;
  flagAptidao: string;
  usuario: string;
  data: any;
}

export class TemaAtuacaoDTO {
  id: number;
  docente: number;
  classificacao: number;
  descricao: string;
  checked: boolean;
}

export class DocumentoDTO {
  id: number;
  docente: number;
  tipoDocumento: string; // Descrição do tipo do documento
  flagTipoDocumento: string;
  usuario: string;
  data: any;
  descricao: string;
  //arquivo: File = null;
  arquivo: any = null;
  nomeArquivo: string;
}

export class ArquivoDTO {
  id: number;
  arquivo: any;
}

export class TipoDocumentoDTO {
  id: number;
  sigla: string;
  descricao: string;
}

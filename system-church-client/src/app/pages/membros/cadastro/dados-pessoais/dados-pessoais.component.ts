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
import { Parametro } from 'src/app/models/parametro';

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

  dadosPessoaisForm: FormGroup;
  url: any;
  exibirBotaoRemover: boolean;
  fotoPerfil: File = null;
  nomeImagem: string;
  tipoImagem: string;
  nacionalidadeList: Array<any>;
  sexoList: Array<any>;
  zonaList: Array<any>;
  cidadeList: Array<any>;
  paisList: Array<any>;
  liderGcList: Array<any>;
  funcaoMembroList: Array<any>;
  funcaoLevitaList: Array<any>;
  funcaoList: Array<any>;



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
    this.getListNacionalidade();
    this.getListSexo();
    this.getListPais();
    this.getListCidade();
    this.getListZona();
    this.getListOpcaoLiderGc();
    this.getListOpcaoFuncao();
    this.getListFuncaoMembro();
    this.getListFuncaoLevita();
  }

  private creatForm() {

    this.dadosPessoaisForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      dtNascimento: new FormControl('', Validators.required),
      nacionalidade: new FormControl('', Validators.required),
      sexo: new FormControl('', Validators.required),
      nrDocumento: new FormControl('', Validators.required),
      dtValidadeDoc: new FormControl('', Validators.required),
      enderecoResidencial: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      pais: new FormControl('', Validators.required),
      zona: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      celular: new FormControl('', [Validators.required]),
      flagLiderGc: new FormControl('', [Validators.required]),
      flagFuncao: new FormControl('', [Validators.required]),
      funcaoMembro: new FormControl(''),
      funcaoLevita: new FormControl(''),
     });

  }

  


  getListNacionalidade() {
    this.nacionalidadeList = new Array<any>();
    this.parametroService.findByNomeConstante("NACIONALIDADE").subscribe(listRetorno => {
      listRetorno.forEach(element => {
        this.nacionalidadeList.push(element);
      });
    });
  }


  getListSexo() {
    this.sexoList = new Array<any>();
    this.parametroService.findByNomeConstante("SEXO").subscribe(listRetorno => {
      listRetorno.forEach(element => {
        this.sexoList.push(element);
      });
    });
  }


  getListZona() {
    this.zonaList = new Array<any>();
    this.parametroService.findByNomeConstante("ZONA ").subscribe(listRetorno => {
      listRetorno.forEach(element => {
        this.zonaList.push(element);
      });
    });
  }

  getListCidade() {
    this.cidadeList = new Array<any>();
    this.parametroService.findByNomeConstante("CIDADE").subscribe(listRetorno => {
      listRetorno.forEach(element => {
        this.cidadeList.push(element);
      });
    });
  }

  getListPais() {
    this.paisList = new Array<any>();
    this.parametroService.findByNomeConstante("PAIS").subscribe(listRetorno => {
      listRetorno.forEach(element => {
        this.paisList.push(element);
      });
    });
  }


  private getListOpcaoLiderGc() {
    this.liderGcList = new Array<any>();
    this.parametroService.findByNomeConstante("RESPOSTA").subscribe(listRetorno => {
      listRetorno.forEach(element => {
        this.liderGcList.push(element);
    });
  });
}

private getListFuncaoMembro() {
  this.funcaoMembroList = new Array<any>();
  this.parametroService.findByNomeConstante("FUNCAO_MEMBRO").subscribe(listRetorno => {
    listRetorno.forEach(element => {
      this.funcaoMembroList.push(element);
  });
});
}

private getListFuncaoLevita() {
  this.funcaoLevitaList = new Array<any>();
  this.parametroService.findByNomeConstante("INSTRUMENTO").subscribe(listRetorno => {
    listRetorno.forEach(element => {
      this.funcaoLevitaList.push(element);
  });
});
}

private getListOpcaoFuncao() {
  this.funcaoList = new Array<any>();
  this.parametroService.findByNomeConstante("RESPOSTA").subscribe(listRetorno => {
    listRetorno.forEach(element => {
      this.funcaoList.push(element);
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

  removerFoto(event) {
    this.fotoPerfil = null;
    this.url = null;
    this.exibirBotaoRemover = false;
    event.target.files = null;
    (<HTMLInputElement>document.getElementById('fotoPerfil')).value = '';
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




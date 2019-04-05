import { Component, OnInit } from '@angular/core';
import { Parametro } from 'src/app/models/parametro';
import { TemaClassificacao } from 'src/app/models/temaClassificacao';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EscolaService } from 'src/app/service/escola/escola.service';
import { TribunalService } from 'src/app/service/tribunal/tribunal.service';
import { TemaClassificacaoService } from 'src/app/service/tema-classificacao/tema.classificacao.service';
import { TemaAtuacaoService } from 'src/app/service/tema-atuacao/tema.atuacao.service';
import { ParametroService } from 'src/app/service/parametro/parametro.service';
import { DocenteService } from 'src/app/service/docente/docente.service';
import { TemaAtuacao } from 'src/app/models/temaAtuacao';
import { PesquisaPublica } from "src/app/models/pesquisa-publica";
import { PesquisaDocentes } from 'src/app/models/PesquisaDocentes';
import { ImgSrcDirective } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { RequestPesquisaMembros } from 'src/app/models/request-pesquisa-membro';
import { MembroService } from 'src/app/service/membro/membro.service';
import { ResponsePesquisaDetalhadoMembros } from 'src/app/models/response-pesquisa-detalhado-membro';


@Component({
  selector: 'app-pesquisa-detalhada-membro',
  templateUrl: './pesquisa-detalhada-membro.component.html',
  styleUrls: ['./pesquisa-detalhada-membro.component.css']
})
export class PesquisaDetalhadaMembroComponent implements OnInit {
  sexoList: Array<any>;
  estadoCivilList: Array<any>;
  zonaList: Array<any>;
  areaAtuacaoList:Array<TemaClassificacao>;
  statusDocenteList:Array<Parametro>;
  temaAtuacaoList:any[];
  pesquisaMembroDetalhadaForm: any;
  parametroAtuacaoList: any;
  resultadoPesquisaDocente: any[];
  membroList: Array<ResponsePesquisaDetalhadoMembros>;
  pesquisaMembros:RequestPesquisaMembros;
  pesquisaPublica:PesquisaPublica;
  formacaoInicialList:string[];
  exibirMsgRegistro:boolean;
  imageSrc: string;
  listImage:string[];
  @BlockUI() blockUI: NgBlockUI;
  conjuge:boolean
  lidergcList:Array<any>;
  funcaoMembroList:Array<any>;

  constructor(
    private parametroService: ParametroService,
    private docenteService: DocenteService,
    public router: Router,
    private membroService:MembroService

  ) {

    
   }

  ngOnInit() {
    this.creatForm();
      this.exibirMsgRegistro=false;
      this.getListSexo();
      this.getListEstadoCivil();
      this.getListPais();
      this.getListOpcaoFlagLiderGc();
      this.getListFuncaoMembro();
      }

  private creatForm() {

    this.pesquisaMembroDetalhadaForm = new FormGroup({
    nomeMembro: new FormControl(''),
    estadoCivil: new FormControl(''),
    sexo: new FormControl(''),
    zona: new FormControl(''),
    status: new FormControl(''),
    flagLiderGc:new FormControl(''),
    funcaoMembro:new FormControl('')

    
     });
   }
 
   private getListSexo() {
     this.sexoList = new Array<any>();
     this.parametroService.findByNomeConstante("SEXO").subscribe(listRetorno => {
       listRetorno.forEach(element => {
         this.sexoList.push(element);
       });
     })
   }
 
   private getListEstadoCivil() {
    this.estadoCivilList = new Array<any>();
    this.parametroService.findByNomeConstante("ESTADO_CIVIL").subscribe(listRetorno => {
      listRetorno.forEach(element => {
        this.estadoCivilList.push(element);
      });
    })
  }
  private getListPais() {
    this.zonaList = new Array<any>();
    this.parametroService.findByNomeConstante("ZONA").subscribe(listRetorno => {
      listRetorno.forEach(element => {
        this.zonaList.push(element);
      });
    })
  }

      pesquisar(){
    this.obterFiltro();
    this.getMembros();
    
  }

   private obterFiltro(){

    this.pesquisaMembros = new RequestPesquisaMembros();

    this.pesquisaMembros.nomeMembro= this.pesquisaMembroDetalhadaForm.controls['nomeMembro'].value;
    this.pesquisaMembros.estadoCivil=this.pesquisaMembroDetalhadaForm.controls['estadoCivil'].value;
    this.pesquisaMembros.sexo=this.pesquisaMembroDetalhadaForm.controls['sexo'].value;
    this.pesquisaMembros.zona=this.pesquisaMembroDetalhadaForm.controls['zona'].value;
    this.pesquisaMembros.funcaoMembro=this.pesquisaMembroDetalhadaForm.controls['funcaoMembro'].value;
    this.pesquisaMembros.flagLiderGc=this.pesquisaMembroDetalhadaForm.controls['flagLiderGc'].value;



    //this.pesquisaMembroDetalhadaForm.idStatus=this.pesquisaPublicaForm.controls['status'].value;

  }

  
  private getMembros() {
    this.membroList = new Array<ResponsePesquisaDetalhadoMembros>();
    url:String;
    this.blockUI.start();

    this.membroService.findByMembroDetalhado(this.pesquisaMembros).subscribe(listRetorno => {
      listRetorno.forEach((element:ResponsePesquisaDetalhadoMembros) => {
        if (element.imgPerfil != null) {
          element.fotoUrl = ('data:image/jpeg;base64,' + element.imgPerfil)
        }
        this.membroList.push(element);
              });

      this.blockUI.stop();

    })
  }

  

  private detalharDocente(id){

    this.router.navigate(['detalhar-docente/detalhar'],{queryParams:{id}});
    }
  
    private getListOpcaoFlagLiderGc() {
      this.lidergcList = new Array<any>();
      this.parametroService.findByNomeConstante("RESPOSTA").subscribe(listRetorno => {
        listRetorno.forEach(element => {
          this.lidergcList.push(element);
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


}

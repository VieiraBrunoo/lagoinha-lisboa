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


@Component({
  selector: 'app-pesquisa-detalhada-membro',
  templateUrl: './pesquisa-detalhada-membro.component.html',
  styleUrls: ['./pesquisa-detalhada-membro.component.css']
})
export class PesquisaDetalhadaMembroComponent implements OnInit {
  sexoList: Array<any>;
  estadoCivilList: Array<any>;
  paisList: Array<any>;
  areaAtuacaoList:Array<TemaClassificacao>;
  statusDocenteList:Array<Parametro>;
  temaAtuacaoList:any[];
  pesquisaPublicaForm: any;
  parametroAtuacaoList: any;
  resultadoPesquisaDocente: any[];
  docenteList: Array<PesquisaPublica>;
  pesquisaDocentes:PesquisaDocentes;
  pesquisaPublica:PesquisaPublica;
  formacaoInicialList:string[];
  exibirMsgRegistro:boolean;
  imageSrc: string;
  listImage:string[];
  @BlockUI() blockUI: NgBlockUI;
  conjuge:boolean


  constructor(
    private parametroService: ParametroService,
    private docenteService: DocenteService,
    public router: Router
  ) {

    
   }

  ngOnInit() {
    this.creatForm();
      this.exibirMsgRegistro=false;
      this.getListSexo();
      this.getListEstadoCivil();
      this.getListPais();

      }

  private creatForm() {

    this.pesquisaPublicaForm = new FormGroup({
    nomeDocente: new FormControl(''),
    areaAtuacao: new FormControl(''),
    tema: new FormControl(''),
    titulacao: new FormControl('')
    
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
    this.paisList = new Array<any>();
    this.parametroService.findByNomeConstante("PAIS").subscribe(listRetorno => {
      listRetorno.forEach(element => {
        this.paisList.push(element);
      });
    })
  }
      pesquisar(){
    this.obterFiltro();
    this.getDocentes();
    
  }

 


    habilitarCampos(){


    }


   private obterFiltro(){

    this.pesquisaDocentes = new PesquisaDocentes();

    this.pesquisaDocentes.nomeDocente= this.pesquisaPublicaForm.controls['nomeDocente'].value;
    this.pesquisaDocentes.idAreaAtuacao=this.pesquisaPublicaForm.controls['areaAtuacao'].value;
    this.pesquisaDocentes.idTema=this.pesquisaPublicaForm.controls['tema'].value;
    this.pesquisaDocentes.idTitulacao=this.pesquisaPublicaForm.controls['titulacao'].value;
    //this.pesquisaPublicaForm.idStatus=this.pesquisaPublicaForm.controls['status'].value;

  }

  private getDocentes() {
    this.docenteList = new Array<PesquisaPublica>();
    this.listImage = new Array<string>();
    this.pesquisaPublica  = new PesquisaPublica();
    this.resultadoPesquisaDocente = new Array<any>();
    this.blockUI.start();
    this.docenteService.pesquisaPublica(this.pesquisaDocentes).subscribe(listRetorno => {
      listRetorno.forEach((element: PesquisaPublica) => {
      if(element.imgDocente!=null){
      element.imgDocente=('data:image/jpeg;base64,' + element.imgDocente)
      }
      this.docenteList.push(element);
      });
      this.blockUI.stop();

      if(this.docenteList.length == 0){

        this.exibirMsgRegistro=true;
       } else{
         this.exibirMsgRegistro=false;
       } 
        })



        

  }


  private detalharDocente(id){

    this.router.navigate(['detalhar-docente/detalhar'],{queryParams:{id}});
    }
  
  


}

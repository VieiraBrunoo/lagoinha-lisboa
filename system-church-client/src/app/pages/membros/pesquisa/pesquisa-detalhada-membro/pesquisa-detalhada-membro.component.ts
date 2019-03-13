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
  titulacaoList: Array<Parametro>;
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


  constructor(
    private _formBuilder: FormBuilder,
    private escolaService: EscolaService,
    private tribunalService: TribunalService,
    private temaClassificacaoService: TemaClassificacaoService,
    private temaAtuacaoService: TemaAtuacaoService,
    private parametroService: ParametroService,
    private docenteService: DocenteService,
    public router: Router
  ) {

    
   }

  ngOnInit() {
    this.creatForm();
    this.getListTitulacoes();
    this.getListAreaAtuacao();
    this.getListStatusDocente();
    this.exibirMsgRegistro=false;
      }

  private creatForm() {

    this.pesquisaPublicaForm = new FormGroup({
    nomeDocente: new FormControl(''),
    areaAtuacao: new FormControl(''),
    tema: new FormControl(''),
    titulacao: new FormControl('')
    
     });
   }
 
   private getListTitulacoes() {
     this.titulacaoList = new Array<Parametro>();
     this.parametroService.findByNomeConstante("TITULACAO").subscribe(listRetorno => {
       listRetorno.forEach(element => {
         this.titulacaoList.push(element);
       });
     })
   }
 
   private getListAreaAtuacao() {
     this.areaAtuacaoList= new Array<TemaClassificacao>();
     this.temaClassificacaoService.findAll().subscribe(listRetorno => {
       listRetorno.forEach(element => {
         this.areaAtuacaoList.push(element);
       });
     })
   }
 
   private getListStatusDocente() {
     this.statusDocenteList = new Array<Parametro>();
     this.parametroService.findByNomeConstante("STATUS_DOCENTE").subscribe(listRetorno => {
       listRetorno.forEach(element => {
         this.statusDocenteList.push(element);
       });
     })
   }
 
   onAreaAtuacaoChanged(idAreaAtuacao: number) {
     this.temaAtuacaoList = new Array<TemaAtuacao>();
     this.temaAtuacaoService.findByTemaAtuacao(idAreaAtuacao).subscribe(listRetorno => {
       this.temaAtuacaoList = [listRetorno.length];
       let index = 0;
       listRetorno.forEach(element => {
         this.temaAtuacaoList[index] = {'id': element.id, 'descricao': element.descricao, 'temaClassificacao': element.temaClassificacao.id};
         index++;
       });
     })
   }
   onTemaChanged(idTema: number) {
     this.temaAtuacaoList = new Array<TemaAtuacao>();
     this.temaAtuacaoService.findByTemaClassificacao(idTema).subscribe(listRetorno => {
       this.temaAtuacaoList = [listRetorno.length];
       let index = 0;
       listRetorno.forEach(element => {
         this.temaAtuacaoList[index] = {'id': element.id, 'descricao': element.descricao, 'temaClassificacao': element.temaClassificacao.id};
         index++;
       });
     })
   }



   pesquisar(){
    this.obterFiltro();
    this.getDocentes();
    
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

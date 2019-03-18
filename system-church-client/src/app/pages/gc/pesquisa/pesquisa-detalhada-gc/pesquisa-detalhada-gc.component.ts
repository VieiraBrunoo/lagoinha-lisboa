import { Component, OnInit } from '@angular/core';
import { Parametro } from 'src/app/models/parametro';
import { TemaClassificacao } from 'src/app/models/temaClassificacao';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ParametroService } from 'src/app/service/parametro/parametro.service';
import { GcService } from 'src/app/service/gc/gc.service';
import { MembroService } from 'src/app/service/membro/membro.service';
import { Gc} from 'src/app/models/gc';
import { Router } from '@angular/router';
import { NgBlockUI, BlockUI } from 'ng-block-ui';


@Component({
  selector: 'app-pesquisa-detalhada-gc',
  templateUrl: './pesquisa-detalhada-gc.component.html',
  styleUrls: ['./pesquisa-detalhada-gc.component.css']
})
export class PesquisaDetalhadaGcComponent implements OnInit {
  zonaList: Array<any>;
  membroList: Array<any>;
  horarioList: Array<any>;
  pesquisaGcForm: any;
  resultadoPesquisaGc: any[];
  gcList: Array<Gc>;
  pesquisaGc:Gc;
  formacaoInicialList:string[];
  exibirMsgRegistro:boolean;
  imageSrc: string;
  listImage:string[];
  @BlockUI() blockUI: NgBlockUI;
  conjuge:boolean


  constructor(
    private parametroService: ParametroService,
    private gcService: GcService,
    private membroService:MembroService,
    public router: Router
  ) {

    
   }

  ngOnInit() {
    this.creatForm();
      this.exibirMsgRegistro=false;
      this.getListZona();
      this.getListMembro();
      this.getListHorario();

      }

  private creatForm() {

    this.pesquisaGcForm = new FormGroup({
    nome: new FormControl(''),
    idMembroResponsavel: new FormControl(''),
    zona: new FormControl(''),
    logradouro: new FormControl(''),
    horario: new FormControl('')
    
     });
   }
 
   private getListZona() {
     this.zonaList = new Array<any>();
     this.parametroService.findByNomeConstante("ZONA").subscribe(listRetorno => {
       listRetorno.forEach(element => {
         this.zonaList.push(element);
       });
     })
   }
 
   private getListHorario() {
    this.horarioList = new Array<any>();
    this.parametroService.findByNomeConstante("HORARIO_GC").subscribe(listRetorno => {
      listRetorno.forEach(element => {
        this.horarioList.push(element);
      });
    })
  }
  private getListMembro() {
    this.membroList = new Array<any>();
    this.membroService.findAll().subscribe(listRetorno => {
      listRetorno.forEach(element => {
        this.membroList.push(element);
      });
    })
  }
      pesquisar(){
    this.obterFiltro();
    this.getGc();
    
  }
    habilitarCampos(){
    }


   private obterFiltro(){

    this.pesquisaGc = new Gc();

    this.pesquisaGc.nome= this.pesquisaGcForm.controls['nome'].value;
    this.pesquisaGc.membroResponsavel.id= this.pesquisaGcForm.controls['idMembroResponsavel'].value;
    this.pesquisaGc.zona= this.pesquisaGcForm.controls['zona'].value;
    this.pesquisaGc.logradouro= this.pesquisaGcForm.controls['logradouro'].value;
    this.pesquisaGc.horario= this.pesquisaGcForm.controls['horario'].value;
  }

  private getGc() {
    this.gcList = new Array<Gc>();
    this.pesquisaGc  = new Gc();
    this.resultadoPesquisaGc = new Array<any>();
    this.blockUI.start();
    this.gcService.findById(this.pesquisaGc.id).subscribe(listRetorno => {
      listRetorno.forEach((element: Gc) => {
      this.gcList.push(element);
      });
      this.blockUI.stop();
      if(this.gcList.length == 0){
        this.exibirMsgRegistro=true;
       } else{
         this.exibirMsgRegistro=false;
       } 
        })



        

  }


  private detalharDocente(id){

    this.router.navigate(['detalhar-gc/detalhar'],{queryParams:{id}});
    }
  
  


}

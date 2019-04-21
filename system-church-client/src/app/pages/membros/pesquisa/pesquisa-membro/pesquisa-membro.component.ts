import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ParametroService } from 'src/app/service/parametro/parametro.service';
import { EscolaService } from 'src/app/service/escola/escola.service';
import { TribunalService } from 'src/app/service/tribunal/tribunal.service';
import { TemaClassificacaoService } from 'src/app/service/tema-classificacao/tema.classificacao.service';
import { TemaAtuacaoService } from 'src/app/service/tema-atuacao/tema.atuacao.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Parametro } from 'src/app/models/parametro';
import { TemaClassificacao } from 'src/app/models/temaClassificacao';
import { DocenteService } from 'src/app/service/docente/docente.service';
import { ResultadoPesquisaDocente } from 'src/app/models/resultado-pesquisa-docente';
import { Router } from '@angular/router';
import { RequestPesquisaMembros } from 'src/app/models/request-pesquisa-membro';
import { MembroService } from 'src/app/service/membro/membro.service';
import { ResponsePesquisaMembros } from 'src/app/models/response-pesquisa-membro';
import { ToasterService } from 'angular2-toaster';




export interface PeriodicElement {
  nome: string;
  estadoCivil:string;
  morada: string;
  gc: string;
}

@Component({
  selector: 'app-pesquisa-membro',
  templateUrl: './pesquisa-membro.component.html',
  styleUrls: ['./pesquisa-membro.component.css']
})


export class PesquisaMembroComponent implements OnInit {
  zonaList:Array<any>;
  lidergcList:Array<any>;
  temaAtuacaoList:any[];
  displayedColumns: string[] = ['nome', 'estadoCivil', 'morada', 'gc','button'];
  membroList:Array<ResponsePesquisaMembros>;
  dataSource = new MatTableDataSource<any>();
  color = 'accent';
  checkedList:any[];
  disabled = false;
  resultadoPesquisa: boolean = false;
  selection = new SelectionModel<ResultadoPesquisaDocente>(true, []);
   @ViewChild(MatPaginator) paginator: MatPaginator;
 // selection = new SelectionModel<PeriodicElement>(true, []);
 pesquisarMembrosForm: any;
  parametroAtuacaoList: any;

  pesquisaMembros:RequestPesquisaMembros;
  estadoCivilList: Array<any>;
  sexoList: Array<any>;
  private toasterService: ToasterService;

  constructor(
    private parametroService: ParametroService,
    public router: Router,
    private membroService:MembroService,
     toasterService: ToasterService) {
       
  this.toasterService = toasterService;
  }

  ngOnInit() {
    this.creatForm();
    this.membroList = new Array<ResponsePesquisaMembros>();
    this.dataSource.paginator = this.paginator;
    this.getListZona();
    this.getListSexo();
    this.getListEstadoCivil();
    this.getListOpcaoFlagLiderGc();
  }

  private creatForm() {

   this.pesquisarMembrosForm = new FormGroup({
   nomeMembro: new FormControl(''),
   estadoCivil: new FormControl(''),
   sexo: new FormControl(''),
   zona: new FormControl(''),
   status: new FormControl(''),
   flagLiderGc: new FormControl(''),

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

  
  private getListEstadoCivil() {
    this.estadoCivilList = new Array<any>();
    this.parametroService.findByNomeConstante("ESTADO_CIVIL").subscribe(listRetorno => {
      listRetorno.forEach(element => {
        this.estadoCivilList.push(element);
      });
    })
  }
  private getListSexo() {
    this.sexoList = new Array<any>();
    this.parametroService.findByNomeConstante("SEXO").subscribe(listRetorno => {
      listRetorno.forEach(element => {
        this.sexoList.push(element);
      });
    })
  }
  pesquisar(){
    this.obterFiltroMembros();
    this.getMembros();
  }


  private obterFiltroMembros(){

    this.pesquisaMembros = new RequestPesquisaMembros();

    this.pesquisaMembros.nomeMembro= this.pesquisarMembrosForm.controls['nomeMembro'].value;
    this.pesquisaMembros.estadoCivil=this.pesquisarMembrosForm.controls['estadoCivil'].value;
    this.pesquisaMembros.sexo=this.pesquisarMembrosForm.controls['sexo'].value;
    this.pesquisaMembros.zona=this.pesquisarMembrosForm.controls['zona'].value;
    this.pesquisaMembros.status=this.pesquisarMembrosForm.controls['status'].value;
    this.pesquisaMembros.flagLiderGc=this.pesquisarMembrosForm.controls['flagLiderGc'].value;

    
  }



  private getMembros() {
    this.membroService.findByMembro(this.pesquisaMembros).subscribe(listRetorno => {
      if(listRetorno.length==0){
        this.resultadoPesquisa=true;
         this.dataSource.data=[];
      } else{
        this.resultadoPesquisa=false;
      }
      listRetorno.forEach(element => {
        this.membroList= new Array<ResponsePesquisaMembros>();
        this.dataSource.data=listRetorno;
        this.membroList.push(element);
              });
    })
  }

  private detalharMembro(id){

  this.router.navigate(['detalhar-membro/detalhar-membro'],{queryParams:{id}});
  }



  novo() {
    this.router.navigate(['cadastro-membro']);
  }

  private getListOpcaoFlagLiderGc() {
    this.lidergcList = new Array<any>();
    this.parametroService.findByNomeConstante("RESPOSTA").subscribe(listRetorno => {
      listRetorno.forEach(element => {
        this.lidergcList.push(element);
    });
  });
}


private editarMembro(id) {
  this.router.navigate(['cadastro-membro'], { queryParams: { id } });
}


private obterToggleButton(id, status) {

  if (status == 'INATIVO') {
    status = 'ATIVO';
  } else {
    status = 'INATIVO';
  }

  this.membroService.ativarDesativarMembro(id, status).subscribe(list => {
  });
   this.toasterService.pop('success', 'Membro' + '' + status + '' + 'com Sucesso!');

}
}

 

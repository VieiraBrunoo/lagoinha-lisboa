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
import { TemaAtuacao } from 'src/app/models/temaAtuacao';
import { TemaClassificacao } from 'src/app/models/temaClassificacao';
import { PesquisaDocentes } from 'src/app/models/PesquisaDocentes';
import { DocenteService } from 'src/app/service/docente/docente.service';
import { ResultadoPesquisaDocente } from 'src/app/models/resultado-pesquisa-docente';
import { Router } from '@angular/router';




export interface PeriodicElement {
  cpf: number;
  nome:string;
  ramo: string;
  tribunal: string;
}

@Component({
  selector: 'app-pesquisa-membro',
  templateUrl: './pesquisa-membro.component.html',
  styleUrls: ['./pesquisa-membro.component.css']
})


export class PesquisaMembroComponent implements OnInit {
  titulacaoList: Array<Parametro>;
  areaAtuacaoList:Array<TemaClassificacao>;
  zonaList:Array<any>;
  horarioGcList:Array<any>;
  temaAtuacaoList:any[];
  resultadoPesquisaDocente:ResultadoPesquisaDocente;
  displayedColumns: string[] = ['cpf', 'nome', 'ramo', 'tribunal','button'];
  docenteList:Array<ResultadoPesquisaDocente>;
  dataSource = new MatTableDataSource<any>();
  color = 'accent';
  checkedList:any[];
  disabled = false;
  resultadoPesquisa: boolean = false;
  selection = new SelectionModel<ResultadoPesquisaDocente>(true, []);
   @ViewChild(MatPaginator) paginator: MatPaginator;
 // selection = new SelectionModel<PeriodicElement>(true, []);
  pesquisarDocentesForm: any;
  parametroAtuacaoList: any;

  pesquisaDocentes:PesquisaDocentes;
  constructor(
    private _formBuilder: FormBuilder,
    private escolaService: EscolaService,
    private tribunalService: TribunalService,
    private temaClassificacaoService: TemaClassificacaoService,
    private temaAtuacaoService: TemaAtuacaoService,
    private parametroService: ParametroService,
    private docenteService: DocenteService,
    public router: Router,

 ) { 

    
  }

  ngOnInit() {
    this.creatForm();
    this.resultadoPesquisaDocente = new ResultadoPesquisaDocente();
    this.docenteList = new Array<ResultadoPesquisaDocente>();
    this.dataSource.paginator = this.paginator;
    this.getListZona();
    this.getListHorarioGc();

  }

  private creatForm() {

   this.pesquisarDocentesForm = new FormGroup({
   nomeDocente: new FormControl(''),
   areaAtuacao: new FormControl(''),
   tema: new FormControl(''),
   titulacao: new FormControl(''),
   status: new FormControl(''),
   ativarDesativar: new FormControl
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

  
  private getListHorarioGc() {
    this.horarioGcList = new Array<any>();
    this.parametroService.findByNomeConstante("HORARIO_GC").subscribe(listRetorno => {
      listRetorno.forEach(element => {
        this.horarioGcList.push(element);
      });
    })
  }


  

  pesquisar(){
    this.obterFiltroDocentes();
    this.getDocentes();
  }


  private obterFiltroDocentes(){

    this.pesquisaDocentes = new PesquisaDocentes();

    this.pesquisaDocentes.nomeDocente= this.pesquisarDocentesForm.controls['nomeDocente'].value;
    this.pesquisaDocentes.idAreaAtuacao=this.pesquisarDocentesForm.controls['areaAtuacao'].value;
    this.pesquisaDocentes.idTema=this.pesquisarDocentesForm.controls['tema'].value;
    this.pesquisaDocentes.idTitulacao=this.pesquisarDocentesForm.controls['titulacao'].value;
    this.pesquisaDocentes.idStatus=this.pesquisarDocentesForm.controls['status'].value;

  }



  private getDocentes() {
    this.docenteService.findByDocente(this.pesquisaDocentes).subscribe(listRetorno => {
      if(listRetorno.length==0){
        this.resultadoPesquisa=true;
         this.dataSource.data=[];
      } else{
        this.resultadoPesquisa=false;
      }
      listRetorno.forEach(element => {
        this.docenteList= new Array<ResultadoPesquisaDocente>();
        this.dataSource.data=listRetorno;
        this.docenteList.push(element);
              });
    })
  }


  private obterToggleButton(id,status){

    if(status=='I'){

      status='A';
    } else{

      status='I';
    }
  
    this.docenteService.findById(id,status).subscribe(list => {
      this.getDocentes();        
       
       
  
    });

   
  }

  private detalharDocente(id){

  this.router.navigate(['detalhar-docente/detalhar'],{queryParams:{id}});
  }



  novo() {
    this.router.navigate(['cadastro-membro']);
  }

 }

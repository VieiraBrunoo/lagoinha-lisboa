import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ParametroService } from 'src/app/service/parametro/parametro.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Parametro } from 'src/app/models/parametro';
import { GcService } from 'src/app/service/gc/gc.service';
import { MembroService } from 'src/app/service/membro/membro.service';
import { Gc } from 'src/app/models/gc';
import { Router } from '@angular/router';
import { Membro } from 'src/app/models/membro';
import { ResponsePesquisaMembros } from 'src/app/models/response-pesquisa-membro';

@Component({
  selector: 'app-pesquisa-gc',
  templateUrl: './pesquisa-gc.component.html',
  styleUrls: ['./pesquisa-gc.component.css']
})


export class PesquisaGcComponent implements OnInit {
  zonaList:Array<any>;
  horarioGcList:Array<any>;
  membroList:Array<any>;
  resultadoPesquisaGc:ResponseGcDto;
  displayedColumns: string[] = ['nome', 'logradouro', 'zona', 'horario', 'responsavel','button'];
  gcList:Array<ResponseGcDto>;
  dataSource = new MatTableDataSource<any>();
  color = 'accent';
  checkedList:any[];
  disabled = false;
  resultadoPesquisa: boolean = false;
  selection = new SelectionModel<Gc>(true, []);
   @ViewChild(MatPaginator) paginator: MatPaginator;
 // selection = new SelectionModel<PeriodicElement>(true, []);
  pesquisaGcForm: any;
  parametroAtuacaoList: any;

  pesquisaGc:GcDto;
  constructor(
    private _formBuilder: FormBuilder,
    private parametroService: ParametroService,
    private gcService: GcService,
    private membroService:MembroService,
    public router: Router,

 ) { 

    
  }

  ngOnInit() {
    this.creatForm();
    this.resultadoPesquisaGc = new ResponseGcDto();
    this.gcList = new Array<ResponseGcDto>();
    this.dataSource.paginator = this.paginator;
    this.getListZona();
    this.getListHorarioGc();
    this.getListMembro();

  }

  private creatForm() {

   this.pesquisaGcForm = new FormGroup({
   nome: new FormControl(''),
   logradouro: new FormControl(''),
   zona: new FormControl(''),
   horario: new FormControl(''),
   idMembroResponsavel: new FormControl(''),
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

  private getListMembro() {
    this.membroList = new Array<Membro>();
    this.membroService.findAll().subscribe(listRetorno => {
      listRetorno.forEach(element => {
        this.horarioGcList.push(element);
      });
    })
  }
  

  pesquisar(){
    this.obterFiltroGc();
    this.getGc();
  }


  private obterFiltroGc(){

    this.pesquisaGc = new GcDto();

    this.pesquisaGc.nomeGc= this.pesquisaGcForm.controls['nome'].value;
    this.pesquisaGc.zona= this.pesquisaGcForm.controls['zona'].value;
    this.pesquisaGc.horario= this.pesquisaGcForm.controls['horario'].value;
   this.pesquisaGc.idLider= this.pesquisaGcForm.controls['idMembroResponsavel'].value;
  }



  private getGc() {
    this.gcService.findGcByParams(this.pesquisaGc).subscribe(listRetorno => {
      if(listRetorno.length==0){
        this.resultadoPesquisa=true;
         this.dataSource.data=[];
      } else{
        this.resultadoPesquisa=false;
      }
      listRetorno.forEach(element => {
        this.gcList= new Array<ResponseGcDto>();
        this.dataSource.data=listRetorno;
        this.gcList.push(element);
              });
    })
  }


  private obterToggleButton(id,status){

    if(status=='I'){
      status='A';
    } else{
      status='I';
    }
    this.gcService.findOne(id).subscribe(list => {
      this.getGc();        
    });
  }

  private detalharGc(idGc){
  this.router.navigate(['detalhar-gc'],{queryParams:{idGc}});
  }



  novo() {
    this.router.navigate(['cadastro-gc']);
  }

 }


 export class GcDto {
  nomeGc:string;
  zona:string;
  horario:string;
  idLider:number
}

export class ResponseGcDto {
  nome:string;
  diaSemana:string;
  endereco:string;
  idLider:number
  horario:string;
  zona: string;
  nomeLider:string;
  membros:Array<ResponsePesquisaMembros>;
}

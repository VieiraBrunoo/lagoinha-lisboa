import { Acao } from '../../../../models/acao';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, PageEvent } from '@angular/material';
import { SiecWsService } from 'src/app/service/siec-ws/siec.ws.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaterialErrorState } from 'src/app/pages/util/material-error-state';
import { ParametroService } from 'src/app/service/parametro/parametro.service';

@Component({
  selector: 'app-dados-familiares',
  templateUrl: './dados-familiares.component.html',
  styleUrls: ['./dados-familiares.component.css']
})
export class DadosFamiliaresComponent implements OnInit {

  colunas: string[] = ['nomeStr', 'descricaoStr', 'acao', 'carga', 'dataInicial', 'dataFinal'];
  showGrid: boolean = false;
  acao: Acao;
  nomeMembro:string;
  acaoList: Array<Acao>;
  dataSourceOutros: MatTableDataSource<any>;
  dataSourceCapacitacaoEnfam: MatTableDataSource<any>;
  dataSourceCapacitacaoDocentes: MatTableDataSource<any>;
  showCapacitacaoDocentes: boolean  = false;
  showCapacitacaoEnfam: boolean = false;
  pageEvent: PageEvent;
  capacitacaoDiscenteListLength: number;
  capacitacaoDiscenteEnfamListLength: number;
  cpfDocente: number;
  dadosFamiliaresForm: FormGroup;
  estadoCivilList: Array<any>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginatorCapacitacaoDocentes: MatPaginator;
  @ViewChild(MatPaginator) paginatorCapacitacaoEnfam: MatPaginator;
  errorState: MaterialErrorState;

  constructor(
    public dialog: MatDialog,
    private siecWsService: SiecWsService,
    private parametroService: ParametroService,
    ) {}

  ngOnInit() {
    this.acao = new Acao();
    this.acaoList = new Array<Acao>();
    this.dataSourceCapacitacaoDocentes = new MatTableDataSource<any>(null);
    //this.dataSourceCapacitacaoDocentes.paginator = this.paginatorCapacitacaoDocentes;
    this.creatForm();
    this.getLisEstadoCivil();
  }

  ngAfterViewInit() {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourceOutros.filter = filterValue;
  }



  private creatForm() {
    this.errorState = new MaterialErrorState;
    this.dadosFamiliaresForm = new FormGroup({
      nomePai: new FormControl('', Validators.required),
      nomeMae: new FormControl('',Validators.required),
      estadoCivil:  new FormControl('',Validators.required),
      nomeConjuge: new FormControl(''),
      dataCasamento: new FormControl(''),
      qtdFilhos: new FormControl('')
    });
  }


  getLisEstadoCivil() {
    this.estadoCivilList = new Array<any>();
    this.parametroService.findByNomeConstante("ESTADO_CIVIL").subscribe(listRetorno => {
      listRetorno.forEach(element => {
        this.estadoCivilList.push(element);
      });
    });
  }



/*
  abrirModal() {
    const dialogRef = this.dialog.open(AcoesDialogComponent, {
      panelClass: 'full-width-dialog',
      data: {
        escola: this.acao.escola,
        tipo: this.acao.flagTipoAcao,
        acao: this.acao.descricao,
        cargaHoraria: this.acao.cargaHoraria,
        dataInicial: this.acao.dataInicial,
        dataFinal: this.acao.dataFinal,
        nomeStr: this.acao.nomeStr,
        descricaoStr: this.acao.descricaoStr,
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result != undefined) {
        let acao = new Acao();
        acao.escola = result.escola;
        acao.flagTipoAcao = result.tipo;
        acao.descricao = result.acao;
        acao.cargaHoraria = result.cargaHoraria;
        acao.dataInicial = result.dataInicial;
        acao.dataFinal = result.dataFinal;
        acao.flagTipoAtuacao = 'A';
  
        acao.nomeStr = result.nomeStr;
        acao.descricaoStr = result.descricaoStr;
  
        this.acaoList.push(acao);
  
        this.showGrid = true;
        this.dataSourceOutros = new MatTableDataSource<any>(this.acaoList);
        this.dataSourceOutros.paginator = this.paginator;
      }
    });
  }

  buscarUsuario(event) {

    let cpf = event.replace(/\./gi, "").replace(/\-/gi, "");

    if (cpf !== '') {

      this.siecWsService.buscarAcoesComoDiscente(cpf, 'ENFAM').subscribe(listRetorno => {
     
          this.showCapacitacaoEnfam = true;
          this.capacitacaoDiscenteEnfamListLength = listRetorno.length;
          this.dataSourceCapacitacaoEnfam.data = listRetorno;
          //this.dataSourceCapacitacaoEnfam.paginator = this.paginatorCapacitacaoEnfam;
 
      });

      this.siecWsService.buscarAcoesComoDiscente(cpf, 'DOCENTES').subscribe(listRetorno => {
          this.showCapacitacaoDocentes = true;
          this.capacitacaoDiscenteListLength = listRetorno.length;
          this.dataSourceCapacitacaoDocentes.data = listRetorno;
          this.dataSourceCapacitacaoDocentes.paginator = this.paginatorCapacitacaoDocentes;
      });
    }
  } */
}
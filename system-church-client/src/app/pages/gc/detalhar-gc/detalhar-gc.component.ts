import { Component, OnInit,ViewChild } from '@angular/core';
import { GcService } from 'src/app/service/gc/gc.service';
import { ActivatedRoute } from '@angular/router';
import { Gc } from 'src/app/models/gc';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { ResponseGcDto } from '../pesquisa/pesquisa-gc/pesquisa-gc.component';


@Component({
  selector: 'app-detalhar-gc',
  templateUrl: './detalhar-gc.component.html',
  styleUrls: ['./detalhar-gc.component.css']
})
export class DetalharGcComponent implements OnInit {
  idGc:number;
  gc:ResponseGcDto;
  @BlockUI() blockUI: NgBlockUI;
  displayedColumns: string[] = ['Nº','Nome', 'Telefone', 'Data/Hora Cadastro'];
  dataSource = new MatTableDataSource<any>();
  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private gcService: GcService,
    private route:ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(
     (queryParams:any) => {
      this.idGc=queryParams['idGc'];
     } 
    )
     this.obterGc(this.idGc);
     this.dataSource.paginator = this.paginator;

  }

private obterGc(id){
  this.gc = new ResponseGcDto();
   this.blockUI.start();
   this.gcService.detalharGc(id).subscribe((listRetorno:ResponseGcDto) => {
    
    this.gc.nome = listRetorno.nome;
    this.gc.nomeLider = listRetorno.nomeLider;
    this.gc.diaSemana = listRetorno.diaSemana;
    this.gc.horario = listRetorno.horario;
    this.gc.endereco = listRetorno.endereco;
    this.gc.zona = listRetorno.zona;
    this.gc.membros = listRetorno.membros;
    this.dataSource.data = this.gc.membros;
    
  });
   this.blockUI.stop();

}





}

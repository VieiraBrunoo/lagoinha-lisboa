import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ParametroService } from '../../../../service/parametro/parametro.service';
import { MembroService } from 'src/app/service/membro/membro.service';
import { Membro } from 'src/app/models/membro';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css'],
})
export class DadosComponent implements OnInit, AfterViewInit {

  
  ngAfterViewInit(): void { }

  flags: any[] = [
    { key: 'S', value: 'Sim' },
    { key: 'N', value: 'Não' }
  ];

  dadosForm: FormGroup;
  url: any;
  exibirBotaoRemover: boolean;
  zonaList: Array<any>;
  horarioList: Array<any>;
  membroList: Array<any>;
  
  
  constructor(
    private parametroService: ParametroService,
    private membroService: MembroService,
    public dialog: MatDialog) {
  }


  ngOnInit() {
    this.creatForm();
    this.getListMembro();
    this.getListZona();
    this.getListHorario();
  }

  private creatForm() {

    this.dadosForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      diaSemana: new FormControl('', Validators.required),
      logradouro: new FormControl('', Validators.required),
      zona: new FormControl('', Validators.required),
      horario: new FormControl('', Validators.required),
      idMembroResponsavel: new FormControl('', [Validators.required]),

 });

  }

  
  getListHorario() {
    this.horarioList = new Array<any>();
    this.parametroService.findByNomeConstante("HORARIO_GC").subscribe(listRetorno => {
      listRetorno.forEach(element => {
        this.horarioList.push(element);
      });
    });
  }

  getListZona() {
    this.zonaList = new Array<any>();
    this.parametroService.findByNomeConstante("ZONA").subscribe(listRetorno => {
      listRetorno.forEach(element => {
        this.zonaList.push(element);
      });
    });
  }

  getListMembro() {
    this.membroList = new Array<Membro>();
    this.membroService.findAll().subscribe(listRetorno => {
      listRetorno.forEach(element => {
        this.membroList.push(element);
      });
    });
  }
}
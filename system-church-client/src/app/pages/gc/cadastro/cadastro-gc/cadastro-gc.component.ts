
import { DadosComponent } from '../dados/dados.component';
import { Component, OnInit, ViewChild, QueryList } from '@angular/core';
import { MatStepper, MatTableDataSource, MatPaginator } from '@angular/material';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { GcService } from 'src/app/service/gc/gc.service';
import { Gc } from 'src/app/models/gc';


@Component({
  selector: 'app-cadastro-gc',
  templateUrl: './cadastro-gc.component.html',
  styleUrls: ['./cadastro-gc.component.css'],
})
export class CadastroGcComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('dados') dados: DadosComponent;
  @BlockUI() blockUI: NgBlockUI;

  isOptional = false;
  gc: Gc;

  constructor(private gcService: GcService) {
  }

  ngOnInit() { }


  salvar() {
      this.blockUI.start();
      this.createGc();
      
      this.gcService.save(this.gc).subscribe(data => {

        if (data == null) {
          this.blockUI.stop();
        }
  });
   // }
  }

  private createGc() {

    this.gc = new Gc();

    //Dados Pessoais
    this.gc.nome = this.dados.dadosForm.controls['nome'].value;
    this.gc.diaSemana = this.dados.dadosForm.controls['diaSemana'].value;
    this.gc.logradouro = this.dados.dadosForm.controls['logradouro'].value;
    this.gc.zona = this.dados.dadosForm.controls['zona'].value;
    this.gc.horario = this.dados.dadosForm.controls['horario'].value;
    //Dados Lider GC
    this.gc.idMembroResponsavel = this.dados.dadosForm.controls['idMembroResponsavel'].value;
  }
}
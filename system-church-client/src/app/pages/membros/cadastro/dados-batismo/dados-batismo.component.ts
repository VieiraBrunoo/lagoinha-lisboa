import { BancoService } from '../../../../service/banco/banco.service';

import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MaterialErrorState } from '../../../util/material-error-state';
import { Banco } from 'src/app/models/banco';
import { Docente } from 'src/app/models/docente';


//#region Interfaces
export class BancoTS extends Banco {}

export interface TpConta {
  flTipoConta: string;
  numConta: string;
}
//#endregion

@Component({
  selector: 'app-dados-batismos',
  templateUrl: './dados-batismo.component.html',
  styleUrls: ['./dados-batismo.component.css']
})
export class DadosBatimosComponent implements OnInit {

  //#region Variaveis
  errorPreenchimentoObrigatorio: string;
  errorValidatorNumeros: string;
  errorValidatorLetrasNumeros: string;
  regexStr = '^[a-zA-Z0-9_]*$';
  bancoList: Array<Banco>;

  dadosBancariosForm: FormGroup;
  errorState: MaterialErrorState;

  tpContas: TpConta[] = [
    {flTipoConta: 'C', numConta: 'Conta Corrente'},
    {flTipoConta: 'P', numConta: 'Conta Poupança'}
  ];
  //#endregion

  constructor(
    private _formBuilder: FormBuilder,
    private el: ElementRef,
    private bancoService: BancoService,
  ) { }

  ngOnInit() {
   /* this.errorPreenchimentoObrigatorio = 'Preenchimento Obrigatório';
    this.errorValidatorNumeros = 'Apenas números são permitidos';
    this.errorValidatorLetrasNumeros = 'Apenas letras e números são permitidos';
*/
    this.creatForm();
    this.getListBancos();
  }

  //#region Metodos Privados
  private creatForm() {

    this.errorState = new MaterialErrorState;
    this.dadosBancariosForm = new FormGroup({
      banco: new FormControl(''),
      flTipoConta: new FormControl(''),
      cdAgencia: new FormControl(''),
      operacao: new FormControl(''),
      numeroConta: new FormControl(''),
    });
  }

  private getListBancos() {
    this.bancoList = new Array<Banco>();
    this.bancoService.findAll().subscribe(listaRetorno => {
      listaRetorno.forEach(element => {
        this.bancoList.push(element);
      });
    });
  }
  //#endregion


  @HostListener('keypress', ['$event']) onhashchange(event) {
    return new RegExp(this.regexStr).test(event.key);
  }
}

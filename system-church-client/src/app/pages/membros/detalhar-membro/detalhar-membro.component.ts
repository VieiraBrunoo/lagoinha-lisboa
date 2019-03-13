import { Component, OnInit } from '@angular/core';
import { DocenteService } from 'src/app/service/docente/docente.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseDetalharDocente } from 'src/app/models/response-detalhar-docente';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { SiecWsService } from 'src/app/service/siec-ws/siec.ws.service';
import { Acao } from 'src/app/models/acao';
import { Capacitacao } from 'src/app/models/siec/capacitacao';

@Component({
  selector: 'app-detalhar-membro',
  templateUrl: './detalhar-membro.component.html',
  styleUrls: ['./detalhar-membro.component.css']
})
export class DetalharMembroComponent implements OnInit {
  idDocente:number;
  docente:ResponseDetalharDocente;
  listSiec:Array<Capacitacao>;
  acao:Capacitacao;
  enfam:Capacitacao;
  @BlockUI() blockUI: NgBlockUI;
  descricao:string;

  constructor(
    private docenteService: DocenteService,
    private route:ActivatedRoute,
    private siecService:SiecWsService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(
     (queryParams:any) => {
      this.idDocente=queryParams['id'];
     } 
    )

     this.obterDocente(this.idDocente);
  }

private obterDocente(id){
  this.docente = new ResponseDetalharDocente();
  this.docente.cursoDocente = new Array<Capacitacao>();
  this.docente.formador = new Array<Capacitacao>();
  this.enfam = new Capacitacao();
   this.blockUI.start();
 /* this.docenteService.findByDocenteId(id).subscribe(listRetorno => {
    this.siecService.buscarAcoesComoDocente(listRetorno.cpf).subscribe(listRetornoSiec => {
      listRetornoSiec.forEach(element => {
        let acao = new Capacitacao();
          acao.dataInicial = element.dataInicial;          
          acao.dataFinal= element.dataFinal;
          acao.descricao = element.descricao;
          acao.nomeStr = element.nomeStr;
          this.docente.cursoDocente.push(acao);*
    });

      })
      this.siecService.buscarAcoesComoDiscente(listRetorno.cpf, 'ENFAM').subscribe(listRetornoEnfam => {
        listRetornoEnfam.forEach(element => {
          let enfam = new Capacitacao();
          enfam.nomeStr = element.nomeStr;
          enfam.descricao= element.descricao;
          enfam.dataInicial = element.dataInicial;
          enfam.dataFinal = element.dataFinal;
          this.docente.formador.push(enfam);
        });
      })
    this.blockUI.stop();
    if(listRetorno.imgDocente!=null){
      listRetorno.imgDocente=('data:image/jpeg;base64,' + listRetorno.imgDocente)
      }
      this.docente.imgDocente=listRetorno.imgDocente;
      this.docente.nome = listRetorno.nome;
      this.docente.tribunal = listRetorno.tribunal;
      this.docente.titulacao = listRetorno.titulacao;
      this.docente.email = listRetorno.email;
      this.docente.atuacao = listRetorno.atuacao;
      this.docente.escolaAtuacao =listRetorno.escolaAtuacao;
      this.docente.curriculoLates = listRetorno.curriculoLates;
      this.docente.curriculoResumido = listRetorno.curriculoResumido;
      this.docente.areaAtuacao = listRetorno.areaAtuacao;
      if(listRetorno.cursoComoAluno.length > 0) {
      this.docente.cursoComoAluno = listRetorno.cursoComoAluno;
      }

    });

}*/

}
}

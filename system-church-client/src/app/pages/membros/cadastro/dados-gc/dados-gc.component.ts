import { ParametroService } from '../../../../service/parametro/parametro.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, TooltipPosition } from '@angular/material';
import { Parametro } from 'src/app/models/parametro';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaterialErrorState } from 'src/app/pages/util/material-error-state';
import { IdentityStorage } from 'src/app/auth/_models/identity.storage';
import { Documento } from 'src/app/models/documento';
import { GcService } from 'src/app/service/gc/gc.service';
import { Gc } from 'src/app/models/gc-cadastro-membro';

@Component({
  selector: 'app-dados-gc',
  templateUrl: './dados-gc.component.html',
  styleUrls: ['./dados-gc.component.css'],
})
export class DadosGcComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  positionOptions: TooltipPosition[] = ['after'];
  nomeArquivo: string;
  listDocumentos: Array<any>;
  showGrid: boolean = false;
  nomeMembro:string;
  titulosColunas: string[] = ['nome', 'tipo', 'responsavel', 'acoes'];
  tipoDocumento: string;
  tipoDocumentoList: Array<Parametro>;
  dataSource: MatTableDataSource<any>;
  errorState: MaterialErrorState;
  dadosGcForm: FormGroup;
  reader = new FileReader();
  url: any;
  preenchimentoObrigatorio: string = 'Preenchimento Obrigatório';

  arquivosMultipart: Array<any>;
  documentosMultipart: Array<Documento>;
  gcRespostaList: Array<any>;
  gcList: Array<any>;
  gc:Gc;

  selectedFiles: FileList;
  documento: File;

  constructor(
    private parametroService: ParametroService,
    private identityStorage: IdentityStorage,
    private gcService:GcService) { }

  ngOnInit() {

    this.listDocumentos = new Array<any>();
    this.arquivosMultipart = new Array<File>();
    this.documentosMultipart = new Array<Documento>();
   
    this.creatForm();
    this.getListOpcaoGc();
    this.getGc();
  }

  onFileChanged(event) {

    this.nomeArquivo = event.target.files[0].name;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.selectedFiles = event.target.files;
      this.documento = this.selectedFiles.item(0);
    }
  }
/*
  adicionarArquivo() {

    let tipoArquivo: string = this.dadosAdministrativosForm.controls['tipoDocumento'].value;
    let responsavel: string = this.identityStorage.getIdentity().login;

    let doc = new Documento();

    doc.usuario = responsavel;
    doc.flagTipoDocumento = tipoArquivo;
    doc.nome = this.documento.name;

    this.arquivosMultipart.push(this.documento);
    this.documentosMultipart.push(doc);

    if(this.tipoDocumento != null && this.nomeArquivo != null && this.nomeArquivo != '') {
      this.showGrid = true;
      this.listDocumentos.push({ 'nome': this.nomeArquivo, 'tipo': tipoArquivo, 'responsavel': responsavel });
      this.nomeArquivo = '';
      this.dataSource = new MatTableDataSource<any>(this.listDocumentos);
      this.dataSource.paginator = this.paginator;
    }
  }
*/
  removerArquivo(item) {
    const index: number = this.listDocumentos.indexOf(item.nome);
    this.listDocumentos.splice(index, 1);
    this.arquivosMultipart.splice(index, 1);
    this.documentosMultipart.splice(index, 1);

    this.dataSource = new MatTableDataSource<any>(this.listDocumentos);
    this.dataSource.paginator = this.paginator;
    
    if(this.listDocumentos.length == 0) {
      this.showGrid = false;
    }
  }

  private creatForm() {
    this.errorState = new MaterialErrorState;
    this.dadosGcForm = new FormGroup({
      flagParticipaGc: new FormControl('', Validators.required),
      gc: new FormControl(''),
         });
  }

  private getListTiposDocumento() {
    this.tipoDocumentoList = new Array<Parametro>();
    this.parametroService.findByNomeConstante("TIPO_DOCUMENTO").subscribe(listRetorno => {
      listRetorno.forEach(element => {
        this.tipoDocumentoList.push(element);
      });
    })
  }

  private getListOpcaoGc() {
    this.gcRespostaList = new Array<any>();
    this.parametroService.findByNomeConstante("RESPOSTA").subscribe(listRetorno => {
      listRetorno.forEach(element => {
        this.gcRespostaList.push(element);
    });
  });
}


private getGc() {
  this.gcList = new Array<Gc>();
  this.gc = new Gc();
  this.gcService.buscarTodosGc().subscribe(listRetorno => {
    listRetorno.forEach(element => {
       this.gcList.push(element);
  });
});
}

}

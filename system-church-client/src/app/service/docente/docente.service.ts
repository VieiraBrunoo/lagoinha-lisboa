import { Observable } from 'rxjs';
import { GenericService } from '../../commons/generic.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Docente } from 'src/app/models/docente';
import { MessagesConstants } from 'src/app/core/messages.constants';
import { IdentityStorage } from 'src/app/auth/_models/identity.storage';
import { PesquisaDocentes } from 'src/app/models/PesquisaDocentes';


@Injectable()
export class DocenteService extends GenericService {

  private relativePath: string = '/SystemChurch-api';
  pesquisaPublica: any;

  constructor(http: HttpClient, private identityStorage: IdentityStorage) {
    super(http);
    this.identityStorage = identityStorage;
  }

  public findAll(): Observable<Docente[]> {
    return this.getMethod(this.relativePath);
  }

  saveDocente(arquivo: File, docente: Docente): Observable<any> {

    const formData: any = new FormData();
    formData.append('arquivo', arquivo);
    formData.append('docente',  new Blob([JSON.stringify(docente)], {type: "application/json"}));

    return this.http.post(this.url + this.relativePath, formData);
  }

  getMultiPartHeaders() {
    const headers = new HttpHeaders();
    headers.set(MessagesConstants.TOKEN_HEADER_KEY, MessagesConstants.BEARER + this.identityStorage.getIdentity().token);
    return headers;
  }

  findByDocente(docentes: PesquisaDocentes) : Observable<any> {
    return this.http.post(this.url + this.relativePath+"pesquisarDocente", docentes);
  }

  findById(id:number,status:string) : Observable<any> {
    return this.http.get(this.url + this.relativePath+"findById/"+ id + "/" + status);
  }

}

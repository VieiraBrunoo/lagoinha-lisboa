import { Capacitacao } from './../../models/siec/capacitacao';
import { Observable } from 'rxjs';
import { GenericService } from '../../commons/generic.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessagesConstants } from 'src/app/core/messages.constants';
import { IdentityStorage } from 'src/app/auth/_models/identity.storage';


@Injectable()
export class SiecWsService extends GenericService {

  private relativePath: string = 'api/';

  constructor(http: HttpClient, private identityStorage: IdentityStorage) {
    super(http);
    this.identityStorage = identityStorage;
    this.url = 'http://localhost:8081/siec-api/';
  }

  public findCapacitacaoByCpf(cpf: string): Observable<Capacitacao[]> {
    return this.getMethod(this.relativePath+"cpf/"+cpf);
  }

  public buscarAcoesComoDocente(cpf: string): Observable<Capacitacao[]> {
    const endpoint = 'buscarAcoesComoDocente/';
    return this.getMethod(this.relativePath + endpoint + cpf);
  }

  public buscarAcoesComoDiscente(cpf: string, formacao: string): Observable<Capacitacao[]> {
    const endpoint = 'buscarAcoesComoDiscente/'+formacao+'/';
    return this.getMethod(this.relativePath + endpoint + cpf);
  }
}

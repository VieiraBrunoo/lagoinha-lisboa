import { Observable } from 'rxjs';
import { GenericService } from '../../commons/generic.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TemaAtuacao } from 'src/app/models/temaAtuacao';

@Injectable()
export class TemaAtuacaoService extends GenericService {

  private relativePath: string = 'api/temaAtuacao/';

  constructor(http: HttpClient) {
    super(http);
  }

  public findAll() : Observable<TemaAtuacao[]> {
    return this.getMethod(this.relativePath);
  }

  public findByTemaClassificacao(idTemaClassificacao: number) : Observable<TemaAtuacao[]> {
    return this.getMethod(this.relativePath + 'findByTemaClassificacao/'+ idTemaClassificacao);
  }

  public findByTemaAtuacao(idTemaAtuacao: number) : Observable<TemaAtuacao[]> {
    return this.getMethod(this.relativePath + 'findByTemaAtuacao/'+ idTemaAtuacao);
  }
}

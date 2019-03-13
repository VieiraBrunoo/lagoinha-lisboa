import { Observable } from 'rxjs';
import { GenericService } from '../../commons/generic.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TemaClassificacao } from 'src/app/models/temaClassificacao';

@Injectable()
export class TemaClassificacaoService extends GenericService {

  private relativePath: string = 'api/temaClassificacao/';

  constructor(http: HttpClient) {
    super(http);
  }

  public findAll(): Observable<TemaClassificacao[]> {
    return this.getMethod(this.relativePath);
  }
}

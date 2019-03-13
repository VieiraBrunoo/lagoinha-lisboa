import { Observable } from 'rxjs';
import { GenericService } from '../../commons/generic.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Acao } from 'src/app/models/acao';

@Injectable()
export class AcaoService extends GenericService {

  private relativePath: string = 'api/acao/';

  constructor(http: HttpClient) {
    super(http);
  }

  public findAll() : Observable<Acao[]> {
    return this.getMethod(this.relativePath);
  }

  public saveAcao(acoes: Array<Acao>) : Observable<any> {

    const formData: any = new FormData();
    formData.append('acoes', new Blob([JSON.stringify(acoes)], {type: "application/json"}));

    return this.http.post(this.url + this.relativePath, formData);
  }
}

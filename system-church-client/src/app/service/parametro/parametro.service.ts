import { Observable } from 'rxjs';
import { GenericService } from './../../commons/generic.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Parametro } from 'src/app/models/parametro';

@Injectable()
export class ParametroService extends GenericService {

  private relativePath: string = 'parametro/';

  constructor(http: HttpClient) {
    super(http);
  }

  public findByNomeConstante(nomeConstante: string) : Observable<Parametro[]> {
    return this.getMethod(this.relativePath+"findByNomeConstante/"+ nomeConstante);
  }
}

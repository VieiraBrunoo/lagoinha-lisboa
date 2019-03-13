import { Observable } from 'rxjs';
import { GenericService } from './../../commons/generic.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Escola } from 'src/app/models/escola';

@Injectable()
export class EscolaService extends GenericService {

  private relativePath: string = 'api/escola/';

  constructor(http: HttpClient) {
    super(http);
  }

  public findAll() : Observable<Escola[]> {
    return this.getMethod(this.relativePath);
  }
}

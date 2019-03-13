import { Observable } from 'rxjs';
import { GenericService } from './../../commons/generic.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tribunal } from 'src/app/models/tribunal';

@Injectable()
export class TribunalService extends GenericService {

  private relativePath: string = 'api/tribunal/';

  constructor(http: HttpClient) {
    super(http);
  }

  public findByRamo(ramo: string) : Observable<Tribunal[]> {
    return this.getMethod(this.relativePath+'findByRamo/'+ramo);
  }

  public findAll() : Observable<Tribunal[]> {
    return this.getMethod(this.relativePath);
  }
}

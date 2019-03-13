import { Observable } from 'rxjs';
import { GenericService } from '../../commons/generic.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Banco } from 'src/app/models/banco';

@Injectable()
export class BancoService extends GenericService {

  private relativePath: string = 'api/banco/';

  constructor(http: HttpClient) {
    super(http);
  }

  public findAll() : Observable<Banco[]> {
    return this.getMethod(this.relativePath);
  }
}

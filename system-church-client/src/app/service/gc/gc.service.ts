import { Observable } from 'rxjs';
import { GenericService } from '../../commons/generic.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gc } from 'src/app/models/gc';



@Injectable()
export class GcService extends GenericService {

  private relativePath: string = 'gc/';
  pesquisaPublica: any;

  constructor(http: HttpClient) {
    super(http);
  }

 
  public buscarTodosGc(): Observable<Gc[]> {
    return this.getMethod(this.relativePath + "findAllGc/");
  }

}

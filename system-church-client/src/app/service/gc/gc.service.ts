import { Observable } from 'rxjs';
import { GenericService } from '../../commons/generic.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable()
export class GcService extends GenericService {

  private relativePath: string = 'gc/';
  pesquisaPublica: any;

  constructor(http: HttpClient) {
    super(http);
  }

 
  public buscarTodosGc(): Observable<any> {
    return this.getMethod(this.relativePath + "findAllGc/");
  }

}

import { Observable } from 'rxjs';
import { GenericService } from '../../commons/generic.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gc } from 'src/app/models/gc-cadastro-membro';



@Injectable()
export class GcService extends GenericService {

  private relativePath: string = 'gc/';
  pesquisaPublica: any;

  constructor(http: HttpClient) {
    super(http);
  }


  save(gc: Gc): Observable<any> {
    return this.http.post(this.url + this.relativePath + "salvarGc/", gc);
  }
 
  public buscarTodosGc(): Observable<any> {
    return this.getMethod(this.relativePath + "findAllGc/");
  }

  public findById(id:number): Observable<any> {
    return this.getMethod(this.relativePath + "find/"+id);
  }

}

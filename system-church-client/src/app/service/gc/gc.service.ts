import { Observable } from 'rxjs';
import { GenericService } from '../../commons/generic.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IdentityStorage } from 'src/app/auth/_models/identity.storage';
import { Gc } from 'src/app/models/gc';


@Injectable()
export class GcService extends GenericService {

  private relativePath: string = 'gc/';
  pesquisaPublica: any;

  constructor(http: HttpClient, private identityStorage: IdentityStorage) {
    super(http);
    this.identityStorage = identityStorage;
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

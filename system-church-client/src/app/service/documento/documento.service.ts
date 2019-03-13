
import { Observable } from 'rxjs';
import { GenericService } from '../../commons/generic.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IdentityStorage } from 'src/app/auth/_models/identity.storage';
import { Documento } from 'src/app/models/documento';

@Injectable()
export class DocumentoService extends GenericService {

  private relativePath: string = 'api/documento/';

  constructor(http: HttpClient, private identityStorage: IdentityStorage) {
    super(http);
    this.identityStorage = identityStorage;
  }

  public findAll(): Observable<Documento[]> {
    return this.getMethod(this.relativePath);
  }

  saveDocumento(arquivos: Array<File>, documentos: Array<Documento>, idDocente: number): Observable<any> {

    const formData: any = new FormData(); 
    arquivos.forEach(element => {
      formData.append('arquivos', element)
    });
    formData.append('documentos', new Blob([JSON.stringify(documentos)], {type: "application/json"}));
    formData.append('idDocente', new Blob([JSON.stringify(idDocente)], {type: "application/json"}));

    return this.http.post(this.url + this.relativePath, formData);
  }

}

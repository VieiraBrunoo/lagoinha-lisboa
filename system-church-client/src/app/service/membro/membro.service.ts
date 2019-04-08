import { Observable } from 'rxjs';
import { GenericService } from '../../commons/generic.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Docente } from 'src/app/models/docente';
import { MessagesConstants } from 'src/app/core/messages.constants';
import { IdentityStorage } from 'src/app/auth/_models/identity.storage';
import { PesquisaDocentes } from 'src/app/models/PesquisaDocentes';
import { Membro } from 'src/app/models/membro';
import { MembroDto } from 'src/app/pages/membros/cadastro/cadastro-membro/cadastro-membro.component';
import { RequestPesquisaMembros } from 'src/app/models/request-pesquisa-membro';


@Injectable()
export class MembroService extends GenericService {

  private relativePath: string = 'membro/';
  pesquisaPublica: any;

  constructor(http: HttpClient, private identityStorage: IdentityStorage) {
    super(http);
    this.identityStorage = identityStorage;
  }

 
  saveMembro( membro: MembroDto,arquivo:File): Observable<any> {
    const formData: any = new FormData();

    formData.append('fotoPerfil', arquivo);
    formData.append('membro', new Blob([JSON.stringify(membro)], {type: "application/json"}));
      return this.http.post(this.url + this.relativePath + "salvarMembro/", formData );
  }

  public findAll(): Observable<any> {
    return this.getMethod(this.relativePath + "findAllMembro/");
  }
 
  findByMembro( membro: RequestPesquisaMembros) : Observable<any> {
    return this.http.post(this.url + this.relativePath+"pesquisarMembros", membro);
  }


  findByMembroDetalhado( membro: RequestPesquisaMembros) : Observable<any> {
    return this.http.post(this.url + this.relativePath+"pesquisarMembrosDetalhado", membro);
  }

  findByMembroId( id: number) : Observable<any> {
    return this.getMethod(this.relativePath+"findByMembroId/"+id);
  }

  updateMembro( membro: MembroDto,arquivo:File): Observable<any> {
    const formData: any = new FormData();

    formData.append('fotoPerfil', arquivo);
    formData.append('membro', new Blob([JSON.stringify(membro)], {type: "application/json"}));
      return this.http.post(this.url + this.relativePath + "atualizarMembro/", formData );
  }
}

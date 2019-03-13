import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { HttpClient } from '@angular/common/http';
import { GenericService } from "../../commons/generic.service";

@Injectable()
export class UsuarioService extends GenericService {
    private relativePath: string = 'usuario/';


    constructor(http: HttpClient){
        super(http);
    }

    autenticar(login:string, senha:string) : Observable<any>{
        return this.http.get(this.url + this.relativePath + "autenticar/"+login+"/"+senha);
    }

    sessao(): Observable<any> {
        return this.getMethod(this.relativePath + 'sessao');
    }
}
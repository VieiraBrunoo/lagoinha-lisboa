import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { HttpClient } from '@angular/common/http';
import { GenericService } from "../../commons/generic.service";

@Injectable()
export class PadraoService extends GenericService {
    private relativePath: string = 'api/banco-docentes/';
    constructor(http: HttpClient){
        super(http);
    }

    findById(id) : Observable<any>{
        return this.getMethod(this.relativePath + id);
    }
    /*
    salvar(value) : Observable<any> {
        return this.http.post(this.url + this.relativePath , value, { headers: this.getHeaders() });
    }
    */

}
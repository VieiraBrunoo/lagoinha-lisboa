import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class AbstractHttpService {

    protected url: string = environment.url;
    protected http: HttpClient;
    private extractData;
    private handleError;

    constructor(http: HttpClient) {
        this.http = http;
    }

    protected getMethod<T>(relativePath: string = '', params: any = null) {
     //   console.log(this.url + relativePath);

       // console.log('Param: ' + params);

        if(params != null) {

            return this.http.get<T>(this.url + relativePath, {
                params: params
            });
        }
        else {
            return this.http.get<T>(this.url + relativePath);
        }

        
    }

    protected async getMethodPromise<T>(relativePath: string = '', params: any = null): Promise<T> {

        if(params != null) {

            return await this.http.get<T>(this.url + relativePath, { params: params }).toPromise();
        }
        else {

            return await this.http.get<T>(this.url + relativePath).toPromise();
        }
    }
   

    protected postMethod<T>(value : any, relativePath: string = '') {
        
        console.log('Post Method: ' + this.url + relativePath);
        
        return this.http.post<T>(this.url + relativePath, value, { headers: this.getHeaders() });
    }

    protected putMethod(value : any, relativePath: string = '') {
        return this.http.put(this.url + relativePath, JSON.stringify(value), { headers: this.getHeaders() })
            .map(res => this.extractData = res).toPromise()
            .then(this.extractData)
            .catch(this.handleError);;
    }

    protected deleteMethod(value : any, relativePath: string = '') {
        return this.http.delete(this.url + relativePath + '/' + value, { headers: this.getHeaders() })
        .map(res => this.extractData = res).toPromise()
        .then(this.extractData)
        .catch(this.handleError);;
    }

    protected getHeaders() {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        headers.set('responseType', 'text');
        headers.set('Access-Control-Allow-Origin', '*');
        return headers;
    }

}

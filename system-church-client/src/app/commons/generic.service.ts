import { Injectable } from '@angular/core';

import { AbstractHttpService } from './abstract-http.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GenericService extends AbstractHttpService {

    constructor(http: HttpClient) {
        super(http);
    }

    save (value: any, relativePath : string = '') {
        return this.postMethod(relativePath, value);
    }

    delete(value: any, relativePath : string = '') {
        return this.deleteMethod(relativePath, value);
    }

    findAll(relativePath : string = '') {
        return this.getMethod(relativePath);
    }

    findOne(value: string, relativePath : string = '') {
        return this.getMethod(relativePath + value);
    }

}

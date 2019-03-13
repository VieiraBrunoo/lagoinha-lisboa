import { Injectable } from '@angular/core';

import {HttpInterceptor, HttpRequest, 
    HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { AuthenticationService } from '../_services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    
    constructor(private authService: AuthenticationService, private router: Router, private toasterService: ToasterService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(req.url.search("/login") === -1) {

            if(this.authService.isAuthenticated()) {
                req = req.clone({
                    setHeaders: { 
                        Authorization: `Bearer ${this.authService.getIdentity().token}`
                    }
                });

                
            }
        }
        else {

            if(this.authService.isAuthenticated()) {

                this.router.navigate(['home']);
            }
        }

        return next.handle(req);
        
    }
}
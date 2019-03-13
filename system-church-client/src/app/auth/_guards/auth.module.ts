import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor  } from './auth.interceptor';
import { IdentityStorage } from '../_models/identity.storage';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
   
  ],

  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    IdentityStorage

  ]
})
export class AuthModule { }

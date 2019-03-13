import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractHttpService } from './abstract-http.service';
import { GenericService } from './generic.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[GenericService, AbstractHttpService],
  declarations: []
})
export class CommonsModule { }

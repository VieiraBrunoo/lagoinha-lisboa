import { Component, OnInit } from '@angular/core';
import { GcService } from 'src/app/service/gc/gc.service';
import { ActivatedRoute } from '@angular/router';
import { Gc } from 'src/app/models/gc';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-detalhar-gc',
  templateUrl: './detalhar-gc.component.html',
  styleUrls: ['./detalhar-gc.component.css']
})
export class DetalharGcComponent implements OnInit {
  idGc:number;
  gc:Gc;
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private gcService: GcService,
    private route:ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(
     (queryParams:any) => {
      this.idGc=queryParams['idGc'];
     } 
    )

     this.obterGc(this.idGc);
  }

private obterGc(id){
  this.gc = new Gc();
   this.blockUI.start();
}
}

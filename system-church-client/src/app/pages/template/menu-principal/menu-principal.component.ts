import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IdentityStorage } from 'src/app/auth/_models/identity.storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  active: boolean = false;

  constructor(public router: Router, public identityStorage: IdentityStorage,) { }

  ngOnInit() {
  }

  listaPublica(): boolean{
    return this.router.url.startsWith('/publica/');
  }

  clickMenu(): void {
    this.active = !this.active;
  }
}

import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityStorage } from '../../../auth/_models/identity.storage';
import { BaseComponent } from '../../base/base.component';
import { AuthenticationService } from '../../../auth/_services';
import { LocalStorageService } from 'angular-web-storage';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements BaseComponent {

  response: string;
  api: string;
  currentUser: any;
  navbarOpen = false;

  constructor(
    public router: Router,
    public http: Http, 
    public identityStorage: IdentityStorage,
    private authenticationService : AuthenticationService,
    private local: LocalStorageService,
    public login:LoginComponent
  ) { }
  
  ngOnInit() {
  }
  
  loginTela(){
    this.router.navigate(['login']);
  }
  
  cadastarDocente(){
    this.router.navigate(['cadastro-docente']);
  }
  
  sairTela(){
    this.identityStorage.clearAuthData();
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
  
  logado(): boolean{
    return this.router.url !== ('/login');
  }

  acessoExterno(): boolean{
    return this.router.url === '/login' || this.router.url.startsWith('/publica/');
  }

  ngOnDestroy() {
    return this.authenticationService.isAuthenticated();
  }

  telaHome(){
    this.router.navigate(['home']);
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}

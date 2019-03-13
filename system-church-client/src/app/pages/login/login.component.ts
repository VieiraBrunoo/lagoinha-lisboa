import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { FormControl } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToasterService } from 'angular2-toaster';
import { AuthenticationService } from '../../auth/_services';
import { MatDialog } from '@angular/material';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginText = new FormControl('', []);
  senha = new FormControl('', []);
  private toasterService: ToasterService;
  @BlockUI() blockUI: NgBlockUI;

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  
  constructor(
    public router: Router, 
    toasterService: ToasterService,
    public http: Http,
    private authenticationService: UsuarioService,
    private dialog: MatDialog
  ) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
  }
  
  login(){
    if(this.validarCampos()){
      var login = this.loginText.value;
      var senha = this.senha.value;
      if(login == null || login == '' || senha == null || senha == ''){
        this.toasterService.pop('warning',  'Login e Senha são obrigatórios');
        return;
      }
      this.blockUI.start();
      this.authenticationService.autenticar(this.loginText.value, this.senha.value)
      .subscribe(
          result => {

            if (result.id!=null) {
              console.log(result);
              this.blockUI.stop();
              this.router.navigate(['home']);
            }
              
          },
          error => {

            this.error = error;
            this.loading = false;
            this.toasterService.pop('error', 'Login ou Senha Inválidos');
            this.blockUI.stop();
          });
    }
  }

  validarCampos(): boolean{
    var retorno = true;
    if(this.loginText.value == null || this.loginText.value == ''){
      this.loginText.setErrors(['']);
      retorno = false;
    }
    if(this.senha.value == null || this.senha.value == ''){
      this.senha.setErrors(['']);
      retorno = false;
    }
    return retorno;
  }

}

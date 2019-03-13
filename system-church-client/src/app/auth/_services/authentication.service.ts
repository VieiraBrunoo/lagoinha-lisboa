import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import  { IdentityStorage } from '../_models/identity.storage';
import { Observable, BehaviorSubject } from 'rxjs';
import { Identity } from '../_models/identity';
import { LocalStorageService } from 'angular-web-storage';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario/usuario.service';


class AuthorityResponse {

    public authority: string;
}

class UserPerfilResponse {

    public nome: string;
    public descricao: string;
    public email: string;
    public comarca: string;
    public lotacao: string;
    public cargo: string;
    public cpf: string;
}

class UserDataResponse {

    public id: string;
    public nome: string;
    public perfis: UserPerfilResponse[];
}

class AuthenticationResponse {

    public login: string;
    public token: string;
    public user: UserDataResponse;
    public authorities: AuthorityResponse[];
}

class AuthenticationResult {

    ok: boolean;
    message: string;

    constructor(ok: boolean, message: string){
        this.ok = ok;
        this.message = message;
    }
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    identityStorage: IdentityStorage;
    baseUrl = environment.url;

    private messageSource = new BehaviorSubject(false);

    public message = this.messageSource.asObservable();

    constructor(
        private http: HttpClient, 
        private idStorage: IdentityStorage,
        private usuarioService: UsuarioService,
        public local: LocalStorageService,
        private router: Router,
        private toasterService: ToasterService,
    ) {
        this.identityStorage = this.idStorage;
    }

    authenticate(login: string, password: string): Observable<AuthenticationResult> {

        var credentials = JSON.stringify({login: login, password: password});

        return this.http.post<AuthenticationResponse>(this.baseUrl + 'api/login', credentials)

            .map(resp => {

            if(resp.token) {

                let token = resp.token;
                let id = resp.user.id;
                let userName = resp.user.nome;
                let login = resp.login;
                let perfil = this.getPerfis(resp.user.perfis);
                this.local.set('idUsuario', id);
                if (token) {
                    let userAuthData = 
                    {
                        token: token,
                        userName: userName,
                        id: id,
                        perfil: perfil,
                        login: login,
                    };
                    
                 //   console.log(`Usuário autenticou: Nome: ${userName}`);
                    
                    this.identityStorage.saveAuthData(userAuthData);
                    
                    this.messageSource.next(true);
                   // console.log(token);

                    this.usuarioService.sessao();
                    return new AuthenticationResult(true, null);
                }
            }
            else {

                this.messageSource.next(false);
                return new AuthenticationResult(false, "Login ou Senha Inválidos");
            }

        });

        
    }

    isExpired() {
        this.usuarioService.sessao().subscribe(_ =>{},_ => {
            this.toasterService.pop('error', 'A sessão expirou, por favor realize o login.');
            this.router.navigate(['login']);
        });
    }


    getIdentity(): Identity {

        return this.identityStorage.getIdentity();
    }

    isAuthenticated(): boolean {

        return this.identityStorage.authenticationPresent();
    }

    clearAuthentication(): void {

        this.identityStorage.clearAuthData();

    }

    getPerfis(perfis: Array<UserPerfilResponse>){
        var perfilArray = ""; 
        perfis.forEach(element => {
            perfilArray += element.nome + ",";
        });
        return perfilArray;
    }

    isAdminSistema(): boolean {
        var retorno = false;
        this.getIdentity().perfil.split(",").forEach(element => {
            if(element == "ADMINISTRADOR"){
                retorno = true;
            }
        });
        return retorno;
    }

}
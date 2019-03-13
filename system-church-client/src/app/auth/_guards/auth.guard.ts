import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "../_services";

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(
        private router: Router,
        private authService: AuthenticationService,
    ) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if(!this.authService.isAuthenticated()) {
         //   console.log('No Authentication Present, redirecting to Login');
            this.router.navigate(['home']);
            return false;
        }
        this.authService.isExpired();

        return true;
    }
}
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    dialogRef: any;
    loginData: any;
    constructor(
        private router: Router
        ) { }

        canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
            this.loginData = localStorage.getItem('token')
            debugger
            if (this.loginData) {
                return true;
            } else {
                this.router.navigate(['/login']);
                return false;
            }
          }
}

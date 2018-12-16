import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../shared/user.model';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isAuthenticated().toPromise().then((res) => {
            if (res) {
                return true;
            }
            else {
                this.router.navigate(['login'])
                return false;
            }

        },
            (err) => {
                this.router.navigate(['login'])
                return false;
            }
        );

    }

}
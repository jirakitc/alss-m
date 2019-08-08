import { Injectable } from '@angular/core';
import { Router, CanActivate ,CanActivateChild,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router'

import { AuthService } from './auth.service';
import decode from 'jwt-decode';

@Injectable()

export class RoleGuardService implements CanActivate{

    constructor(
        public auth : AuthService,
        public router : Router
    ) {}

    canActivate(route : ActivatedRouteSnapshot):boolean {
        const expectedRole = route.data.expectedRole;
        const tokenPayload = this.auth.getUserDetails()
        
    
        if (!this.auth.isLoggedIn() || tokenPayload.type !== expectedRole) {
          this.router.navigate(['login'])
          console.log('canActive false')
          return false
        }
        console.log('canActive Run')
        return true
        
      }

}

import { Injectable } from '@angular/core';
import { Router, CanActivate ,CanActivateChild,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router'

import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private auth : AuthService,
    private router : Router
  ) { }

  canActivate() {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/')
      console.log('canActive false')
      return false
    }
    console.log('canActive Run')
    return true
  }
}

import { Injectable } from '@angular/core';

import { Room , Subject , classStu } from './interface';
import { AuthService , UserDetails } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedDataService {
  details: UserDetails


  constructor(private auth : AuthService) { }

  getProfile(){
    this.auth.profile().subscribe(
      user => {
        this.details = user
      },
      err => {
        console.error(err)
      }
    )
  }
}

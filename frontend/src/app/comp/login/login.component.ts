import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { User } from '../../services/interface'
import { AuthService , TokenPayload } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: TokenPayload = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    type: '',
  }

  uDataArray:any[] = []
  formData : User

  constructor(
    private http:HttpClient,
    private auth : AuthService,
    private router : Router
  ) { 
  }

  ngOnInit() {
  }
  
  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/profile')
      },
      err => {
        alert(JSON.stringify(555))
      }
    )
  }
}

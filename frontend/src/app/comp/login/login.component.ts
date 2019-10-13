import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


import { User ,TokenPayload } from '../../services/interface'
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
    user_id: 0,
    email: '',
    password: '',
    type: '',
  }

  uDataArray:any[] = []
  formData : User

  constructor(
    private http:HttpClient,
    private auth : AuthService,
    private router : Router,
    private toastr: ToastrService
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
        this.AlertLoginFailed()
      }
    )
    }

    AlertLoginFailed(){
    this.toastr.error( 'Username หรือ Password ไม่ถูกต้อง');
   } 
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import decode from 'jwt-decode';


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
    username:'',
    firstname: '',
    lastname: '',
    user_id: 0,
    email: '',
    password: '',
    type: '',
  }

  uDataArray:any[] = []
  userDetail : User

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
    this.auth.login(this.credentials)
    .subscribe(
      () => {
        this.auth.profile().subscribe(
          user => {
            this.userDetail = user
            if (this.userDetail.type == 1){
              this.router.navigateByUrl('/profile')
            } else if (this.userDetail.type == 2) {
              this.router.navigateByUrl('/teacher')
            } else {
              this.router.navigateByUrl('/admin')
            }
            console.log(this.userDetail)
          }

          )
      },
      err => {
        this.AlertLoginFailed()
      }
      
    )
    }
    // else if (this.credentials.type = '2') {
    //   this.router.navigateByUrl('/teacher') 

    AlertLoginFailed(){
    this.toastr.error( 'Username หรือ Password ไม่ถูกต้อง');
   } 
}

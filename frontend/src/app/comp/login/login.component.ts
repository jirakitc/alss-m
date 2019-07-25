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
    password: ''
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
    //this.getData();
  }
  onLogin(data){
    alert(JSON.stringify(data));
    this.http.post<any>('http://localhost:8080/api/login',data).subscribe(results=>{
    alert(JSON.stringify(results));
    // this.getData();
  });
  }

  getData(){
    this.http.get<any>('http://localhost:8080/api/login').subscribe(result=>{
      this.uDataArray = result.data;
    })
  }

  getLogin2(data){
    alert(JSON.stringify(data));
    this.http.post<User[]>('http://localhost:8080/api/login2',data)
    .subscribe(
      customers => {
       //console.log(customers);
       alert(JSON.stringify(customers));
    })
  }
  
  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/profile')
      },
      err => {
        console.error(err)
      }
    )
  }
}

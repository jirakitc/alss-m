import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location, JsonPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { User } from '../../services/interface';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  customer = new User();
  submitted = false;
  UID:number;
  type:number =1;

  constructor(
    private userService: UserService,
    private location: Location,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }
  goBack(): void {
    this.location.back();
  }

  onSubmit(data){
    this.http.post<any>('http://localhost:8080/api/register',data)
    .subscribe(result=>{
      this.toastr.info(JSON.stringify(result))
      //alert(JSON.stringify(result))
    },err=>{
      //this.AlertRegFailed()
    })
  }
  
  ngOnInit() {
    this.getmaxUID();
  }

  getmaxUID(){
    this.http.get<any>('http://localhost:8080/api/getUID')
    .subscribe(userid=>{
      //alert(JSON.stringify(userid))
      this.UID = userid
      this.UID++;
    })
  }

  AlertRegFailed(){
    this.toastr.error( 'Username นี้มีในระบบแล้ว');
   } 
   AlertRegSuccess(){
    this.toastr.success( 'สมัครสมาชิกเรีอยบร้อย');
   } 
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Router } from '@angular/router'
import {ToastrService} from 'ngx-toastr'

import { Room , Subject} from '../../services/interface';
import { UserService } from '../../user.service';
import { ClassService } from 'src/app/services/class.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  room = new Room();
  subject : Subject[];
  submitted = false;
  classID : number;
  selectedFile : File = null;

  constructor(
    private location: Location,
    private http: HttpClient,
    private userService : UserService,
    private classService : ClassService,
    private toastr : ToastrService,
    private router : Router
  ) { }
  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getSubject();
    this.getmaxID();
  }


  //แบบ 1 <---- ใช้อันนี้อยู่
  addClass(data){
    this.http.post<any>('http://localhost:8080/api/add-class',data)
    .subscribe(result=>{
      //alert(JSON.stringify(result))
      this.toastr.info(JSON.stringify(result))
      this.router.navigateByUrl('/profile')
    })

  }
  
  //แบบ 2 
  update(): void {
    this.userService.addClass(this.room)
        .subscribe(result => {
          alert(JSON.stringify(result));
          this.goBack();
        });
  }

  getSubject() {
    return this.classService.getSubject()
      .subscribe(
        subject => {
          console.log(subject);
          this.subject = subject
        });
  }

  getmaxID(){
    this.http.get<any>('http://localhost:8080/api/get_maxClassID')
    .subscribe(res=>{
      //alert(JSON.stringify(userid))
      this.classID = res
      this.classID++;
    })
  }
}

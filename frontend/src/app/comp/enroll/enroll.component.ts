import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { ClassService } from 'src/app/services/class.service';
import { AuthService } from 'src/app/services/auth.service';
import { Room , classStu, User } from 'src/app/services/interface';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})
export class EnrollComponent implements OnInit {

  room : Room[];
  details : User[];
  stuData = new classStu();

  constructor(
    private classService: ClassService,
    private userService: UserService,
    private location : Location,
    private auth: AuthService,
    private http: HttpClient,
    private toastr: ToastrService,
    private router : Router
  ) { }

  ngOnInit() {
    this.getprofile()
  }
  alertEnroll(){
    this.toastr.info('555');
  }

  enroll(){
    console.log(this.stuData);
    this.userService.enroll(this.stuData)
        .subscribe(res=>{

        });
        this.router.navigateByUrl('/profile')
  }
  update() {
    this.userService.enroll(this.stuData)
        .subscribe(result => alert(JSON.stringify(result)));
  }

  onSubmit(data){   //ใช้อันนี้อยู่
    //alert('ลงทะเบียนสำเร็จ')
    this.http.post<any>('http://localhost:8080/api/enroll',data)
    .subscribe(result=>{
       //alert(JSON.stringify(result))
    })
  }


  goBack(){
    this.location.back();
  }

  getRooms() {
    return this.classService.getRoom()
      .subscribe(
        room => {
          //console.log(room);
          this.room = room
        }
      );
  }
  getprofile(){
    this.auth.profile().subscribe(
      user => {
        this.details = user
      },
      err => {
        console.error(err)
      }
    )
    this.getRooms()
  };
}

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';


import { ClassService } from 'src/app/services/class.service';
import { AuthService } from 'src/app/services/auth.service';
import { Room , classStu, User } from 'src/app/services/interface';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  room : Room[];
  roomDT : Room[]
  details : User[];
  stuData = new classStu();

  constructor(
    private userService: UserService,
    private classService : ClassService,  
    private location : Location,
    private auth: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getprofile()
  }

  enroll(){
    console.log(this.stuData);
    this.userService.enroll(this.stuData)
        .subscribe();
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
    return this.auth.class_Profile()
      .subscribe(
        room => {
          this.room = room
        }
      );
  }
  getRoomsData() {
    return this.classService.getRoom()
      .subscribe(
        roomDT => {
          this.roomDT = roomDT
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
    this.getRoomsData();
    this.getRooms();
    
  };

}

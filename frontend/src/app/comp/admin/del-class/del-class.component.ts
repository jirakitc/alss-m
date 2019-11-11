import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/app/services/class.service';

import {Room} from 'src/app/services/interface'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Toast, ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-del-class',
  templateUrl: './del-class.component.html',
  styleUrls: ['./del-class.component.css']
})
export class DelClassComponent implements OnInit {
  room : Room[]
  constructor(
    private classservice : ClassService,
    private http : HttpClient,
    private toast : ToastrService,
    private location : Location,
    private router : Router
    ) { }

  ngOnInit() {
    this.getRoom()
  }
  getRoom() {
    return this.classservice.getRoom()
      .subscribe(
        data => {
          //alert(JSON.stringify(data));
          this.room = data
        }
      );
  }

  delClass(id){
    // alert(JSON.stringify(id))
    this.http.post('http://localhost:8080/api/delClass', id)
    .subscribe(result=>{
      alert(JSON.stringify(result))
    })
    this.toast.info(`ลบห้องเรียนเรียบร้อย`)
  }
}

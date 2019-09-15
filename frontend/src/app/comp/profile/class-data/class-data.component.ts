import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/class.service';
import { Room , classStu , User } from '../../../services/interface'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-class-data',
  templateUrl: './class-data.component.html',
  styleUrls: ['./class-data.component.css']
})
export class ClassDataComponent implements OnInit {
  details: User[];
  room : classStu[];

  constructor(
    private auth : AuthService,
    private classService: ClassService,
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
    this.auth.profile().subscribe(
      user => {
        this.details = user
      },
      err => {console.error(err)}
    )
  }

}

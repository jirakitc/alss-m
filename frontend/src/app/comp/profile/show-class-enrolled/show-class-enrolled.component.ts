import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/class.service';
import { Room , classStu , User } from '../../../services/interface'
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-class-enrolled',
  templateUrl: './show-class-enrolled.component.html',
  styleUrls: ['./show-class-enrolled.component.css']
})
export class ShowClassEnrolledComponent implements OnInit {
  details: User;
  room : classStu[];

  constructor(
    private auth : AuthService,
    private classService: ClassService,
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getclass_Profile(){
    this.auth.class_Profile().subscribe(
      user => {
        this.room = user
      },
      err =>{
        console.error(err)
      }
    )
  }

  getParam(){
    const userId = +this.route.snapshot.paramMap.get('userId');
    this.classService.getCS(userId)
      .subscribe(data => {
        this.room = data
      });
  }

  getProfile(){
    this.auth.profile().subscribe(
      user => {
        this.details = user
      },
      err => {
        console.error(err)
      }
    )
    // enter next code here
    this.getclass_Profile()
  }
}

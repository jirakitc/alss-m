import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { User } from '../../services/interface'

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  classShown: boolean = true ;
  subjectShown: boolean = false ;
  details: User
  constructor(private auth:AuthService) { }

  toggleClassShow() {
    this.classShown = true
    if(this.subjectShown = true)
      this.subjectShown = false
    }
  toggleSubjectShow() {
      this.subjectShown = true
      if(this.classShown = true)
        this.classShown = false
      }  


  ngOnInit() {
    this.getProfile()
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
  }
}



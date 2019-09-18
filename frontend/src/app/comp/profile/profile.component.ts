import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { User } from '../../services/interface'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  classShown: boolean = true ;
  subjectShown: boolean = false ;
  details: User


  constructor(
    private auth:AuthService
  ) { }

  toggleClassShow() {
    this.classShown = ! this.classShown;
    if(this.subjectShown = true)
      this.subjectShown = false
    }
  toggleSubjectShow() {
      this.subjectShown = ! this.subjectShown;
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

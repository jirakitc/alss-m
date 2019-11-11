import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { User } from '../../../services/interface'
@Component({
  selector: 'app-admincenter',
  templateUrl: './admincenter.component.html',
  styleUrls: ['./admincenter.component.css']
})
export class AdmincenterComponent implements OnInit {


  editUserShown: boolean = true ;
  delClassShown: boolean = false ;
  details: User


  constructor(
    private auth:AuthService
  ) { }

  toggleeditUserShow() {
    this.editUserShown = true
    this.delClassShown = false
  }
  toggledelClassShown() {
      this.delClassShown = true
      this.editUserShown = false
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

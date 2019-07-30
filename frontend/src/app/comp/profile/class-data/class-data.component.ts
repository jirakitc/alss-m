import { Component, OnInit } from '@angular/core';
import { AuthService , UserDetails } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/class.service';
import { Room , classStu } from '../../../services/interface'

@Component({
  selector: 'app-class-data',
  templateUrl: './class-data.component.html',
  styleUrls: ['./class-data.component.css']
})
export class ClassDataComponent implements OnInit {
  details: UserDetails
  room : classStu[];

  constructor(
    private auth : AuthService,
    private classService: ClassService
  ) { }

  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        this.details = user
      },
      err => {console.error(err)}
    )
    this.getCS();
  }

  getCS() {
    return this.classService.getCS()
    .subscribe(
      data => {
       console.log(data);
       this.room = data
      }
     );
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService , UserDetails } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/class.service';
import { Room } from 'src/app/services/interface';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  room : Room[];

  constructor(
    private classService : ClassService,
    private location : Location,
    private route : ActivatedRoute
  ) { }

  ngOnInit() {
    const classId = +this.route.snapshot.paramMap.get('classId');
    this.classService.getClassData(classId)
      .subscribe(data => {
        this.room = data
      });
  }

  goBack(){
    this.location.back()
  }
}

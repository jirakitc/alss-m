import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

import { Subject } from '../../services/interface';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {

  subject = new Subject;

  constructor(
    private location: Location,
    private http: HttpClient,
    private userService : UserService
  ) { }

  ngOnInit() {
  }
  goBack(): void {
    this.location.back();
  }

  update(): void {
    this.userService.addSubject(this.subject)
        .subscribe(result => alert(JSON.stringify(result)));
  }
}

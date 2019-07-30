import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

import { Subject } from '../../services/interface';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {

  subject = new Subject;
  subjectID:number;

  constructor(
    private location: Location,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.getmaxID()
  }
  goBack(): void {
    this.location.back();
  }

  onSubmit(data){
    alert(JSON.stringify(data))
    this.http.post<any>('http://localhost:8080/api/create_subject',data)
    .subscribe(result=>{
      alert(JSON.stringify(result))
    })
  }

  getmaxID(){
    this.http.get<any>('http://localhost:8080/api/getSubject')
    .subscribe(res=>{
      //alert(JSON.stringify(userid))
      this.subjectID = res
      this.subjectID++;
    })
  }
}

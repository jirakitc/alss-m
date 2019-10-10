import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http'

import { Entity } from '../../services/interface'

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {
  data : Entity;
  rows: Entity;
  constructor(
    private route : ActivatedRoute,
    private http : HttpClient,
    private location : Location
    ) { }

  ngOnInit() {
    this.listEntity()
  }
  goBack(){
    this.location.back()
  }
  createIntent(data){
    this.http.post<any>('http://localhost:8080/api/CreateIntents',data)
    .subscribe(result=>{
      //alert(JSON.stringify(result))
    })
  };
  
  createEntityType(data){
    this.http.post<any>('http://localhost:8080/api/createEntityType',data)
    .subscribe(result=>{
      //alert(JSON.stringify(result))
    })
  }
  createEntity(data){
    this.http.post<any>('http://localhost:8080/api/createEntity',data)
    .subscribe(result=>{
      //alert(JSON.stringify(result))
    })
  }
  listEntity(){
    this.http.get<Entity>('http://localhost:8080/api/listEntityType')
    .subscribe(result=>{
      //alert(JSON.stringify(result))
      this.rows = result
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http'

import { Entity } from '../../services/interface'
import { ToastrService } from 'ngx-toastr';
import { allResolved } from 'q';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {

  rows: Entity;
  name: any;
  className: any[];

  intentShown : boolean = true;
  entityTypeShown : boolean = false;
  entityShown : boolean = false;

  constructor(
    private route : ActivatedRoute,
    private http : HttpClient,
    private location : Location,
    private toast : ToastrService
    ) { }

  ngOnInit() {
    this.listEntity()
    this.listClassID()
  }
toggleIntentShow(){
  this.intentShown = true
  if (this.entityTypeShown = true)
    this.entityTypeShown = false
  if (this.entityShown = true)
    this.entityShown = false
}
toggleEntityTypeShow(){
  this.entityTypeShown = true
  if (this.intentShown = true)
    this.intentShown = false
  if (this.entityShown = true)
    this.entityShown = false
}
toggleEntityShow(){
  this.entityShown = true
  if (this.intentShown = true)
    this.intentShown = false
  if (this.entityTypeShown = true)
    this.entityTypeShown = false
}
  goBack(){
    this.location.back()
  }
  createIntent(data){
    //alert(JSON.stringify(data))
    this.http.post<any>('http://localhost:8080/api/CreateIntents',data)
    .subscribe(result=>{
      this.toast.success(JSON.stringify(result))
      this.listEntity()
    })
  };
  
  createEntityType(data){
    this.http.post<any>('http://localhost:8080/api/createEntityType',data)
    .subscribe(result=>{
      this.toast.success(JSON.stringify(result))
      this.listEntity()
    })
  }
  createEntity(data){
    this.http.post<any>('http://localhost:8080/api/createEntity',data)
    .subscribe(result=>{
      //alert(JSON.stringify(result))
      this.toast.success(JSON.stringify(result))
      this.listEntity()
    })
  }
  listEntity(){
    this.http.get<Entity>('http://localhost:8080/api/listEntityType')
    .subscribe(result=>{
      //alert(JSON.stringify(result))
      this.rows = result
      this.http.get<Entity>('http://localhost:8080/api/listEntityTypeN')
      .subscribe(name=>{
        this.name = name
      })
    })
  }
  listClassID(){
    this.http.get<any>('http://localhost:8080/api/getClassID')
    .subscribe(result=>{
      //alert(JSON.stringify(result))
      this.className = result
    })
  }

}

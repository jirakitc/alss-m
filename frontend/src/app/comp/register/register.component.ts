import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

import { User } from '../../services/interface';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  customer = new User();
  submitted = false;

  constructor(
    private userService: UserService,
    private location: Location,
    private http: HttpClient
  ) { }
  goBack(): void {
    this.location.back();
  }

  onSubmit(data){
    alert(JSON.stringify(data))
    this.http.post<any>('http://localhost:8080/api/register',data)
    .subscribe(result=>{
      alert(JSON.stringify(result))
    })
  }
  
  ngOnInit() {
  }

}

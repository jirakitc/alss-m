import { Component, OnInit } from '@angular/core';

import { User } from '../../services/interface';
import { UserService } from '../../user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  customer = new User();
  submitted = false;

  constructor(
    private userService: UserService,
    private location: Location
  ) { }

  newCustomer(): void {
    this.submitted = false;
    this.customer = new User();
  }

 addCustomer() {
   this.submitted = true;
   this.save();
 }

  goBack(): void {
    this.location.back();
  }

  private save(): void {
    console.log(this.customer);
    this.userService.addCustomer(this.customer)
        .subscribe();
  }

  ngOnInit() {
  }

}

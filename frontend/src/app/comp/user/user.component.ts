import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { User } from '../../services/interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  customer = new User() ;
  customers: User[];
  message: string;

  constructor(
    private userService : UserService,
    private location : Location
    ) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    return this.userService.getCustomers()
      .subscribe(
        customers => {
          console.log(customers);
          this.customers = customers
        }
      );
  }
  goBack(): void {
    this.location.back();
  }
}

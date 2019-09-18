import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { User } from '../../services/interface';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-userad',
  templateUrl: './userad.component.html',
  styleUrls: ['./userad.component.css']
})
export class UseradComponent implements OnInit {
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

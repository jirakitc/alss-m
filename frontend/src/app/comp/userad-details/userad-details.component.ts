import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../services/interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-userad-details',
  templateUrl: './userad-details.component.html',
  styleUrls: ['./userad-details.component.css']
})
export class UseradDetailsComponent implements OnInit {
  customer = new User() ;
  submitted = false;
  message: string;
  enableChangeType: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getCustomer(id)
      .subscribe(customer => {
        this.customer = customer
      });
  }
  update(): void {
    this.submitted = true;
    this.userService.updateCustomer(this.customer)
        .subscribe(result => this.message = "อัพเดทข้อมูลเรียบร้อย!");
  }

  delete(): void {
    this.submitted = true;
    this.userService.deleteCustomer(this.customer.id)
        .subscribe(result => this.message = "ลบข้อมูลเรียบร้อย!");
  }

  goBack(): void {
    this.location.back();
  }

}

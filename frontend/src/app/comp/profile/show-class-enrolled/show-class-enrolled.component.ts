import { Component, OnInit } from '@angular/core';
import { AuthService , UserDetails } from 'src/app/services/auth.service';
import { ClassService } from 'src/app/services/class.service';
import { Room , classStu } from '../../../services/interface'
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-class-enrolled',
  templateUrl: './show-class-enrolled.component.html',
  styleUrls: ['./show-class-enrolled.component.css']
})
export class ShowClassEnrolledComponent implements OnInit {
  details: UserDetails
  room : classStu[];

  constructor(
    private auth : AuthService,
    private classService: ClassService,
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const userId = +this.route.snapshot.paramMap.get('userId');
    this.classService.getCS(userId)
      .subscribe(data => {
        this.room = data
      });
  }
}

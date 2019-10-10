import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';

import { ClassService } from 'src/app/services/class.service';
import { Room , Content} from 'src/app/services/interface';

@Component({
  selector: 'app-sub-content',
  templateUrl: './sub-content.component.html',
  styleUrls: ['./sub-content.component.css']
})
export class SubContentComponent implements OnInit {
  room : Room[];
  _content : Content[];

  pdf_src = "http://localhost:8080/512_1.pdf"
  src = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf"
  constructor(
    private classService : ClassService,
    private location : Location,
    private route : ActivatedRoute,
    private http : HttpClient
  ) { }
classShown: boolean = true ;
  ngOnInit() {
    const classId = +this.route.snapshot.paramMap.get('classId');
    this.classService.getClassData(classId)
      .subscribe(data => {
        this.room = data
      });
      this.getContent();
  }
  getContent(){
    const classId = +this.route.snapshot.paramMap.get('classId');
    return this.classService.getContentData(classId)
    .subscribe(
      contentData => {
        this._content = contentData
      });
  }

  
}

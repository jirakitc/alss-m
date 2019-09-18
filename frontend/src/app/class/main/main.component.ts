import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http'

import { FileSelectDirective , FileUploader } from 'ng2-file-upload'


import { ClassService } from 'src/app/services/class.service';
import { Room , Content} from 'src/app/services/interface';

const uri = "http://localhost:8080/file/upload"

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  room : Room[];
  _content : Content[];
  uploader:FileUploader = new FileUploader({url:uri})
  attachmentList:any = [];
  subf: any;

  pdf_src = "../backend/nodejs/contents/512_1.pdf"
  src = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf"
  constructor(
    private classService : ClassService,
    private location : Location,
    private route : ActivatedRoute,
    private http : HttpClient
  ) {
    this.uploader.onCompleteItem = ( item:any, response:any , status:any, header:any) =>{
      this.attachmentList.push(JSON.parse(response));
    }
   }

  ngOnInit() {
    const classId = +this.route.snapshot.paramMap.get('classId');
    this.classService.getClassData(classId)
      .subscribe(data => {
        this.room = data
      });
      this.getContent();
  }

  goBack(){
    this.location.back()
  }

  upload(data){
    this.http.post<any>('http://localhost:8080/api/uploadcontent',data)
    .subscribe(result=>{
      alert(JSON.stringify(result))
    })
    console.log(this.subf);
  }

  getContent(){
    const classId = +this.route.snapshot.paramMap.get('classId');
    return this.classService.getContentData(classId)
    .subscribe(
      contentData => {
        this._content = contentData
      }
    );
  }
}

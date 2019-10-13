import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http'

import { FileSelectDirective , FileUploader } from 'ng2-file-upload'


import { ClassService } from 'src/app/services/class.service';
import { Room , Content} from 'src/app/services/interface';
import { ToastrService } from 'ngx-toastr';

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

    // หน้าต่าง show div ต่างๆ //
    chatShown: boolean = true ;
    dataShown: boolean = false ;
    // หน้าต่าง show div ต่างๆ //

  pdf_src = ""

  constructor(
    private classService : ClassService,
    private location : Location,
    private route : ActivatedRoute,
    private http : HttpClient,
    private toast : ToastrService
  ) {
    this.uploader.onCompleteItem = ( item:any, response:any , status:any, header:any) =>{
      this.attachmentList.push(JSON.parse(response));
      this.toast.success('อัพโหลดไฟล์เรียบร้อย')
    }
   }
   addTodo(text){
     console.log(text)
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
      //alert(JSON.stringify(result))
      this.toast.success('บันทึกเรียบร้อย')
    })
    console.log(this.subf);
  }

  getContent(){
    const classId = +this.route.snapshot.paramMap.get('classId');
    return this.classService.getContentData(classId)
    .subscribe(
      contentData => {
        this._content = contentData
      });
  }


  toggleChatShow() {
    this.chatShown = true
    if(this.dataShown = true)
        this.dataShown = false
  }

  toggleDataShow(){
    this.dataShown = true
    if(this.chatShown = true)
        this.chatShown = false
  }

  get_src(data){
    // alert(data)
    // this.http.post<any>('http://localhost:8080/api/get_src',data)
    // .subscribe(src=>{
    //   alert(JSON.stringify(src))
    // })
    this.pdf_src="http://localhost:8080/MS-Access2010.pdf"
  }
}

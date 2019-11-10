import { Component, OnInit , Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http'

import { FileSelectDirective , FileUploader } from 'ng2-file-upload'


import { ClassService } from 'src/app/services/class.service';
import { Room , Content , src} from 'src/app/services/interface';
import { ToastrService } from 'ngx-toastr';

const uri = "http://localhost:8080/file/upload"

@Component({
  selector: 'app-tclass',
  templateUrl: './tclass.component.html',
  styleUrls: ['./tclass.component.css']
})
export class TclassComponent implements OnInit {
  room : Room[];
  _content : Content[];
  _quiz : any[];
  @Input() _src : src;
  uploader:FileUploader = new FileUploader({url:uri})
  attachmentList:any = [];
  subf: any;

    // หน้าต่าง show div ต่างๆ //
    chatShown: boolean = false ;
    dataShown: boolean = true ;
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
  ngOnInit() {
    const classId = +this.route.snapshot.paramMap.get('classId');
    this.classService.getClassData(classId)
      .subscribe(data => {
        this.room = data
      });
      this.getContent();
      this.getQuiz();
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
    this.http.post<any>('http://localhost:8080/api/get_src',data)
    .subscribe(result=>{
      this._src = result
      this.pdf_src=`http://localhost:8080/${this._src[0].content_address}`
      //this.pdf_src=`http://localhost:8080/บทที่ 1 DBMS.pdf`
    })   
  }

  getQuiz(){
    const classId = +this.route.snapshot.paramMap.get('classId');
    this.classService.getQuiz(classId)
      .subscribe(data => {
        //alert(JSON.stringify(data))
        this._quiz = data
      });
  }
}

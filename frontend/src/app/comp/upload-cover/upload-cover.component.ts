import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-cover',
  templateUrl: './upload-cover.component.html',
  styleUrls: ['./upload-cover.component.css']
})
export class UploadCoverComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onUpload(cover){
    this.http.post<any>('http://localhost:8080/single',cover)
    .subscribe(result=>{
      alert(JSON.stringify(result))
    })
  }
}

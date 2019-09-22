import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-dialogflow',
  templateUrl: './dialogflow.component.html',
  styleUrls: ['./dialogflow.component.css']
})
export class DialogflowComponent implements OnInit {

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }
  
  createIntent(data){
    this.http.post<any>('https://dialogflow.googleapis.com/v2/sunlit-descent-239004/intents',data)
    .subscribe(result=>{
      alert(JSON.stringify(result))
    })
  }
}

import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DialogflowService {

  private baseURL: string = "https://api.dialogflow.com/v1/query?v=20150910";
  private token: string = 'b76fa8a6223246a7b63c3a365c4d9c1d'

  constructor(private http: HttpClient){}

  public getResponse(query: string){
    let data = {
      query : query,
      lang: 'th',
      sessionId: '12345'
    }
    return this.http
    .post(`${this.baseURL}`, data, {headers: this.getHeaders()})
    // .pipe(map(res => {
    //   return res.json()
    // }))
  }

  public getHeaders(){
    let headers = new HttpHeaders();
    headers.append('Authorization', `Bearer ${this.token}`);
    return headers;
  }
}

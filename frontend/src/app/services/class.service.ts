import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';


import { Room , Subject } from './interface';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(
    private http: HttpClient
  ) { }

  getRoom (): Observable<Room[]> {
    return this.http.get<Room[]>('http://localhost:8080/api/get-class')
  }

  getSubject (): Observable<Subject[]> {
    return this.http.get<Subject[]>('http://localhost:8080/api/get_subject')
  }
}

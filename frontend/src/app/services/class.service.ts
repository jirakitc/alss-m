import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';



import { Room , Subject , classStu, Content } from './interface';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private getCSUrl = 'http://localhost:8080/api/getcs';
  private getClassDataUrl = 'http://localhost:8080/api/getClassID';
  private getContentDataUrl = 'http://localhost:8080/api/getContentData';
  private getQuizUrl = 'http://localhost:8080/api/getQuiz';

  constructor(
    private http: HttpClient
  ) { }

  getRoom (): Observable<Room[]> {
    return this.http.get<Room[]>('http://localhost:8080/api/get-class')
  }

  getContent (): Observable<Content[]> {
    return this.http.get<Content[]>('http://localhost:8080/api/getContentData')
  }

  getSubject (): Observable<Subject[]> {
    return this.http.get<Subject[]>('http://localhost:8080/api/get_subject')
  }

  getCS(userId : number): Observable<classStu[]>{
    const url = `${this.getCSUrl}/${userId}`;
    return this.http.get<classStu[]>(url); 
  }

  getClassData(classId : number): Observable<Room[]>{
    const url = `${this.getClassDataUrl}/${classId}`;
    return this.http.get<Room[]>(url); 
  }
  getContentData(classId : number): Observable<Content[]>{
    const url = `${this.getContentDataUrl}/${classId}`;
    return this.http.get<Content[]>(url); 
  }

  getQuiz(classId : number): Observable<any[]>{
    const url = `${this.getQuizUrl}/${classId}`;
    return this.http.get<any[]>(url);
  }
}

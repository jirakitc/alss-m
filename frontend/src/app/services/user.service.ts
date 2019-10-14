import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User , Room , Subject , classStu } from './interface';
//import { Toast } from 'ngx-toastr'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private customersUrl = 'http://localhost:8080/api/customers';
  
  constructor(
    private http: HttpClient,
    ) { }

  getCustomers (): Observable<User[]> {
    return this.http.get<User[]>(this.customersUrl)
  }

  getCustomer(id: number): Observable<User> {
    const url = `${this.customersUrl}/${id}`;
    return this.http.get<User>(url);
  }

  addCustomer (user: User): Observable<User> {
    return this.http.post<User>(this.customersUrl, user, httpOptions);
  }

  addClass (room: Room): Observable<Room> {
    return this.http.post<Room>('http://localhost:8080/api/add-class', room, httpOptions);
  }

  
  addSubject (subject: Subject): Observable<Subject> {
    return this.http.post<Subject>('http://localhost:8080/api/create_subject', subject, httpOptions);
  }

  deleteCustomer (user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.customersUrl}/${id}`;

    return this.http.delete<User>(url, httpOptions);
  }

  updateCustomer (customer: User): Observable<any> {
    return this.http.put(this.customersUrl, customer, httpOptions);
  }

  enroll (enroll: classStu): Observable<classStu> {
    return this.http.post<classStu>('http://localhost:8080/api/enroll', enroll, httpOptions);
    
  }
}

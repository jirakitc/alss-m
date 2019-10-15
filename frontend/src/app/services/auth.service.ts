import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'

import { User , TokenPayload } from '../services/interface'

interface TokenResponse {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // ประกาศตัวแปร
  private token: string;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  
  public getUserDetails(): User {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return user.exp > Date.now() / 5000
    } else {
      return false
    }
  }

  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post('http://localhost:8080/api/login2', user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )
    return request
  }

  public profile(): Observable<any> {
    return this.http.get('http://localhost:8080/api/profile', {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public class_Profile(): Observable<any> {
    return this.http.get('http://localhost:8080/api/getcs', {
      headers: { classAuth: ` ${this.getToken()}` }
    })
  }


  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }

}

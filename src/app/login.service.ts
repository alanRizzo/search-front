import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_URL = 'http://localhost:8000/api/token/';

  private httpOptions: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('currentUserAccess');

    // Check whether the token is expired and return true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  login(user: string, pass: string) {
    const body = JSON.stringify({ username: user, password: pass });
    return this.http.post(`${this.API_URL}`, body, this.httpOptions);
  }

  setToken(data: any) {
    localStorage.setItem('currentUserAccess', data.access);
    localStorage.setItem('currentUserRefresh', data.refresh);
    this.router.navigate(['/']);
  }

  getToken(): string {
    return localStorage.getItem('currentUserAccess');
  }

  logout() {
    // remove user from local storage to log out
    localStorage.removeItem('currentUserAccess');
    localStorage.removeItem('currentUserRefresh');
    this.router.navigate(['/login']);
  }
}

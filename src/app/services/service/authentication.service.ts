import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../model/user.model';
import { Logins } from './../model/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  apiUrlAuth = 'http://127.0.0.1:8000/auth';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  public criarUsuario(user: any): Observable<User> {
    return this.http.post<any>(
      this.apiUrlAuth + '/registration/',
      user,
      this.httpOptions
    );
  }

  public logarUsuario(login: any): Observable<Logins> {
    return this.http.post<any>(
      this.apiUrlAuth + '/login/',
      login,
      this.httpOptions
    );
  }
}

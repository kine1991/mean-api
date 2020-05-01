import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface SigninCredentials {
  email: string;
  password: string;
}

export interface SigninResponse {
  status: string;
  token: string;
  data: {
      user: {
          role: string,
          _id: string,
          name: string,
          email: string,
          photo?: string,
          __v: 0
      }
  };
}

export interface GetMeResponse {
  status: string;
  data: {
      user: {
          role: string,
          _id: string,
          name: string,
          email: string,
          photo?: string,
          __v: 0
      }
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth$ = new BehaviorSubject(false);
  constructor(
    private http: HttpClient
  ) { }

  getEmail(email: string) {
    return this.http.get(`${environment.url}/api/v1/users/getEmail/${email}`);
  }

  signIn(credentials: SigninCredentials) {
    return this.http.post<SigninResponse>(`${environment.url}/api/v1/users/login`, credentials)
      .pipe(
        tap(({ token }) => {
          if (token) {
            this.isAuth$.next(true);
          }
        })
      )
      .subscribe(response => {
        console.log('response', response);
      });
  }

  signUp() {

  }

  test() {
    return this.http.get(`${environment.url}/api/v1/users`);
  }

  getMe() {
    return this.http.get<GetMeResponse>(`${environment.url}/api/v1/users/getMe`)
      .pipe(
        tap(({ status }) => {
          if (status === 'success') {
            this.isAuth$.next(true);
          }
        })
      );
  }

  logout() {
    return this.http.get(`${environment.url}/api/v1/users/logout`)
      .pipe(
        tap(() => {
          this.isAuth$.next(false);
        })
      );
  }
}


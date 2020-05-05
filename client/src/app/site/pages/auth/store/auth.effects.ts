import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import * as AuthActions from './auth.actions';
import { switchMap, tap, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

export interface SigninCredentials {
  email: string;
  password: string;
}

export interface SigninResponse {
  status: string;
  token?: string;
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

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  @Effect()
  signIn = this.actions$.pipe(
    ofType(AuthActions.SIGN_IN_START),
    switchMap(({ payload }: AuthActions.SignInStart) => {
      // console.log('credentials', payload);
      return this.http.post<SigninResponse>(`${environment.url}/api/v1/users/login`, payload)
        .pipe(
          map(responseData => {
            return new AuthActions.SignInSuccess(responseData.data.user);
          }),
          catchError(error => {
            // console.log('autoLogin - @Effect()', error);
            return of(new AuthActions.SignInFailure(error));
          })
        );
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN_START),
    switchMap(() => {
      return this.http.get<SigninResponse>(`${environment.url}/api/v1/users/checkAuth`)
        .pipe(
          map(responseData => {
            console.log('autoLogin - @Effect()', responseData);
            return new AuthActions.AutoLoginSuccess(responseData.data.user);
          }),
          catchError(error => {
            // console.log('error - @Effect()', error);
            return of(new AuthActions.AutoLoginFailure(error));
          })
        );
    })
  );

  @Effect()
  logout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    switchMap(() => {
      return this.http.get(`${environment.url}/api/v1/users/logout`);
    })
  );
}

import { Action } from '@ngrx/store';

export const SIGN_IN_START = 'SIGN_IN_START';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

export const SIGN_UP_START = 'SIGN_UP_START';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const AUTO_LOGIN_START = 'AUTO_LOGIN_START';
export const AUTO_LOGIN_SUCCESS = 'AUTO_LOGIN_SUCCESS';
export const AUTO_LOGIN_FAILURE = 'AUTO_LOGIN_FAILURE';

export const LOGOUT = 'LOGOUT';

export interface SigninCredentials {
  email: string;
  password: string;
}

export interface SigninResponseShort {
  _id: string;
  role: string;
  name: string;
  email: string;
  photo?: string;
  __v: 0;
  // user: {
  //   _id: string,
  //   role: string,
  //   name: string,
  //   email: string,
  //   photo?: string,
  //   __v: 0
  // };
}

// SIGN IN
export class SignInStart implements Action {
  readonly type = SIGN_IN_START;

  constructor(public payload: SigninCredentials) {}
}

export class SignInSuccess implements Action {
  readonly type = SIGN_IN_SUCCESS;

  constructor(public payload: SigninResponseShort) {}
}

export class SignInFailure implements Action {
  readonly type = SIGN_IN_FAILURE;

  constructor(public payload: any) {}
}

// AUTO LOGIN
export class AutoLoginStart implements Action {
  readonly type = AUTO_LOGIN_START;
}

export class AutoLoginSuccess implements Action {
  readonly type = AUTO_LOGIN_SUCCESS;

  constructor(public payload: any) {}
}

export class AutoLoginFailure implements Action {
  readonly type = AUTO_LOGIN_FAILURE;

  constructor(public payload: any) {}
}

// LOGOUT
export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AuthActions = SignInStart | SignInSuccess | SignInFailure | AutoLoginStart | AutoLoginSuccess | AutoLoginFailure | Logout;

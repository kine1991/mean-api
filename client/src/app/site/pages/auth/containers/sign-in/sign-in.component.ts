import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthService } from '../../service/auth.service';
import * as fromApp from '../../../../../store/app.reducer';
import * as AuthActions from '../../store/auth.actions';

export interface SigninCredentials {
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup;

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('user1@mail.ru', Validators.required),
      password: new FormControl('12345678', Validators.required)
    });
  }

  submit() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.store.dispatch(new AuthActions.SignInStart({ email, password }));
    // console.log(this.form);
    // this.authService.signIn(this.form.value);
  }

  test() {
    this.authService.test().subscribe(res => {
      console.log('res', res);
    });
  }

  getMe() {
    this.authService.getMe().subscribe(res => {
      console.log('get me', res);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('user1@mail.ru', Validators.required),
      password: new FormControl('12345678', Validators.required)
    });
  }

  submit() {
    // console.log(this.form);
    this.authService.signIn(this.form.value);
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

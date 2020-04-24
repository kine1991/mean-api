import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyValidators } from 'src/app/shared/validators/my.validators';
import { UniqueEmail } from 'src/app/shared/validators/unique-email.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  form: FormGroup;

  constructor(
    private uniqueEmail: UniqueEmail
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl(
        '',
        [
          Validators.required,
          Validators.email,
          MyValidators.restrictedEmails
        ],
        [this.uniqueEmail.validate]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
      ]),
      passwordConfirm: new FormControl('')
    });
  }

  submit() {
    console.log(this.form);
  }

}

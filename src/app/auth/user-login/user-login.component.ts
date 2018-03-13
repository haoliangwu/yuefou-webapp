import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  isSignup = false;
  email: string;
  password: string;
  isRemember = false;
  username: string;

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      username: '',
      isRemember: false
    });
  }

  toggleSignup() {
    this.isSignup = !this.isSignup;
  }

  signupOrLogin() {
    if (this.isSignup) {
      this.signup();
    } else {
      this.login();
    }
  }

  private signup() {

  }

  private login() {
    const value = this.loginForm.getRawValue();

    console.log(value);
  }
}

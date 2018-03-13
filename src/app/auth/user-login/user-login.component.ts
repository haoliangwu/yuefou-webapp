import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService, LoginMutationPayload } from '../auth.service';
import { LocalStorageService } from 'ngx-webstorage';
import { LOCALSTORAGE } from '../../constants';

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
    private fb: FormBuilder,
    private authService: AuthService,
    private storage: LocalStorageService
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
    const formRawVal = this.loginForm.getRawValue();

    if (this.isSignup) {
      this.signup(formRawVal);
    } else {
      this.login(formRawVal);
    }
  }

  private signup(value) {
    this.authService.signup(value.email, value.password, value.name)
      .subscribe(e => {
        console.log(e.data);
      });
  }

  private login(value) {
    this.authService.login(value.email, value.password)
      .subscribe(result => {
        const { login: { token } } = result.data as LoginMutationPayload;

        this.storage.store(LOCALSTORAGE.API_TOKEN, token);
      });
  }
}

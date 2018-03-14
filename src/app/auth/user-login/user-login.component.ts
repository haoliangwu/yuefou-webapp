import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService, LoginMutationPayload, SignupMutationPayload } from '../auth.service';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
import { LOCALSTORAGE } from '../../constants';
import { Router } from '@angular/router';

export interface LoginFormVal {
  email: string;
  password: string;
  name?: string;
  isRemember: boolean;
}

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  isSignup = false;
  loginForm: FormGroup;

  @LocalStorage(LOCALSTORAGE.REMEMBER_ME)
  isRemember: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storage: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.isRemember) {
      const token = this.storage.retrieve(LOCALSTORAGE.API_TOKEN);

      this.redirect(token, true);
    } else {
      // reset the user info
      this.storage.clear(LOCALSTORAGE.API_TOKEN);
      this.storage.clear(LOCALSTORAGE.REMEMBER_ME);

      // reset the form
      this.createForm();
    }
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
    const formRawVal: LoginFormVal = this.loginForm.getRawValue();

    if (this.isSignup) {
      this.signup(formRawVal);
    } else {
      this.login(formRawVal);
    }
  }

  private signup(value: LoginFormVal) {
    const username = value.name || value.email.split('@').pop();

    this.authService.signup(value.email, value.password, username)
      .subscribe(result => {
        const { signup: { token } } = result.data as SignupMutationPayload;

        this.redirect(token, true);
      });
  }

  private login(value: LoginFormVal) {
    this.authService.login(value.email, value.password)
      .subscribe(result => {
        const { login: { token } } = result.data as LoginMutationPayload;

        this.redirect(token, value.isRemember);
      });
  }

  private redirect(token: string, isRemember: boolean = false) {
    this.storage.store(LOCALSTORAGE.API_TOKEN, token);
    this.storage.store(LOCALSTORAGE.REMEMBER_ME, isRemember);

    this.router.navigate(['/profile']);
  }
}

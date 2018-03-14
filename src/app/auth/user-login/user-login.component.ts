import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService, LoginMutationPayload } from '../auth.service';
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storage: LocalStorageService,
    private router: Router
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
    const formRawVal: LoginFormVal = this.loginForm.getRawValue();

    if (this.isSignup) {
      this.signup(formRawVal);
    } else {
      this.login(formRawVal);
    }
  }

  private signup(value: LoginFormVal) {
    this.authService.signup(value.email, value.password, value.name)
      .subscribe(e => {
        console.log(e.data);
      });
  }

  private login(value: LoginFormVal) {
    this.authService.login(value.email, value.password)
      .subscribe(result => {
        const { login: { token } } = result.data as LoginMutationPayload;

        this.storage.store(LOCALSTORAGE.API_TOKEN, token);
          this.storage.store(LOCALSTORAGE.REMEMBER_ME, value.isRemember);

        this.router.navigate(['/profile']);
      });
  }
}

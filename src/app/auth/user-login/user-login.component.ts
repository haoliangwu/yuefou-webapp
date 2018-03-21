import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService, LoginMutationPayload, SignupMutationPayload } from '../auth.service';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
import { LOCALSTORAGE, TOAST } from '../../constants';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormUtilService } from '../../shared/services/form-util.service';
import { opacityTransition } from '../../animations/transition';
import { TranslateService } from '@ngx-translate/core';

export interface LoginFormVal {
  email: string;
  password: string;
  name?: string;
  isRemember: boolean;
}

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
  animations: [opacityTransition]
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
    private router: Router,
    private toastrService: ToastrService,
    private formUtil: FormUtilService,
    private translate: TranslateService
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

    this.loginForm.reset();
  }

  signupOrLogin() {
    if (this.loginForm.invalid) {
      this.formUtil.validateAllFormFields(this.loginForm);
      this.toastrService.warning(this.translate.instant('TOAST.WARN.INVALID_FORM'));
      return;
    }

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
      .subscribe(
        result => {
          const { signup: { token } } = result.data as SignupMutationPayload;

          this.toastrService.success(this.translate.instant('TOAST.SUCCESS.SIGN_UP'));

          this.redirect(token, true);
        }
      );
  }

  private login(value: LoginFormVal) {
    this.authService.login(value.email, value.password)
      .subscribe(
        result => {
          const { login: { token } } = result.data as LoginMutationPayload;

          this.toastrService.success(this.translate.instant(TOAST.SUCCESS.LOGIN));

          this.redirect(token, value.isRemember);
        }
      );
  }

  private redirect(token: string, isRemember: boolean = false) {
    this.storage.store(LOCALSTORAGE.API_TOKEN, token);
    this.storage.store(LOCALSTORAGE.REMEMBER_ME, isRemember);

    this.router.navigate(['/profile']);
  }
}

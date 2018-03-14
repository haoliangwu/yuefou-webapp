import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  declarations: [
    UserLoginComponent
  ],
  providers: [
    AuthService,
    AuthGuardService
  ]
})
export class AuthModule { }

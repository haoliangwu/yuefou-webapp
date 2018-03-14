import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'ngx-webstorage';
import { LOCALSTORAGE } from '../constants';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private storage: LocalStorageService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    return this.checkLoggedIn();
  }

  checkLoggedIn() {
    const token = this.storage.retrieve(LOCALSTORAGE.API_TOKEN);
    const isRemember = this.storage.retrieve(LOCALSTORAGE.REMEMBER_ME);

    if (token && isRemember) {
      return true;
    } else {
      this.router.navigate(['/login']);

      return false;
    }
  }
}

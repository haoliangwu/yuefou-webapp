import { Injectable } from '@angular/core';
import { UserService } from '../../../shared/services';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../../../model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class SettingsResolver {

  constructor(
    private userService: UserService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
    return this.userService.me().pipe(
      map(e => e.data.me)
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { take, map, startWith, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';
import * as R from 'ramda';
import { filter } from 'rxjs/operators';
import { User } from '../../../model';
import { LOCALSTORAGE, APP_HOST } from '../../../constants';
import { LocationUtilService } from '../../services';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  user$: Observable<User> = this.storage.observe(LOCALSTORAGE.USER).pipe(
    filter(R.complement(R.isNil))
  );
  avatar$: Observable<string>;

  constructor(
    private router: Router,
    private storage: LocalStorageService,
    private locationUtil: LocationUtilService
  ) { }

  ngOnInit() {
    this.avatar$ = this.user$
      .pipe(
        switchMap(user => {
          const img = new Image();

          if (this.locationUtil.isInternalHost()) {
            img.src = `${location.protocol}//${APP_HOST}/tmp/${user.id}/${user.avatar}`;
          } else {
            img.src = `tmp/${user.id}/${user.avatar}`;
          }

          return fromEvent(img, 'load')
            .pipe(
              map((e: Event) => (e.target as HTMLImageElement).src),
          );
        }),
        startWith('assets/images/default_avatar.jpg'));

  }

  redirect() {
    // this.router.navigate(['/profile/dashboard']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from 'ngx-webstorage';
import { LOCALSTORAGE, DEFAULT_ASSETS_HOST } from '../../constants';
import { User } from '../../model';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { take, map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';
import { LocationUtilService } from '../../shared/services/location-util.service';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @LocalStorage(LOCALSTORAGE.USER) user: User;
  avatar$: Observable<string>;

  constructor(
    private router: Router,
    private locationUtil: LocationUtilService
  ) { }

  ngOnInit() {
    const img = new Image();

    if (this.locationUtil.isInternalHost()) {
      img.src = `${DEFAULT_ASSETS_HOST}/tmp/${this.user.id}/${this.user.avatar}`;
    } else {
      img.src = `tmp/${this.user.id}/${this.user.avatar}`;
    }

    this.avatar$ = fromEvent(img, 'load')
      .pipe(
        map((e: Event) => (e.target as HTMLImageElement).src),
        startWith('assets/images/default_avatar.jpg')
      );
  }

  redirect() {
    // this.router.navigate(['/profile/dashboard']);
  }

}

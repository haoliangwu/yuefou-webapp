import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { take, map, startWith, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';
import * as R from 'ramda';
import { filter } from 'rxjs/operators';
import { User } from '../../../model';
import { LOCALSTORAGE, APP_HOST } from '../../../constants';
import { LocationUtilService } from '../../services';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  @Input() enableUpload = false;
  @Input() theme = 'navigator';
  @Input() minHeight: string;
  user$: Observable<User> = this.storage.observe(LOCALSTORAGE.USER);

  @Input() avatar: string;

  @Output() clickRequest = new EventEmitter<void>();
  @Output() uploadReqeust = new EventEmitter<File>();

  get themeClass() {
    return [this.theme];
  }

  constructor(
    private router: Router,
    private storage: LocalStorageService,
    private locationUtil: LocationUtilService
  ) { }

  ngOnInit() {
    const currentUser: User = this.storage.retrieve(LOCALSTORAGE.USER);

    this.sub = merge(this.user$, of(currentUser))
      .pipe(
        filter(user => user && !!user.avatar),
        map(user => user.avatar),
        startWith('assets/images/default_avatar.jpg'),
        tap(avatar => this.avatar = avatar)
      ).subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  click() {
    this.clickRequest.next();
  }

  selectFile(files: FileList) {
    this.uploadReqeust.next(files[0]);
  }
}

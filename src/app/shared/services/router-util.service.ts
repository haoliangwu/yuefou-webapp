import { Injectable } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { tap, filter, publish, refCount, publishBehavior, mapTo, delay } from 'rxjs/operators';
import * as R from 'ramda';
import { merge } from 'rxjs/observable/merge';

@Injectable()
export class RouterUtilService {

  routerAnimation$ = new BehaviorSubject(false);
  // loadingStart$: Observable<boolean> = this.router.events.pipe(filter(R.is(NavigationStart)), mapTo(false));
  // loadingEnd$: Observable<boolean> = this.router.events.pipe(filter(R.is(NavigationEnd)), mapTo(true));

  // loadingStatus$: Observable<boolean> = merge(this.loadingStart$, this.loadingEnd$).pipe(
  //   delay(1000),
  //   publishBehavior(false),
  //   refCount()
  // );

  constructor(
    private router: Router
  ) { }
}

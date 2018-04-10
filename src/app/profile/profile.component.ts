import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { slideLeftTransition } from '../animations/router-transition';
import { LocalStorageService } from 'ngx-webstorage';
import { LOCALSTORAGE } from '../constants';
import { RouterUtilService, UserService } from '../shared/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [slideLeftTransition]
})
export class ProfileComponent implements OnInit {

  opened: boolean;
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private userService: UserService,
    private storage: LocalStorageService,
    private routerUtil: RouterUtilService
  ) { }

  ngOnInit() {
    this.userService.me().subscribe(e => {
      this.storage.store(LOCALSTORAGE.USER, e.data.me);
    });
  }

  animationStart(event) {
    this.routerUtil.routerAnimation$.next(false);
  }

  animationDone(event) {
    this.routerUtil.routerAnimation$.next(true);
  }
}

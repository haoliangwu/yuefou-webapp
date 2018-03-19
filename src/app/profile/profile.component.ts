import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { slideLeftTransition } from '../animations/router-transition';
import { UserService } from './services/user.service';
import { LocalStorageService } from 'ngx-webstorage';
import { LOCALSTORAGE } from '../constants';

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
    private storage: LocalStorageService
  ) { }

  ngOnInit() {
    this.userService.me().subscribe(e => {
      this.storage.store(LOCALSTORAGE.USER, e.data.me);
    });
  }
}

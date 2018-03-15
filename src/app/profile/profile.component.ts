import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { slideLeftTransition } from '../animations/router-transition';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [slideLeftTransition]
})
export class ProfileComponent implements OnInit {

  opened: boolean;
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.sidenav.toggle();
  }
}

import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private profileComp: ProfileComponent
  ) { }

  ngOnInit() {
  }

  toggle() {
    this.profileComp.sidenav.toggle();
  }
}


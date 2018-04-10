import { Component, OnInit, Optional, Input } from '@angular/core';
import { ProfileComponent } from '../../../profile/profile.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() noToggle = false;

  constructor(
    @Optional() private profileComp: ProfileComponent,
  ) { }

  ngOnInit() {
  }

  toggle() {
    this.profileComp.sidenav.toggle();
  }
}


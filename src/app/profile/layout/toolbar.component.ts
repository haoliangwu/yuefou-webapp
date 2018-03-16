import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';
import { LOCALSTORAGE, TOAST } from '../../constants';
import { ProfileComponent } from '../profile.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private router: Router,
    private storage: LocalStorageService,
    private toastService: ToastrService,
    private profileComp: ProfileComponent
  ) { }

  ngOnInit() {
  }

  toggle() {
    this.profileComp.sidenav.toggle();
  }
}


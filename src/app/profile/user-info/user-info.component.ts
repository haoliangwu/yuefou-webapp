import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  redirect() {
    this.router.navigate(['/profile/dashboard']);
  }

}

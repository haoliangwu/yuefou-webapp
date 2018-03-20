import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../services/activity.service';
import { Activity } from '../../model';
import { Observable } from 'rxjs/Observable';
import * as R from 'ramda';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  activities$: Observable<Activity[]>;

  constructor(
    private activityService: ActivityService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activities$ = this.activityService.activities();
  }

  createActivity() {
    this.router.navigate(['/profile/activity/create']);
  }
}

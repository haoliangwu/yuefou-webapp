import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../services/activity.service';
import { Activity } from '../../model';
import { Observable } from 'rxjs/Observable';
import * as R from 'ramda';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  activities$: Observable<Activity[]>;

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activities$ = this.activityService.activities();
  }

  create() {
    this.router.navigate(['/profile/activity/create']);
  }

  update(activity: Activity) {
    this.router.navigate(['/profile/activity/update/:id', { id: activity.id }]);
  }

  delete() {

  }

  share() {

  }
}

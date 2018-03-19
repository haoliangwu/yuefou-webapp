import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../services/activity.service';
import { Activity } from '../../model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import * as R from 'ramda';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  activities$: Observable<Activity[]>;

  constructor(
   public activityService: ActivityService
  ) { }

  ngOnInit() {
    this.activities$ = this.activityService.activities().pipe(
      map(R.path(['data', 'activities']))
    );
  }

}

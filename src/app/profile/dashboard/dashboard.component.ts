import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../services/activity.service';
import { Observable } from 'apollo-link';
import { Activity } from '../../model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activities: Activity[];

  panelOpenState: boolean;

  constructor(
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    this.activityService.activities()
      .subscribe(result => {
        this.activities = result.data.activities;
      });
  }

}

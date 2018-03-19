import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../services/activity.service';
import { Observable } from 'apollo-link';
import { Activity } from '../../model';
import { tap } from 'rxjs/operators';
import { DialogUtilService } from '../../shared/modules/dialog/dialog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activities: Activity[];

  panelOpenState: boolean;

  constructor(
    private activityService: ActivityService,
    private dialogUtil: DialogUtilService,
  ) { }

  ngOnInit() {
    this.activityService.activities()
      .subscribe(activities => {
        this.activities = activities;
      });
  }

  attendActivity() {
    // TODO 触发增加新活动的弹窗
    const dialogRef = this.dialogUtil.attendActivity();

    dialogRef.afterClosed().pipe(
      // TODO 参加活动
      tap(e => e)
    ).subscribe();
  }
}

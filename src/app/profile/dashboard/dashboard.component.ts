import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity/activity.service';
import { Activity } from '../../model';
import { tap, map } from 'rxjs/operators';
import { DialogUtilService } from '../../shared/modules/dialog/dialog.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activities$: Observable<Activity[]>;

  panelOpenState: boolean;

  constructor(
    private activityService: ActivityService,
    private dialogUtil: DialogUtilService
  ) { }

  ngOnInit() {
    this.activities$ = this.activityService.activities$.valueChanges
      .pipe(map(e => e.data.activities));
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

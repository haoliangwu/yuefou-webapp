import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity/activity.service';
import { Activity } from '../../model';
import { tap, map } from 'rxjs/operators';
import { DialogUtilService } from '../../shared/modules/dialog/dialog.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';

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
    private dialogUtil: DialogUtilService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.activities$ = this.activityService.activitiesWatch().valueChanges
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

  update(activity: Activity) {
    this.router.navigate(['/profile/activity/update/:id', { id: activity.id }]);
  }

  share() {
    this.activityService.share();
  }
}

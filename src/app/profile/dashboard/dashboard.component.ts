import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity/activity.service';
import { Activity, activitiesQuery } from '../../model';
import { tap, map, switchMap } from 'rxjs/operators';
import { DialogUtilService } from '../../shared/modules/dialog/dialog.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  activitiesQuery: QueryRef<activitiesQuery>;

  panelOpenState: boolean;

  constructor(
    private activityService: ActivityService,
    private dialogUtil: DialogUtilService,
    private router: Router,
    private toastService: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.activitiesQuery = this.activityService.activities();
  }

  attendActivity() {
    // TODO 触发增加新活动的弹窗
    const dialogRef = this.dialogUtil.attendActivity();

    dialogRef.afterClosed().pipe(
      filter(e => !!e),
      switchMap(activityId => this.activityService.attend(activityId)),
      filter(activity => !!activity),
      tap(activity => {
        this.toastService.success(this.translate.instant('ACTIVITY.TOAST.ATTEND_SUCCESS', { title: activity.title }));
      })
    ).subscribe();
  }

  update(activity: Activity) {
    this.router.navigate(['/profile/activity/update/:id', { id: activity.id }]);
  }

  share() {
    this.activityService.share();
  }

  quit(activity: Activity) {
    this.dialogUtil.confirm({
      data: {
        message: `确定要退出活动【${activity.title}】吗？`
      }
    }).afterClosed().pipe(
      switchMap(() => this.activityService.quit(activity.id)),
      tap(({ title }) => {
        this.toastService.success(this.translate.instant('ACTIVITY.TOAST.QUIT_SUCCESS', { title }));
      })
    ).subscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivityService } from './activity.service';
import { Activity } from '../../model';
import { Observable } from 'rxjs/Observable';
import * as R from 'ramda';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogUtilService } from '../../shared/modules/dialog/dialog.service';
import { switchMap, tap, filter, map } from 'rxjs/operators';
import { TOAST } from '../../constants';
import { TranslateService } from '@ngx-translate/core';
import { QueryRef } from 'apollo-angular';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  activitiesQuery: QueryRef<{activities: Activity[]}>;

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService,
    private dialogUtil: DialogUtilService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.activitiesQuery = this.activityService.activitiesWatch();
  }

  create() {
    this.router.navigate(['/profile/activity/create']);
  }

  update(activity: Activity) {
    this.router.navigate(['/profile/activity/update/:id', { id: activity.id }]);
  }

  delete(activity: Activity) {
    const dialogRef = this.dialogUtil.confirm({
      data: {
        message: '确定要删除该项活动？'
      }
    });


    dialogRef.afterClosed().pipe(
      filter(e => !!e),
      switchMap(() => this.activityService.delete(activity.id)),
      tap(() => {
        this.toastService.success(this.translate.instant('TOAST.SUCCESS.BASE'));
      })
    ).subscribe();
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

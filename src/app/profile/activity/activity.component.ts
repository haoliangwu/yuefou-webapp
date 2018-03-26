import { Component, OnInit, Inject } from '@angular/core';
import { ActivityService } from './activity.service';
import { Activity, activitiesConnectionQuery, activitiesConnectionQueryVariables, AppConfig } from '../../model';
import { Observable } from 'rxjs/Observable';
import * as R from 'ramda';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogUtilService } from '../../shared/modules/dialog/dialog.service';
import { switchMap, tap, filter, map, flatMap } from 'rxjs/operators';
import { TOAST } from '../../constants';
import { TranslateService } from '@ngx-translate/core';
import { QueryRef } from 'apollo-angular';
import { AppConfigToken } from '../../app.config';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  step = 0;
  activitiesQuery: QueryRef<activitiesConnectionQuery, activitiesConnectionQueryVariables>;
  activities$: Observable<Activity[]>;

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService,
    private dialogUtil: DialogUtilService,
    private translate: TranslateService,
    @Inject(AppConfigToken) private appConfig: AppConfig
  ) { }

  ngOnInit() {
    this.activitiesQuery = this.activityService.activitiesConnection({
      ...this.appConfig.pagination
    });

    this.activities$ = this.activitiesQuery.valueChanges.pipe(
      filter(result => !result.loading),
      map(result => {
        const { edges } = result.data.activitiesConnection;

        return R.map(R.prop('node'), edges) as Activity[];
      })
    );
  }

  fetchMore(after: string) {
    this.activityService.activitiesFetchMore(this.activitiesQuery, after);
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

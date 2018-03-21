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
import { Apollo } from 'apollo-angular';
import { ActivitiesQuery } from './activity.graphql';

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
    private router: Router,
    private toastService: ToastrService,
    private dialogUtil: DialogUtilService,
    private apollo: Apollo
  ) { }

  ngOnInit() {
    this.activities$ = this.apollo.watchQuery<{ activities: Activity[] }>({
      query: ActivitiesQuery
    }).valueChanges
      .pipe(map(e => e.data.activities));
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
        this.toastService.success(TOAST.SUCCESS.BASE);
      })
    ).subscribe();
  }

  share() {

  }
}

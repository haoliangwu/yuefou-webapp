import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Activity } from '../../model';
import { Observable } from 'rxjs/Observable';
import { ActivityService } from '../services/activity.service';


@Injectable()
export class ActivityResolver implements Resolve<Activity> {

  constructor(
    private activityService: ActivityService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Activity | Observable<Activity> | Promise<Activity> {
    return this.activityService.activity(route.params.id);
  }

}

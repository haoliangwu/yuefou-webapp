import { Pipe, PipeTransform } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';
import { Activity, User } from '../../../model';
import { LOCALSTORAGE } from '../../../constants';
import * as R from 'ramda';

export enum ActivityPermission {
  UPDATE = 'update',
  CREATE = 'create',
  DELETE = 'delete',
  VIEW = 'view',
  SHARE = 'share',
  QUIT = 'quit'
}
const propCreator = R.prop('creator');
const propParticipants = R.prop('participants');

@Pipe({
  name: 'activityPermission'
})
export class ActivityPermissionPipe implements PipeTransform {

  @LocalStorage(LOCALSTORAGE.USER) user: User;

  transform(activity: Activity, permission: ActivityPermission): any {
    switch (permission) {
      case ActivityPermission.DELETE:
      case ActivityPermission.UPDATE:
        // 只有创建人
        const isCreator = R.compose(R.propEq('id', this.user.id), propCreator);

        return isCreator(activity);
      case ActivityPermission.QUIT:
        // 只有参与人
        const toParticipantIds = R.map<User, string>(R.prop('id'));
        const isParticipant = R.compose(R.contains<string>(this.user.id), toParticipantIds, propParticipants);

        return isParticipant(activity);
      case ActivityPermission.CREATE:
      case ActivityPermission.VIEW:
      case ActivityPermission.SHARE:
        // 任何人
        return true;
      default:
        return false;
    }
  }

}

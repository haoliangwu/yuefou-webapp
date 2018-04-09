import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BaseUpdatedComponent } from '../../utils/base-updated-component';
import { tap, map, switchMap } from 'rxjs/operators';
import { DialogUtilService } from '../modules/dialog/dialog.service';
import { of } from 'rxjs/observable/of';

@Injectable()
export class UpdatedStatusGuard implements CanDeactivate<BaseUpdatedComponent> {
  constructor(
    private dialogUtil: DialogUtilService
  ) { }

  canDeactivate(component: BaseUpdatedComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return component.updated$.pipe(
      switchMap(updated => {
        if (updated) {
          const dialogRef = this.dialogUtil.confirm({
            data: {
              message: '当前页面未保存，确定要离开吗？',
            }
          });

          return dialogRef.afterClosed().pipe(
            map(e => !!e)
          );
        } else {
          return of(true);
        }
      })
    );
  }
}

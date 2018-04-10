import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BaseUpdatedComponent } from '../../utils/base-updated-component';
import { tap, map, switchMap, last, debounceTime, withLatestFrom } from 'rxjs/operators';
import { DialogUtilService } from '../modules/dialog/dialog.service';
import { of } from 'rxjs/observable/of';

@Injectable()
export class UpdatedStatusGuard implements CanDeactivate<BaseUpdatedComponent> {
  constructor(
    private dialogUtil: DialogUtilService
  ) { }

  canDeactivate(component: BaseUpdatedComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return component.updated$.pipe(
      withLatestFrom(component.finished$),
      switchMap(([updated, finished]) => {
        if (updated && !finished) {
          const dialogRef = this.dialogUtil.confirm({
            data: {
              title: '确定要离开吗？',
              message: '当前表单信息未保存。',
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

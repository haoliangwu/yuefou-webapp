import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile.component';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';
import { LOCALSTORAGE, TOAST } from '../../constants';
import { DialogUtilService } from '../../shared/modules/dialog/dialog.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {
  items = [
    { text: '动态', icon: 'face', link: 'dashboard' },
    { text: '活动', icon: 'schedule', link: 'activity' },
    { text: '任务', icon: 'event_note', link: 'task' },
    { text: '菜谱', icon: 'restaurant_menu', link: 'recipe' }
  ];

  constructor(
    private router: Router,
    private storage: LocalStorageService,
    private toastService: ToastrService,
    private profileComp: ProfileComponent,
    private dialogUtil: DialogUtilService
  ) { }

  ngOnInit() {
  }

  close() {
    this.profileComp.sidenav.close();
  }

  quit() {
    const dialogRef = this.dialogUtil.confirm({
      data: {
        message: '确定要退出吗？'
      }
    });

    dialogRef.afterClosed()
      .filter(e => !!e)
      .subscribe(e => {
        this.router.navigate(['/login']).then(() => {
          this.storage.clear(LOCALSTORAGE.API_TOKEN);
          this.storage.clear(LOCALSTORAGE.REMEMBER_ME);
          this.storage.clear(LOCALSTORAGE.USER);

          this.toastService.success(TOAST.SUCCESS.LOGOUT);
        });
      });
  }
}

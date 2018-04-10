import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import { ProfileComponent } from '../../../profile/profile.component';
import { DialogUtilService } from '../../modules/dialog/dialog.service';
import { LOCALSTORAGE } from '../../../constants';

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
    private route: ActivatedRoute,
    private storage: LocalStorageService,
    private toastService: ToastrService,
    private profileComp: ProfileComponent,
    private dialogUtil: DialogUtilService,
    private translate: TranslateService,
    private apollo: Apollo
  ) { }

  ngOnInit() {
  }

  close() {
    this.profileComp.sidenav.close();
  }

  quit() {
    const dialogRef = this.dialogUtil.confirm({
      data: {
        title: '确定要退出吗？'
      }
    });

    dialogRef.afterClosed()
      .filter(e => !!e)
      .subscribe(e => {
        const client = this.apollo.getClient();

        // 退出时需要重置 cache
        client.cache.reset();

        this.router.navigate(['/login']).then(() => {
          this.storage.clear(LOCALSTORAGE.API_TOKEN);
          this.storage.clear(LOCALSTORAGE.REMEMBER_ME);
          this.storage.clear(LOCALSTORAGE.USER);

          this.toastService.success(this.translate.instant('TOAST.SUCCESS.LOGOUT'));
        });
      });
  }

  redirect(url: string) {
    this.router.navigate([url], { relativeTo: this.route });
  }
}

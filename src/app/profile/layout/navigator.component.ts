import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from '../profile.component';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';
import { LOCALSTORAGE, TOAST } from '../../constants';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {
  items = [
    { text: '活动', icon: 'schedule', link: 'activity' },
    { text: '任务', icon: 'event_note', link: 'task' },
    { text: '菜谱', icon: 'library_books', link: 'recipe' }
  ];

  constructor(
    private router: Router,
    private storage: LocalStorageService,
    private toastService: ToastrService,
    private profileComp: ProfileComponent
  ) { }

  ngOnInit() {
  }

  close() {
    this.profileComp.sidenav.close();
  }

  quit() {
    // TODO 增加一个 confirm dialog
    this.router.navigate(['/login']).then(() => {
      this.storage.clear(LOCALSTORAGE.API_TOKEN);
      this.storage.clear(LOCALSTORAGE.REMEMBER_ME);

      this.toastService.success(TOAST.SUCCESS.LOGOUT);
    });
  }
}

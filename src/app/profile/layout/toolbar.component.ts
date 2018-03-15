import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';
import { LOCALSTORAGE, TOAST } from '../../constants';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private router: Router,
    private storage: LocalStorageService,
    private toastService: ToastrService
  ) { }

  ngOnInit() {
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

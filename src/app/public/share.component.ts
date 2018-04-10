import { Component, OnInit } from '@angular/core';
import { RouterUtilService } from '../shared/services';
import { slideLeftTransition } from '../animations/router-transition';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
  animations: [slideLeftTransition]
})
export class ShareComponent implements OnInit {

  constructor(
    private routerUtil: RouterUtilService
  ) { }

  ngOnInit() {
  }

  animationStart(event) {
    this.routerUtil.routerAnimation$.next(false);
  }

  animationDone(event) {
    this.routerUtil.routerAnimation$.next(true);
  }
}

import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RouterUtilService } from '../../../shared/services';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-fixed-toggle',
  templateUrl: './fixed-toggle.component.html',
  styleUrls: ['./fixed-toggle.component.scss']
})
export class FixedToggleComponent implements OnInit {
  @Output() clickRequest = new EventEmitter();

  constructor(
    public routerUtil: RouterUtilService
  ) { }

  ngOnInit() {
  }

  click() {
    this.clickRequest.next();
  }

}

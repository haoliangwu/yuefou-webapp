import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-fixed-toggle',
  templateUrl: './fixed-toggle.component.html',
  styleUrls: ['./fixed-toggle.component.scss']
})
export class FixedToggleComponent implements OnInit {
  @Output() clickRequest = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  click() {
    this.clickRequest.next();
  }

}

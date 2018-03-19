import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {
  @Input() activity;

  constructor() { }

  ngOnInit() {
  }

}

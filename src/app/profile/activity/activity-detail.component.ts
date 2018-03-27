import { Component, OnInit, Input } from '@angular/core';
import { TaskOperationService } from '../task/task-operation.service';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {
  @Input() activity;

  constructor(
    public taskOperationService: TaskOperationService
  ) { }

  ngOnInit() {
  }

}

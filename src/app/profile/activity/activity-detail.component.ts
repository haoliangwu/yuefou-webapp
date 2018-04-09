import { Component, OnInit, Input } from '@angular/core';
import { TaskOperationService } from '../task/task-operation.service';
import { Activity } from '../../model';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {
  @Input() activity: Activity;

  constructor(
    public taskOperationService: TaskOperationService
  ) { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../model';

@Component({
  selector: 'app-task-brief-detail',
  templateUrl: './task-brief-detail.component.html',
  styleUrls: ['./task-brief-detail.component.scss']
})
export class TaskBriefDetailComponent implements OnInit {
  @Input() task: Task;

  constructor() { }

  ngOnInit() {
  }

}

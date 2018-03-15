import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}

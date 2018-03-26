import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html',
  styleUrls: ['./load-more.component.scss']
})
export class LoadMoreComponent implements OnInit {
  @Output() loadMoreRequest = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}

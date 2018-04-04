import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UpdateOperation, UpdateOperationPayload } from '../../../model';

@Component({
  selector: 'app-update-page-toolbar',
  templateUrl: './update-page-toolbar.component.html',
  styleUrls: ['./update-page-toolbar.component.scss']
})
export class UpdatePageToolbarComponent implements OnInit {
  @Input() data: any;
  @Input() titleText: string;
  @Input() updated = false;
  @Input() isDetail = false;

  @Output() actionReqest = new EventEmitter<UpdateOperationPayload>();

  actions = UpdateOperation;

  constructor() { }

  ngOnInit() {
  }

  doAction(action: UpdateOperation) {
    this.actionReqest.next({
      operation: action,
      data: this.data
    });
  }
}

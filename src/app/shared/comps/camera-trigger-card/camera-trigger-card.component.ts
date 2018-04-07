import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { FileReaderService } from '../../services';

@Component({
  selector: 'app-camera-trigger-card',
  templateUrl: './camera-trigger-card.component.html',
  styleUrls: ['./camera-trigger-card.component.scss']
})
export class CameraTriggerCardComponent implements OnInit, OnDestroy {
  @Input() url: string;
  @Output() changeRequest = new EventEmitter<File>();

  constructor(
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  selectFile(files: FileList) {
    this.changeRequest.next(files[0]);
  }
}

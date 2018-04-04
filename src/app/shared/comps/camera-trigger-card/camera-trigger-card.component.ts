import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { FileReaderService } from '../../services';

@Component({
  selector: 'app-camera-trigger-card',
  templateUrl: './camera-trigger-card.component.html',
  styleUrls: ['./camera-trigger-card.component.scss']
})
export class CameraTriggerCardComponent implements OnInit, OnDestroy {
  @Input() url: string;
  @Output() changeRequest = new EventEmitter<string>();

  constructor(
    public fileReader: FileReaderService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.fileReader.revokeObjectURL();
  }

  selectFile(files: FileList) {
    const url = this.fileReader.createObjectURL(files[0]);

    this.changeRequest.next(url);
  }
}

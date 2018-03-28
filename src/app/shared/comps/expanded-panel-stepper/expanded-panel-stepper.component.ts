import { Component, OnInit, forwardRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-expanded-panel-stepper',
  templateUrl: './expanded-panel-stepper.component.html',
  styleUrls: ['./expanded-panel-stepper.component.scss']
})
export class ExpandedPanelStepperComponent {
  @Input() isHead = false;
  @Input() isTail = false;

  @Input() step = 0;
  @Output() stepChange = new EventEmitter<number>();


  inc() {
    this.step++;
    this.stepChange.next(this.step);
  }

  dec() {
    this.step--;
    this.stepChange.next(this.step);
  }
}

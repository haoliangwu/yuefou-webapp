import { Component, OnInit, Input, OnDestroy, ElementRef, HostBinding, ChangeDetectionStrategy, Optional, Self } from '@angular/core';
import { MatFormFieldControl, MatFormField, MatSliderChange } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { NgControl, FormControl, FormBuilder, ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subscription } from 'apollo-client/util/Observable';

@Component({
  selector: 'app-mat-slider',
  templateUrl: './mat-slider.component.html',
  styleUrls: ['./mat-slider.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: CustomMatSliderComponent }]
})
export class CustomMatSliderComponent implements OnInit, OnDestroy, MatFormFieldControl<number>, ControlValueAccessor {
  static count = 0;

  sub: Subscription;

  control: FormControl = this.fb.control('');

  @Input()
  get value(): number {
    return this.control.value || 0;
  }
  set value(val: number) {
    this.propagateChange(val);
    this.stateChanges.next();
  }

  stateChanges = new Subject<void>();
  id = `custom-mat-slider-${CustomMatSliderComponent.count++}`;

  private _placeholder: string;

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  focused = false;

  get empty(): boolean {
    return !this.control.value;
  }

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  shouldPlaceholderFloat?: boolean;

  private _required = false;

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  private _disabled = false;

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(dis) {
    this._disabled = coerceBooleanProperty(dis);
    this.stateChanges.next();
  }

  errorState = false;

  controlType = 'custom-mat-slider';

  @HostBinding('attr.aria-describedby') describedBy = '';

  private propagateChange = (_: any) => { };

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent): void { }

  change(event: MatSliderChange) {
    this.control.setValue(event.value);
  }

  writeValue(value: number) {
    this.control.setValue(value);
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) { }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  constructor(
    private fb: FormBuilder,
    private fm: FocusMonitor,
    private elRef: ElementRef,
    private matFormField: MatFormField,
    @Optional() @Self() public ngControl: NgControl
  ) {
    // Setting the value accessor directly (instead of using
    // the providers) to avoid running into a circular import.
    if (this.ngControl != null) { this.ngControl.valueAccessor = this; }
  }

  ngOnInit() {
    this.fm.monitor(this.elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });

    this.sub = this.control.valueChanges.subscribe(value => this.value = value);
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }
}

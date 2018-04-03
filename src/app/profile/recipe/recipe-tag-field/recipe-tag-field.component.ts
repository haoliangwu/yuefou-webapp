import { Component, OnInit, Input, EventEmitter, Output, ViewChild, AfterViewInit, ComponentRef, ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Tag } from '../../../model';
import { MatChipInputEvent, MatAutocompleteSelectedEvent, MatChipList, MatAutocomplete, MatChipInput } from '@angular/material';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';
import { merge } from 'rxjs/observable/merge';
import { debounceTime, map, filter, tap, startWith } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-recipe-tag-field',
  templateUrl: './recipe-tag-field.component.html',
  styleUrls: ['./recipe-tag-field.component.scss']
})
export class RecipeTagFieldComponent implements OnInit, AfterViewInit, OnDestroy {
  $input: HTMLInputElement;
  sub: Subscription;
  filteredOptions: Observable<string[]>;

  @Input() options = ['a', 'b', 'c'];
  @Input() tags: FormArray;

  @Input() removable = true;
  @Input() selectable = true;
  @Input() addOnBlur = true;

  @Output() addRequst = new EventEmitter<string>();
  @Output() deleteRequest = new EventEmitter<number>();

  @ViewChild('chipInput', { read: MatChipInput }) chipInput: MatChipInput;
  @ViewChild('chipInput') chipInputRef: ElementRef;
  @ViewChild('auto') autoComp: MatAutocomplete;

  separatorKeysCodes = [ENTER, COMMA];

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.$input = this.chipInputRef.nativeElement;

    this.filteredOptions = fromEvent(this.$input, 'keyup')
      .pipe(
        map((e: Event) => (e.target as HTMLInputElement).value),
        startWith(''),
        map(val => this.filter(val))
      );

    this.cdr.detectChanges();

    const chipEnd$ = this.chipInput.chipEnd.pipe(
      map((e: MatChipInputEvent) => e.value || ''),
      filter(value => !!value)
    );

    const autoSelect$ = this.autoComp.optionSelected.pipe(
      map((e: MatAutocompleteSelectedEvent) => e.option.value)
    );

    this.sub = merge(chipEnd$, autoSelect$).pipe(
      debounceTime(100),
      tap(() => this.$input.value = '')
    ).subscribe((tagName: string) => {
      this.add(tagName);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private add(tagName: string): void {
    if (tagName.trim()) {
      this.addRequst.next(tagName);
    }
  }

  private remove(tag: FormControl): void {
    const idx = this.tags.controls.indexOf(tag);

    if (idx >= 0) {
      this.deleteRequest.next(idx);
    }
  }

  private filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
}

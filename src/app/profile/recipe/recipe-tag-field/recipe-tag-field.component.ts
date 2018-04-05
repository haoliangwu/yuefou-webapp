import { Component, OnInit, Input, EventEmitter, Output, ViewChild, AfterViewInit, ComponentRef, ElementRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Tag, RecipeTag } from '../../../model';
import { MatChipInputEvent, MatAutocompleteSelectedEvent, MatChipList, MatAutocomplete, MatChipInput } from '@angular/material';
import { FormBuilder, FormArray, FormControl, FormArrayName } from '@angular/forms';
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
  filteredOptions: Observable<RecipeTag[]>;

  @Input() options: RecipeTag[];
  @Input() tags: FormArray;

  @Input() removable = true;
  @Input() selectable = true;
  @Input() addOnBlur = true;

  @ViewChild('chipInput', { read: MatChipInput }) chipInput: MatChipInput;
  @ViewChild('chipInput') chipInputRef: ElementRef;
  @ViewChild('auto') autoComp: MatAutocomplete;

  separatorKeysCodes = [ENTER, COMMA];

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private formArrayName: FormArrayName
  ) { }

  ngOnInit() {
    this.tags = this.formArrayName.control;
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
    ).subscribe((tagName: string | RecipeTag) => {
      this.add(tagName);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private add(tagName: string | RecipeTag): void {
    if (typeof tagName === 'string' && tagName.trim()) {
      this.tags.push(new FormControl({ name: tagName }));
    } else {
      this.tags.push(new FormControl(tagName));
    }
  }

  private remove(tag: FormControl): void {
    const idx = this.tags.controls.indexOf(tag);

    if (idx >= 0) {
      this.tags.removeAt(idx);
    }
  }

  private filter(val: string): RecipeTag[] {
    return this.options.filter(option =>
      option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
}

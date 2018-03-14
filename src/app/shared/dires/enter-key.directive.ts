import { Directive, Host, ElementRef, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { filter, tap } from 'rxjs/operators';

@Directive({
  selector: '[appEnterKey], [enterKey]',
})
export class EnterKeyDirective implements OnInit, OnDestroy {

  subscription: Subscription;
  @Output() enterKey: EventEmitter<any> = new EventEmitter();

  constructor(
    @Host() private el: ElementRef
  ) { }

  ngOnInit() {
    this.subscription = fromEvent<KeyboardEvent>(this.el.nativeElement, 'keyup')
      .pipe(
        filter(e => e.keyCode === 13),
        tap(() => this.enterKey.next())
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

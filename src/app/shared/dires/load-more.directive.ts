import { Directive, Host, ElementRef, Output, EventEmitter, OnInit, AfterContentInit, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime, filter, tap } from 'rxjs/operators';

@Directive({
  selector: '[appLoadMore], [loadMore]',
  exportAs: 'loadMore'
})
export class LoadMoreDirective implements AfterContentInit, OnDestroy {
  subscription: Subscription;
  @Output() loadMore = new EventEmitter<Event>(true);

  private $div = this.renderer.createElement('div');

  constructor(
    @Host() private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngAfterContentInit() {
    this.renderer.addClass(this.$div, '__loadMore__marker__');
    this.renderer.setStyle(this.$div, 'width', '1px');

    this.appendMarker();

    const scroll$ = fromEvent<Event>(this.el.nativeElement, 'scroll');

    this.subscription = scroll$.pipe(
      debounceTime(350),
      filter(() => this.isAnyPartOfElementInViewport()),
      tap(e => this.loadMore.emit(e))
    ).subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  update() {
    this.appendMarker();
  }

  private appendMarker() {
    this.renderer.removeChild(this.el.nativeElement, this.$div);
    this.renderer.appendChild(this.el.nativeElement, this.$div);
  }

  private isAnyPartOfElementInViewport(el: HTMLElement = this.$div): boolean {

    const rect = el.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

    // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

    return (vertInView && horInView);
  }
}

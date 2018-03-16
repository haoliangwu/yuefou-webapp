import { Directive, Host, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFull], [full]',
})
export class FullDirective implements OnInit {
  constructor(
    @Host() private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
    this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
  }
}

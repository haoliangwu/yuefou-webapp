import { Directive, Host, ElementRef, OnInit, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appFull], [full]',
})
export class FullDirective implements OnInit {
  @Input() full: string;

  constructor(
    @Host() private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {

    switch (this.full) {
      case 'width':
        this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
        break;
      case 'height':
        this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
        break;
      default:
        this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
        this.renderer.setStyle(this.el.nativeElement, 'height', '100%');
        break;
    }
  }
}

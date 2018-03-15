import { trigger, animate, style, group, animateChild, query, stagger, transition } from '@angular/animations';

export const opacityTransition = trigger('opacityTransition', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('1s ease-in-out', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('1s ease-in-out', style({ opacity: 0 }))
  ])
]);

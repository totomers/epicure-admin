import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const slideInAnimation = [
  trigger('slideIn', [
    // ...
    state(
      'false',
      style({
        opacity: 0,
        marginLeft: '-500px',
      })
    ),
    state(
      'true',
      style({
        opacity: 1,
        marginLeft: '0',
      })
    ),
    transition('false => true', [animate('0.3s ease-out')]),
    transition('true => false', [animate('0.5s')]),
  ]),
];

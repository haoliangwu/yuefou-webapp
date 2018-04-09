import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class BaseUpdatedComponent {
  updated$: Observable<boolean> = new BehaviorSubject<boolean>(false);
}

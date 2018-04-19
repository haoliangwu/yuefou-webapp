import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ConfigService {

  constructor(
    apollo: Apollo
  ) { }
}

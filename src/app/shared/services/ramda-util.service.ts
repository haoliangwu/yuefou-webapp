import * as R from 'ramda';

import { Injectable } from '@angular/core';

@Injectable()
export class RamdaUtilService {

  isNilOrEmpty = R.either(R.isNil, R.isEmpty);

}

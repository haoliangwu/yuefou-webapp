import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class LocationUtilService {

  constructor(
  ) { }

  /*
   is development env
   */
  isInternalHost(host = window.location.hostname) {
    const internalAddrs = ['192.168.1.139', 'localhost', '127.0.0.1', '0.0.0.0', 'yuefou_dev.littlelyon.com'];
    for (const i in internalAddrs) {
      if (internalAddrs[i].match(host)) {
        return true;
      }
    }
    return false;
  }
}

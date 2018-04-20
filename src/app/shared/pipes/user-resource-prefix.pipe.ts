import { Pipe, PipeTransform } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';
import { User } from '../../model';
import { LOCALSTORAGE } from '../../constants';
import { CosSdkService } from '../services';

@Pipe({
  name: 'userResourcePrefix'
})
export class UserResourcePrefixPipe implements PipeTransform {

  basePath: string;
  @LocalStorage(LOCALSTORAGE.USER) user: User;

  constructor(
    private cosService: CosSdkService
  ) {
    this.basePath = `//${cosService.bucket}.cos.${cosService.region}.myqcloud.com/${this.user.id}`;
  }

  transform(uri: string): string {
    if (!uri) {
      return null;
    }

    // 如果是 本地资源 则返回
    if (uri.indexOf('assets/images') === 0) {
      return uri;
    }

    // 如果包含 http 或 https 则直接返回原 uri
    if (uri.indexOf('http://') > -1 || uri.indexOf('https://') > -1) {
      return uri;
    }

    return `${this.basePath}/${uri}`;
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { LocationUtilService } from '../services';
import { APP_HOST } from '../../constants';

@Pipe({
  name: 'recipeFilePrefix'
})
export class RecipeFilePrefixPipe implements PipeTransform {

  basePath = `tmp/shared/recipe`;
  defaultPicture = `assets/images/default_recipe_picture.png`;

  constructor(
    private locationUtil: LocationUtilService
  ) { }

  transform(uri: string): any {
    // 如果是 nil 则返回默认图片
    if (!uri) {
      return this.defaultPicture;
    }

    // 如果包含 http 或 https 则直接返回原 uri
    if (uri.indexOf('http://') > -1 || uri.indexOf('https://') > -1) {
      return uri;
    }

    // 如果为相对 uri 则按运行环境补全根目录
    if (this.locationUtil.isInternalHost()) {
      // 如果是开发环境则指向服务器 ip 域名
      return `${location.protocol}//${APP_HOST}/${this.basePath}/${uri}`;
    } else {
      // 如果是生产环境则仅补全根目录，域名让浏览器自动解析
      return `${this.basePath}/${uri}`;
    }
  }

}

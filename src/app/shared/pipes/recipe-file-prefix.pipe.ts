import { Pipe, PipeTransform } from '@angular/core';
import { LocationUtilService } from '../services';
import { APP_HOST } from '../../constants';

@Pipe({
  name: 'recipeFilePrefix'
})
export class RecipeFilePrefixPipe implements PipeTransform {

  basePath = `//test-1256165069.cos.ap-beijing.myqcloud.com/shared/recipes`;
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

    return `${this.basePath}/${uri}`;
  }

}

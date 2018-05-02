import { Pipe, PipeTransform, Inject } from '@angular/core';
import { LocationUtilService, CosSdkService } from '../services';

@Pipe({
  name: 'recipeFilePrefix'
})
export class RecipeFilePrefixPipe implements PipeTransform {

  basePath: string;
  defaultPicture = `assets/images/default_recipe_picture.png`;

  constructor(
    private locationUtil: LocationUtilService,
    private cosService: CosSdkService
  ) {
    this.basePath = `//${cosService.bucket}.cos.${cosService.region}.myqcloud.com/shared/recipes`;
  }

  transform(uri: string): string {
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

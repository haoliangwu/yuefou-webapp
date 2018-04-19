import { Pipe, PipeTransform, Inject } from '@angular/core';
import { LocationUtilService } from '../services';
import { APP_HOST } from '../../constants';
import { CosConfig, CosConfigToken } from '../../model/inject';

@Pipe({
  name: 'recipeFilePrefix'
})
export class RecipeFilePrefixPipe implements PipeTransform {

  basePath: string;
  defaultPicture = `assets/images/default_recipe_picture.png`;

  constructor(
    private locationUtil: LocationUtilService,
    @Inject(CosConfigToken) private cosConfig: CosConfig
  ) {
    this.basePath = `//${cosConfig.bucket}.cos.${cosConfig.region}.myqcloud.com/shared/recipes`;
  }

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

import { InjectionToken, FactoryProvider, ValueProvider, APP_INITIALIZER } from '@angular/core';
import { ConfigService, CosSdkService } from '../shared/services';

export interface CosConfig {
  bucket: string;
  region: string;
}

export interface AppEnvConfig {
  cos: CosConfig;
}

// export const CosConfigToken = new InjectionToken<CosConfig>('yuefou.cos.token');

export const CosConfigProvider: FactoryProvider = {
  provide: APP_INITIALIZER,
  multi: true,
  useFactory: function (cosService: CosSdkService) {
    return () => cosService.initCosConfig();
  },
  deps: [CosSdkService]
};

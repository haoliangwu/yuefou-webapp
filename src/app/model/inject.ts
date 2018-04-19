import { InjectionToken, FactoryProvider, ValueProvider } from '@angular/core';
import { ConfigService } from '../shared/services';

export interface CosConfig {
  bucket: string;
  region: string;
}

export const CosConfigToken = new InjectionToken<CosConfig>('yuefou.cos.token');

export const CosConfigProvider: ValueProvider = {
  provide: CosConfigToken,
  useValue: {
    bucket: 'test-1256165069',
    region: 'ap-beijing',
  }
};

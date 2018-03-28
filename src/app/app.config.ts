import { InjectionToken, ValueProvider } from '@angular/core';
import { AppConfig, DataIdFromObjectResolver } from './model';

export const AppConfigToken = new InjectionToken<AppConfig>('yuefou.app.config');

export const DEFAULT_APP_CONFIG: AppConfig = {
  language: {
    available: ['zh', 'en'],
    default: 'zh'
  },
  pagination: {
    first: 15
  }
};

export const AppConfigProvider: ValueProvider = {
  useValue: DEFAULT_APP_CONFIG,
  provide: AppConfigToken
};

export const DataIdFromObjectToken = new InjectionToken<DataIdFromObjectResolver>('apollo.dataIdFromObject');

export const dataIdFromObject: DataIdFromObjectResolver = o => {
  if (o.__typename != null && o.id != null) {
    return `${o.__typename}-${o.id}`;
  }
};

export const DataIdFromObjectProvider: ValueProvider = {
  useValue: dataIdFromObject,
  provide: DataIdFromObjectToken
};

import { InjectionToken } from '@angular/core';
import { AppConfig } from './model';

export const AppConfigToken = new InjectionToken('yuefou.app.config');

export const DEFAULT_APP_CONFIG: AppConfig = {
  language: {
    available: ['zh', 'en'],
    default: 'zh'
  },
  pagination: {
    first: 10
  }
};

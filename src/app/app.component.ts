import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from './model';
import { AppConfigToken } from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    @Inject(AppConfigToken) private appConfig: AppConfig
  ) { }

  ngOnInit() {
    this.translate.setDefaultLang(this.appConfig.language.default);
    this.translate.addLangs(this.appConfig.language.available);

    const applicationLanguage = this.getAppLanguage();
    this.translate.use(applicationLanguage).subscribe();
  }

  getAppLanguage(): string {
    const defaultLanguage = this.translate.getDefaultLang();
    const clientLanguage = this.translate.getBrowserLang();
    const isClientLanguageAvailable = this.checkLanguageAvailability(clientLanguage);

    return isClientLanguageAvailable ? clientLanguage : defaultLanguage;
  }

  private checkLanguageAvailability(language: string): boolean {
    return this.translate.getLangs().includes(language);
  }
}

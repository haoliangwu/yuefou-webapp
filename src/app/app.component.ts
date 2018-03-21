import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGE } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.translate.setDefaultLang(LANGUAGE.DEFAULT);
    this.translate.addLangs(LANGUAGE.AVAILABLE);

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

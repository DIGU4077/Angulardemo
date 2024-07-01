// language.service.ts
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageChangeSubject = new Subject<string>();

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'mar','ka']); // Add all supported languages
    this.translate.setDefaultLang('en');    // Set default language
  }

  switchLanguage(language: string) {
    this.translate.use(language);  // Switch language
    this.languageChangeSubject.next(language); // Notify subscribers of language change
  }

  getCurrentLanguage() {
    return this.translate.currentLang;  // Get current language
  }

  getLanguageChangeObservable() {
    return this.languageChangeSubject.asObservable(); // Observable to listen for language changes
  }
}

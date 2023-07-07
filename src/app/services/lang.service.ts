import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LangService {
  
  saveCurrentLang(lang: string) {
    localStorage.setItem('lang', lang);
  }

  getCurrentLang(): string | null {
    return localStorage.getItem('lang');
  }
}

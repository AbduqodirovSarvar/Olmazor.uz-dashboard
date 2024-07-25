import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private languageKey: string = "language_code";

  constructor() { }

  setLaguage(language?: string | null)
  {
    localStorage.setItem(this.languageKey, language ?? 'Ru');
  }

  getLanguageCode(): string {
    return localStorage.getItem(this.languageKey) ?? "Ru";
  }
}

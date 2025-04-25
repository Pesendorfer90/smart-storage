import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  darkMode: boolean = true;
  userDarkMode: boolean = true;
  themeMode: string = 'light_mode';
  private readonly document = inject(DOCUMENT)

  constructor() {
    this.userDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  toggleDarkLightMode() {
    if (this.darkMode) {
      this.document.documentElement.classList.add('light-mode');
      this.darkMode = false;
      this.themeMode = 'dark_mode';
      
    } else {
      this.document.documentElement.classList.remove('light-mode');
      this.darkMode = true;
      this.themeMode = 'light_mode';
    }
  }

  setModeToUserSettings() {
    if (this.userDarkMode) {
      this.document.documentElement.classList.remove('light-mode');
      this.darkMode = true;
      this.themeMode = 'light_mode';
    } else {
      this.document.documentElement.classList.add('light-mode');
      this.darkMode = false;
      this.themeMode = 'dark_mode';
    }
  }
}

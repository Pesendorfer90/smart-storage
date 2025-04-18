import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  activeLink: any = '';

  constructor(private router: Router) {
    this.getAktiveLink();
  }

  getAktiveLink() {
    this.router.events.subscribe(() => {
      const segments = this.router.url.split('/').filter(Boolean);
      const rawSegment = segments[0] || '';
      this.activeLink = rawSegment.charAt(0).toUpperCase() + rawSegment.slice(1);
    });
  }

  onMenuClick() {
    this.toggleSidenav.emit();
  }
}

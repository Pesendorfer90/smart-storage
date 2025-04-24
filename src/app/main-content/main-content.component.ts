import { Component, HostListener, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from "./sidenav/sidenav.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-content',
  imports: [MatSidenavModule, MatButtonModule, SidenavComponent, TopBarComponent, RouterOutlet],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent {
  @ViewChild(SidenavComponent) sidenav!: SidenavComponent;

  constructor() { }

  handleToggleSidenav() {
    this.sidenav.toggleDrawer();
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('app-sidenav, app-top-bar')) {
      console.log("click outside sidebar");
      this.sidenav.closeDrawer();
    }
  }
}

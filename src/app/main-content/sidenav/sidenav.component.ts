import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [RouterModule, MatSidenavModule, MatButtonModule, MatListModule, MatIconModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  showFiller = false;
  @ViewChild('drawer') drawer!: MatDrawer;

  menuListTop: any = [
    { name: "Home", url: "/home", icon: "home" },
    { name: "Rooms", url: "/rooms", icon: "meeting_room" },
    { name: "Lables", url: "/lables", icon: "bookmark" },
  ]

  menuListBottom: any = [
    { name: "Settings", url: "/settings", icon: "settings" },
  ]

  toggleDrawer() {
    this.drawer.toggle();
  }
}

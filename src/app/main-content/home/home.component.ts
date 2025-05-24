import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AddItemComponent } from './add-item/add-item.component';
import { FirestoreService } from '../../service/firestore.service';
import { Room } from '../../models/room';
import { Labels } from '../../models/labels';
import { SearchService } from '../../service/search.service';
import { Inventory } from '../../models/inventory';
import { EditItemComponent } from './edit-item/edit-item.component';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatBadgeModule,
    MatDividerModule,
    MatTooltipModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // items: Inventory[] = [
  //   {
  //     name: "Hammer",
  //     photoURL: "img/hammer.jpg",
  //     labels: ["Werkzeug"],
  //     description: "Universal einsetztbar, 250g",
  //     storage: {
  //       room: "Gartenhütte",
  //       furniture: "Regal links",
  //       space: "Fach oben",
  //       position: "links hinten",
  //     }
  //   },
  //   {
  //     name: "Bier",
  //     photoURL: "img/punti.jpg",
  //     labels: ["Food", "Drink", "Food", "Drink", "Food", "Drink", "Food", "Drink",],
  //     description: "Lecker Bierchen",
  //     storage: {
  //       room: "Vorratskammer",
  //       furniture: "Regal 1",
  //       space: "Boden",
  //       position: "links",
  //     }
  //   },
  //   {
  //     name: "Altes Werkzeug",
  //     photoURL: "img/altes-werkzeug.jpg",
  //     labels: ["Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug"],
  //     description: "Zum aussortieren, entsorgung jeden Freitag am Bauhof zwischen 10 und 13 UhrZum aussortieren, entsorgung jeden Freitag am Bauhof zwischen 10 und 13 UhrZum aussortieren, entsorgung jeden Freitag am Bauhof zwischen 10 und 13 Uhr",
  //     storage: {
  //       room: "Keller",
  //       furniture: "Regal 5",
  //       space: "Fach 4",
  //       position: "ganzes Fach",
  //     }
  //   },
  //   {
  //     name: "Holzschraube 3,5x16",
  //     photoURL: "img/schraube-3,5x16.jpg",
  //     labels: ["Werkzeug"],
  //     description: "Kreuz Z2, verzinkt, 300Stk.",
  //     storage: {
  //       room: "Gartenhütte",
  //       furniture: "Regal mitte",
  //       space: "Fach 2",
  //       position: "mitte",
  //     }
  //   },
  //   {
  //     name: "Holzschraube 3x25",
  //     photoURL: "img/schraube-3,5x16.jpg",
  //     labels: ["Werkzeug"],
  //     description: "Kreuz Z1, verzinkt, 25Stk.",
  //     storage: {
  //       room: "Gartenhütte",
  //       furniture: "Regal mitte",
  //       space: "Fach 2",
  //       position: "mitte",
  //     }
  //   },
  //   {
  //     name: "Rasenmäger",
  //     photoURL: "img/rasenmäher.jpg",
  //     labels: ["Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug",],
  //     description: "Benzin, Einhell",
  //     storage: {
  //       room: "Gartenhütte",
  //       furniture: "Regal mitte",
  //       space: "Boden",
  //       position: "links",
  //     }
  //   },
  //   {
  //     name: "Kompressor",
  //     photoURL: "img/kompressor.jpg",
  //     labels: ["Werkzeug"],
  //     description: "Universal einsetztbar, 250g",
  //     storage: {
  //       room: "Gartenhütte",
  //       furniture: "Regal mitte",
  //       space: "Boden",
  //       position: "rechts",
  //     }
  //   },
  //   {
  //     name: "Sauvignon Blanc",
  //     photoURL: "img/sauvignon-blanc.png",
  //     labels: ["Alkohol", "Drink", "Wein", "2022"],
  //     description: "Weingut Familie Reichardt, Burgenland, Donnerskirchen, Jahrgang 2022",
  //     storage: {
  //       room: "Abstellraum",
  //       furniture: "Regal 3",
  //       space: "Fach 1",
  //       position: "rechts",
  //     }
  //   },
  //   {
  //     name: "Filou",
  //     photoURL: "img/Filou.jpg",
  //     labels: ["Alkohol", "Drink", "Wein", "2022"],
  //     description: "Weingut Familie Reichardt, Burgenland, Donnerskirchen, Jahrgang 2022",
  //     storage: {
  //       room: "Abstellraum",
  //       furniture: "Regal 5",
  //       space: "Fach 4",
  //       position: "ganzes Fach",
  //     }
  //   },
  //   {
  //     name: "Akkuschrauber",
  //     photoURL: "img/einhell-akkuschrauber.jpg",
  //     labels: ["Werkzeug", "Einhell"],
  //     description: "Einhell, Garantie bis 02.2026",
  //     storage: {
  //       room: "Keller",
  //       furniture: "Regal 6",
  //       space: "Fach 2",
  //       position: "rechts",
  //     }
  //   },
  //   {
  //     name: "Werkzeug Akku 4ah",
  //     photoURL: "img/einhell-akku-4ah.jpg",
  //     labels: ["Akku", "Einhell", "Werkzeug"],
  //     description: "6 Stk, Garantie bsi 02.2026",
  //     storage: {
  //       room: "Keller",
  //       furniture: "Regal 6",
  //       space: "Fach 2",
  //       position: "rechts vorne",
  //     }
  //   },
  //   {
  //     name: "Werkzeug Akku 4ah",
  //     photoURL: "img/einhell_akku_2_5_ah.jpg",
  //     labels: ["Akku", "Einhell", "Werkzeug"],
  //     description: "2 Stk, Garantie bsi 02.2026",
  //     storage: {
  //       room: "Keller",
  //       furniture: "Regal 6",
  //       space: "Fach 2",
  //       position: "rechts vorne",
  //     }
  //   },
  //   {
  //     name: "Gewindeschneider und Gewindebohrer",
  //     photoURL: "img/genwindeschneideset.jpg",
  //     labels: ["Werkzeug", "Gewinde", "Gewindebohrer", "Wendeisen"],
  //     description: "Gewindeschneider und Bohrer. Gewindebohrerhalter: M3-M12. Gewindebohrerhalter: M6-M18. M2 x 0,4, M3 x 0,5, M4 x 0,7, M5 x 0,8, M6 x 0,75, M6 x 1, M7 x 0,75, M7 x 1, M8 x 0,75, M8 x 1, M8 x 1,25, M9 x 0,75, M9 x M9 x 1,25, M10 x 0,75, M10 x 1, M10 x 1,25, M10 x 1,5, M11 x 0,75, M11 x 1, M11 x 1,25, M11 x 1,5, M12 x 0,75, M12 x 1, M12 x 1,25, M12 x 1,5, M12 x 1,75, M14 x 1, M14 x 1,25, M14 x 1,5, M14 x 2, M16 x 1, M16 x 1,5, M16 x 2, M18 x 1,5.",
  //     storage: {
  //       room: "Keller",
  //       furniture: "Regal 5",
  //       space: "Fach 1",
  //       position: "mitte",
  //     }
  //   },
  //   {
  //     name: "Stromkabel 3x1.5mm²",
  //     photoURL: "img/stromkabel-3x1.5mm2.png",
  //     labels: ["Strom", "Elektrik", "Kabel"],
  //     description: "20m, Litzenkabel, Feuchtraumgeeignet, H03VV-F",
  //     storage: {
  //       room: "Keller",
  //       furniture: "Regal 2",
  //       space: "Fach 4",
  //       position: "Orangene Kiste",
  //     }
  //   },
  //   {
  //     name: "Stoßstange BMW M",
  //     photoURL: "img/bmw-1er-e87-mpaket-stoßstange.jpg",
  //     labels: ["Auto", "Autoteile", "Karosserie", "BMW", "E87"],
  //     description: "M-Stoßstange vom alten 1er E87er BMW, an der Lippe gebrochen",
  //     storage: {
  //       room: "Dachboden",
  //       furniture: "links",
  //       space: "linke Seite",
  //       position: "hinten",
  //     }
  //   },
  //   {
  //     name: "LG Ultragear Verpackung",
  //     photoURL: "img/lg-verpackung.jpg",
  //     labels: ["Verpackung", "Karton", "LG", "Ultragear"],
  //     description: "5x Originalkarton vom Bildschirm LG UltraGear 27GP850P-B, 27 zoll, Standfuß ist im Karton, nicht wegschmeißen!!",
  //     storage: {
  //       room: "Dachboden",
  //       furniture: "rechts",
  //       space: "linke Seite",
  //       position: "bei den Kartons",
  //     }
  //   },
  // ]

  roomsSnapshot: Room[] = [];
  labelsSnapshot: Labels[] = [];
  value: string = ''

  locationFn: (id: string) => { roomName: string; furnitureName: string; spaceName: string } | null;
  labelFn: (id: string) => { labelName: string; id: string } | null;

  readonly dialog = inject(MatDialog);

  constructor(
    public firestoreService: FirestoreService,
    private searchService: SearchService
  ) {
    this.locationFn = this.searchService.getStorageLocation.bind(this.searchService);
    this.labelFn = this.searchService.getLabelName.bind(this.searchService);
  }

  openAddItem() {
    const isSmallScreen = window.innerWidth <= 599;
    this.dialog.open(AddItemComponent, {
      width: isSmallScreen ? '100vw' : '90%',
      height: isSmallScreen ? '100vh' : undefined,
      maxWidth: isSmallScreen ? '100vw' : '880px',
      panelClass: isSmallScreen ? 'full-screen-dialog' : ''
    });
  }

  openEditItem(item: Inventory) {
    const isSmallScreen = window.innerWidth <= 599;
    this.dialog.open(EditItemComponent, {
      data: item,
      width: isSmallScreen ? '100vw' : '90%',
      height: isSmallScreen ? '100vh' : undefined,
      maxWidth: isSmallScreen ? '100vw' : '600px',
      panelClass: isSmallScreen ? 'full-screen-dialog' : ''
    });
  }
}

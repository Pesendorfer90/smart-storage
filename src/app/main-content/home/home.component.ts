import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Inventory } from '../../models/inventory';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialog } from '@angular/material/dialog';
import { LabelsDialogComponent } from './labels-dialog/labels-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatBadgeModule,
    MatDividerModule,
    MatTooltipModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  items: Inventory[] = [
    {
      name: "Hammer",
      photoURL: "https://media.rs-online.com/F2242251-01.jpg",
      labels: ["Werkzeug"],
      description: "Universal einsetztbar, 250g",
      storage: {
        room: "Abstellraum",
        furniture: "Regal 1",
        space: "Fach 2",
        position: "links hinten",
      }
    },
    {
      name: "Bier",
      photoURL: "https://shop.brantl.at/wp-content/uploads/2024/06/142-4212815.jpg",
      labels: ["Food", "Drink", "Food", "Drink", "Food", "Drink", "Food", "Drink",],
      description: "Lecker Bierchen",
      storage: {
        room: "Abstellraum",
        furniture: "Regal 3",
        space: "Fach 1",
        position: "rechts",
      }
    },
    {
      name: "Altes Werkzeug",
      photoURL: "https://w0.peakpx.com/wallpaper/252/393/HD-wallpaper-tje-mechanic-art-autoparts-brush-geometry-man-saints-shop-story-toolket-trumpet.jpg",
      labels: ["Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug",],
      description: "Zum aussortieren, entsorgung jeden Freitag am Bauhof zwischen 10 und 13 UhrZum aussortieren, entsorgung jeden Freitag am Bauhof zwischen 10 und 13 UhrZum aussortieren, entsorgung jeden Freitag am Bauhof zwischen 10 und 13 Uhr",
      storage: {
        room: "Abstellraum",
        furniture: "Regal 5",
        space: "Fach 4",
        position: "ganzes Fach",
      }
    },
    {
      name: "Hammer",
      photoURL: "https://media.rs-online.com/F2242251-01.jpg",
      labels: ["Werkzeug"],
      description: "Universal einsetztbar, 250g",
      storage: {
        room: "Abstellraum",
        furniture: "Regal 1",
        space: "Fach 2",
        position: "links hinten",
      }
    },
    {
      name: "Bier",
      photoURL: "https://shop.brantl.at/wp-content/uploads/2024/06/142-4212815.jpg",
      labels: ["Food", "Drink", "Food", "Drink", "Food", "Drink", "Food", "Drink",],
      description: "Lecker Bierchen",
      storage: {
        room: "Abstellraum",
        furniture: "Regal 3",
        space: "Fach 1",
        position: "rechts",
      }
    },
    {
      name: "Altes Werkzeug",
      photoURL: "https://w0.peakpx.com/wallpaper/252/393/HD-wallpaper-tje-mechanic-art-autoparts-brush-geometry-man-saints-shop-story-toolket-trumpet.jpg",
      labels: ["Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug",],
      description: "Zum aussortieren, entsorgung jeden Freitag am Bauhof zwischen 10 und 13 UhrZum aussortieren, entsorgung jeden Freitag am Bauhof zwischen 10 und 13 UhrZum aussortieren, entsorgung jeden Freitag am Bauhof zwischen 10 und 13 Uhr",
      storage: {
        room: "Abstellraum",
        furniture: "Regal 5",
        space: "Fach 4",
        position: "ganzes Fach",
      }
    },
    {
      name: "Hammer",
      photoURL: "https://media.rs-online.com/F2242251-01.jpg",
      labels: ["Werkzeug"],
      description: "Universal einsetztbar, 250g",
      storage: {
        room: "Abstellraum",
        furniture: "Regal 1",
        space: "Fach 2",
        position: "links hinten",
      }
    },
    {
      name: "Bier",
      photoURL: "https://shop.brantl.at/wp-content/uploads/2024/06/142-4212815.jpg",
      labels: ["Food", "Drink", "Food", "Drink", "Food", "Drink", "Food", "Drink",],
      description: "Lecker Bierchen",
      storage: {
        room: "Abstellraum",
        furniture: "Regal 3",
        space: "Fach 1",
        position: "rechts",
      }
    },
    {
      name: "Altes Werkzeug",
      photoURL: "https://w0.peakpx.com/wallpaper/252/393/HD-wallpaper-tje-mechanic-art-autoparts-brush-geometry-man-saints-shop-story-toolket-trumpet.jpg",
      labels: ["Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug",],
      description: "Zum aussortieren, entsorgung jeden Freitag am Bauhof zwischen 10 und 13 UhrZum aussortieren, entsorgung jeden Freitag am Bauhof zwischen 10 und 13 UhrZum aussortieren, entsorgung jeden Freitag am Bauhof zwischen 10 und 13 Uhr",
      storage: {
        room: "Abstellraum",
        furniture: "Regal 5",
        space: "Fach 4",
        position: "ganzes Fach",
      }
    },
    {
      name: "Hammer",
      photoURL: "https://media.rs-online.com/F2242251-01.jpg",
      labels: ["Werkzeug"],
      description: "Universal einsetztbar, 250g",
      storage: {
        room: "Abstellraum",
        furniture: "Regal 1",
        space: "Fach 2",
        position: "links hinten",
      }
    },
    {
      name: "Bier",
      photoURL: "https://shop.brantl.at/wp-content/uploads/2024/06/142-4212815.jpg",
      labels: ["Food", "Drink", "Food", "Drink", "Food", "Drink", "Food", "Drink",],
      description: "Lecker Bierchen",
      storage: {
        room: "Abstellraum",
        furniture: "Regal 3",
        space: "Fach 1",
        position: "rechts",
      }
    },
    {
      name: "Altes Werkzeug",
      photoURL: "https://w0.peakpx.com/wallpaper/252/393/HD-wallpaper-tje-mechanic-art-autoparts-brush-geometry-man-saints-shop-story-toolket-trumpet.jpg",
      labels: ["Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug",],
      description: "Zum aussortieren, entsorgung jeden Freitag am Bauhof zwischen 10 und 13 UhrZum aussortieren, entsorgung jeden Freitag am Bauhof zwischen 10 und 13 UhrZum aussortieren, entsorgung jeden Freitag am Bauhof zwischen 10 und 13 Uhr",
      storage: {
        room: "Abstellraum",
        furniture: "Regal 5",
        space: "Fach 4",
        position: "ganzes Fach",
      }
    },
    {
      name: "Hammer",
      photoURL: "https://media.rs-online.com/F2242251-01.jpg",
      labels: ["Werkzeug"],
      description: "Universal einsetztbar, 250g",
      storage: {
        room: "Abstellraum",
        furniture: "Regal 1",
        space: "Fach 2",
        position: "links hinten",
      }
    },
    {
      name: "Bier",
      photoURL: "https://shop.brantl.at/wp-content/uploads/2024/06/142-4212815.jpg",
      labels: ["Food", "Drink", "Food", "Drink", "Food", "Drink", "Food", "Drink",],
      description: "Lecker Bierchen",
      storage: {
        room: "Abstellraum",
        furniture: "Regal 3",
        space: "Fach 1",
        position: "rechts",
      }
    },
    {
      name: "Altes Werkzeug",
      photoURL: "https://w0.peakpx.com/wallpaper/252/393/HD-wallpaper-tje-mechanic-art-autoparts-brush-geometry-man-saints-shop-story-toolket-trumpet.jpg",
      labels: ["Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug", "Werkzeug",],
      description: "Zum aussortieren, entsorgung jeden Freitag am Bauhof zwischen 10 und 13 UhrZum aussortieren, entsorgung jeden Freitag am Bauhof zwischen 10 und 13 UhrZum aussortieren, entsorgung jeden Freitag am Bauhof zwischen 10 und 13 Uhr",
      storage: {
        room: "Abstellraum",
        furniture: "Regal 5",
        space: "Fach 4",
        position: "ganzes Fach",
      }
    },
  ]

  value: string = ''

  readonly dialog = inject(MatDialog);

  openDialog(lables: Inventory) {
    this.dialog.open(LabelsDialogComponent, {
      data: lables,
      width: '200px',
    });
  }
}

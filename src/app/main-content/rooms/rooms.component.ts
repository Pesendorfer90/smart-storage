import { Component } from '@angular/core';
import { Room } from '../../models/room';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-rooms',
  imports: [
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatTooltipModule,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent {

  // rooms: Room[] = [
  //   {
  //     name: "Keller",
  //     photoURL: "img/keller-lager.png",
  //     description: "Untergeschoss",
  //     furnitures: [
  //       { name: "Regal 1", space: ["Fach 1", "Fach 2", "Fach 3", "Fach 4"] },
  //       { name: "Regal 2", space: ["Fach 1", "Fach 2", "Fach 3", "Fach 4"] },
  //       { name: "Regal 3", space: ["Fach 1", "Fach 2", "Fach 3", "Fach 4"] },
  //       { name: "Regal 4", space: ["Fach 1", "Fach 2", "Fach 3", "Fach 4"] },
  //       { name: "Regal 5", space: ["Fach 1", "Fach 2", "Fach 3", "Fach 4"] },
  //       { name: "Regal 6", space: ["Fach 1", "Fach 2", "Fach 3", "Fach 4"] },
  //       { name: "Regal 7", space: ["Fach 1", "Fach 2", "Fach 3", "Fach 4"] },
  //       { name: "Regal 8", space: ["Fach 1", "Fach 2", "Fach 3", "Fach 4"] },
  //       { name: "Regal 9", space: ["Fach 1", "Fach 2", "Fach 3", "Fach 4"] },
  //     ],
  //   },
  //   {
  //     name: "Dachboden",
  //     photoURL: "img/dachboden.jpg",
  //     description: "2. OG",
  //     furnitures: [
  //       { name: "links", space: ["linke Seite", "Bauhaus Karton", "ganz unten"] },
  //       { name: "rechts", space: ["rechte Seite", "Metalkiste", "linke Seite"] },
  //     ],
  //   },
  //   {
  //     name: "Gartenhütte",
  //     photoURL: "img/gartenhütte.jpg",
  //     description: "Garten",
  //     furnitures: [
  //       { name: "Regal links", space: ["Fach oben", "Fach mitte", "Fach unten", "Boden"] },
  //       { name: "Regal rechts", space: ["Fach 1", "Fach 2", "Fach 3", "Fach 4", "Boden"] },
  //       { name: "Regal mitte", space: ["Fach oben", "Fach mitte", "Fach unten", "Boden"] },
  //     ],
  //   },
  //   {
  //     name: "Vorratskammer",
  //     photoURL: "img/vorratskammer.png",
  //     description: "EG",
  //     furnitures: [
  //       { name: "Regal 1", space: ["Fach 1", "Fach 2", "Fach 3", "Fach 4", "Boden"] },
  //     ],
  //   },
  // ]


}

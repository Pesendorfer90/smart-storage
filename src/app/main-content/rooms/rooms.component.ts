import { Component } from '@angular/core';
import { Room } from '../../models/room';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-rooms',
  imports: [
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent {

  rooms: Room[] = [
    {
      name: "Keller",
      photoURL: "img/keller-lager.png",
      description: "Untergeschoss",
      furnitures: [
        { name: "Regal1", space: ["Fach 1", "Fach 2", "Fach 3", "Fach 4"] },
        { name: "Regal2", space: ["Fach 1", "Fach 2", "Fach 3", "Fach 4"] },
        { name: "Regal3", space: ["Fach 1", "Fach 2", "Fach 3", "Fach 4"] },
        { name: "Regal4", space: ["Fach 1", "Fach 2", "Fach 3", "Fach 4"] },
        { name: "Regal5", space: ["Fach 1", "Fach 2", "Fach 3", "Fach 4"] },
        { name: "Regal6", space: ["Fach 1", "Fach 2", "Fach 3", "Fach 4"] },
        { name: "Regal7", space: ["Fach 1", "Fach 2", "Fach 3", "Fach 4"] },
        { name: "Regal8", space: ["Fach 1", "Fach 2", "Fach 3", "Fach 4"] },
        { name: "Regal9", space: ["Fach 1", "Fach 2", "Fach 3", "Fach 4"] },
      ],
    },
    {
      name: "Dachboden",
      photoURL: "img/dachboden.jpg",
      description: "2. OG",
      furnitures: [
        { name: "links", space: ["linke Seite", "Bauhaus Karton", "ganz unten"] },
        { name: "rechts", space: ["rechte Seite", "Metalkiste", "Rote Dose"] },
      ],
    },
    {
      name: "Gartenhütte",
      photoURL: "img/gartenhütte.jpg",
      description: "Garten",
      furnitures: [
        { name: "Regal links", space: ["Fach oben", "Fach mitte", "Fach unten"] },
        { name: "Regal rechts", space: ["Fach 1", "Fach 2", "Fach 3", "Fach 4"] },
        { name: "Regal mitte", space: ["Fach oben", "Fach mitte", "Fach unten"] },
      ],
    },
    {
      name: "Vorratskammer",
      photoURL: "img/vorratskammer.png",
      description: "EG",
      furnitures: [
        { name: "Regal1", space: ["Fach 1", "Fach 2", "Fach 3", "Fach 4", "Boden"] },
      ],
    },
  ]


}

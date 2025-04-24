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
      photoURL: "https://i.pinimg.com/736x/1f/3c/29/1f3c29082efae5606f59c103ee1366a6.jpg",
      description: "Untergeschoss",
      furnitures: [
        { name: "Regal1", space: ["Fach oben", "Fach mitte", "Fach unten"] },
        { name: "Regal2", space: ["Fach 1", "Fach 2", "Fach 3", "Fach 4"] },
      ],
    },
  ]


}

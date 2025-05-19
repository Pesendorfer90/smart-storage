import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Room } from '../models/room';
import { Labels } from '../models/labels';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  roomsSnapshot: Room[] = [];
  labelsSnapshot: Labels[] = [];

  constructor(public firestoreService: FirestoreService,) {
    this.firestoreService.rooms$.pipe(tap(rooms => this.roomsSnapshot = rooms)).subscribe();
    this.firestoreService.labels$.pipe(tap(labels => this.labelsSnapshot = labels)).subscribe();
  }

  getStorageLocation(id: string) {
    let found = null;
    for (let room of this.roomsSnapshot) {
      for (let furniture of room.furnitures) {
        const space = furniture.space.find(s => s.spaceId === id);
        if (space) {
          found = {
            roomName: room.name,
            furnitureName: furniture.furnitureName,
            spaceName: space.name,
            id: id,
          };
          break;
        }
      }
      if (found) break;
    }
    return found;
  }

  getLabelName(id: string) {
    let found = null;
    for (let label of this.labelsSnapshot) {
      if (label.id == id) {
        found = {
          labelName: label.name,
          id: label.id,

        };
        break;
      }
      if (found) break;
    }
    return found;
  }
}

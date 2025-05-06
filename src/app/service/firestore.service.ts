import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Inventory } from '../models/inventory';
import { Labels } from '../models/labels';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firestore: Firestore = inject(Firestore);
  items$: Observable<Inventory[]>;
  labels$: Observable<Labels[]>;
  rooms$: Observable<Room[]>;

  constructor() {
    this.items$ = this.getData<Inventory>('items');
    this.labels$ = this.getData<Labels>('labels');
    this.rooms$ = this.getData<Room>('rooms');
  }

  getData<T>(collectionName: string): Observable<(T & { id: string })[]> {
    const userProfileCollection = collection(this.firestore, collectionName);
    return collectionData(userProfileCollection, { idField: 'id' }) as Observable<(T & { id: string })[]>;
  }
  
  addData() {
    console.log('Hello World');
    
  }

  updateData() {
    console.log('Hello World');
    
  }
}
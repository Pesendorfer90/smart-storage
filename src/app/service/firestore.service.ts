import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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

  // Items & Rooms

  getData<T>(collectionName: string): Observable<(T & { id: string })[]> {
    const userProfileCollection = collection(this.firestore, collectionName);
    return collectionData(userProfileCollection, { idField: 'id' }) as Observable<(T & { id: string })[]>;
  }

  addData(data: any, collectionName: string) {
    const itemsRef = collection(this.firestore, collectionName);
    return addDoc(itemsRef, data);
  }

  updateImage(docId: string, photoURL: string, collectionName: string) {
    const itemDoc = doc(this.firestore, collectionName, docId);
    return updateDoc(itemDoc, { photoURL });
  }

  // Labels

  async saveOrUpdateLabels(labels: Labels[]) {
    const labelsRef = collection(this.firestore, 'labels');

    for (const label of labels) {
      const id = label.id || doc(labelsRef).id;
      await setDoc(doc(this.firestore, 'labels', id), { name: label.name });
    }
  }

  deleteLabel(labelId: string): Promise<void> {
    const labelDoc = doc(this.firestore, 'labels', labelId);
    return deleteDoc(labelDoc);
  }

  generateId(collectionName: string): string {
    const colRef = collection(this.firestore, collectionName);
    return doc(colRef).id;
  }
}
import { Component } from '@angular/core';
import { FirestoreService } from '../../service/firestore.service';

@Component({
  selector: 'app-settings',
  imports: [  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  // to test the service
  constructor(public firestoreService: FirestoreService) {
    this.firestoreService.items$.subscribe(data => {
      console.log('Firestore data:', data);
    });
    this.firestoreService.labels$.subscribe(data => {
      console.log('Firestore data:', data);
    });
    this.firestoreService.rooms$.subscribe(data => {
      console.log('Firestore data:', data);
    });
  }

}

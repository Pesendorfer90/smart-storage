import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormsModule } from '@angular/forms';
import { MatChipsModule, MatChipInputEvent, MatChipEditedEvent } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Labels } from '../../models/labels';
import { FirestoreService } from '../../service/firestore.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { collection, doc } from 'firebase/firestore';

@Component({
  selector: 'app-lables',
  imports: [
    MatChipsModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './labels.component.html',
  styleUrl: './labels.component.scss'
})
export class LablesComponent {
  labels: WritableSignal<Labels[]> = signal<Labels[]>([]);
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly announcer = inject(LiveAnnouncer);

  edit: boolean = false;

  constructor(private firestoreService: FirestoreService) {
    this.firestoreService.labels$.subscribe(data => {
      this.labels.set(data);
    });
  }

  async removeLabel(keyword: Labels) {
    await this.firestoreService.deleteLabel(keyword.id);
    this.labels.update(keywords => {
      const index = keywords.indexOf(keyword);
      // if (index < 0) {
      //   return keywords;
      // }
      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword.name} from template form`);
      return [...keywords];
    });
  }

  addLabel(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const newId = this.firestoreService.generateId('labels');
      this.labels.update(labels => [...labels, { name: value, id: newId }]);
    }

    event.chipInput?.clear();
  }

  editLabel(keyword: any, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.removeLabel(keyword);
      return;
    }

    this.labels.update(keywords => {
      const index = keywords.indexOf(keyword);
      if (index >= 0) {
        keywords[index].name = value;
        return [...keywords];
      }
      return keywords;
    });
  }

  async saveLabels() {
    this.edit = false
    await this.firestoreService.saveOrUpdateLabels(this.labels())

  }



}

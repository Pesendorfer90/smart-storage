import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatChipsModule, MatChipInputEvent,  MatChipEditedEvent} from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Labels } from '../../models/labels';

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
  readonly labels = signal<Labels[]>([{name: 'angular'}, {name: 'how-to'}, {name: 'tutorial'}, {name: 'accessibility'}, {name: "Drink"}, {name: "Food"}, {name: "Werkzeug"}, {name: "Alkohol"}, {name: "Wein"}, {name: "2022"}]);

  edit: boolean = false;

  announcer = inject(LiveAnnouncer);

  removeLabel(keyword: Labels) {
    this.labels.update(keywords => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword.name} from template form`);
      return [...keywords];
    });
  }

  addLabel(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.labels.update(keywords => [...keywords, {name: value}]);
    }

    event.chipInput!.clear();
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
}

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
  readonly labels = signal<Labels[]>([{name: 'angular', id: 'asd54g45g'}, {name: 'how-to', id: 'dfgh9kjm6785'}, {name: 'tutorial', id: '51gf6'}, {name: 'accessibility', id: 'dfg564564gf'}, {name: "Drink", id: '347gzu5ufg'}, {name: "Food", id: 'mpkmxcs45'}, {name: "Werkzeug", id: 'odxgwkl5'}, {name: "Alkohol", id: 'mxölwkjt56'}, {name: "Wein", id: 'odvcnmsl5'}, {name: "2022", id: 'fm549308rhe'}]);

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
      this.labels.update(keywords => [...keywords, {name: value, id:''}]);
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

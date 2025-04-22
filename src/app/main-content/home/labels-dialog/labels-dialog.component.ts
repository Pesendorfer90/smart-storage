import { Component, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-labels-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatChipsModule],
  templateUrl: './labels-dialog.component.html',
  styleUrl: './labels-dialog.component.scss'
})
export class LabelsDialogComponent {
  data = inject(MAT_DIALOG_DATA);
}

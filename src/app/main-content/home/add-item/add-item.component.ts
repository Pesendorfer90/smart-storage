import { Component, inject, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation, MatStepperModule } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { FirestoreService } from '../../../service/firestore.service';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { SearchService } from '../../../service/search.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-add-item',
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AsyncPipe,
    MatChipsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatTooltipModule
  ],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss'
})
export class AddItemComponent {
  private _formBuilder = inject(FormBuilder);
  imagePreview: string | ArrayBuffer | null = null;
  showLocation: boolean = false;
  location: { roomName: string; furnitureName: string; spaceName: string } | null = null;
  selectedLabels: string[] = [];

  @ViewChildren(MatExpansionPanel) panels!: QueryList<MatExpansionPanel>;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    fourthCtrl: ['', Validators.required],
  });
  fifththFormGroup = this._formBuilder.group({
    fifthhCtrl: ['', Validators.required],
  });


  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    public firestoreService: FirestoreService,
    private searchService: SearchService
  ) {
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  selectedStorageLocation(id: any) {
    this.location = this.searchService.getStorageLocation(id);
    this.closeAllPanels();
    this.showLocation = true;
  }

  closeAllPanels() {
    this.panels.forEach(panel => panel.close());
  }

  addetLabel(id: string) {
    if (this.selectedLabels.includes(id)) {
      const index = this.selectedLabels.indexOf(id);
      this.selectedLabels.splice(index, 1)
    } else {
      this.selectedLabels.push(id);
    }
  }

  saveItem() {
    console.log('Hi!');
    
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

}

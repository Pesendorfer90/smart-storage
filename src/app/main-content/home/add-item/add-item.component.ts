import { Component, inject, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchService } from '../../../service/search.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CloudService } from '../../../service/cloud.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { MatDialogRef } from '@angular/material/dialog';

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
    MatTooltipModule,
    ImageCropperComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss'
})
export class AddItemComponent {
  private _formBuilder = inject(FormBuilder);

  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';
  croppedImageBlob: Blob | null = null;

  showLocation: boolean = false;
  location: { roomName: string; furnitureName: string; spaceName: string; id: string } | null = null;
  showCropper: boolean = false;
  isLoading: boolean = false;

  @ViewChildren(MatExpansionPanel) panels!: QueryList<MatExpansionPanel>;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', [Validators.required]],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    labels: this._formBuilder.array([]),
  });
  fifththFormGroup = this._formBuilder.group({
    fifthhCtrl: ['', Validators.required],
  });

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    public firestoreService: FirestoreService,
    private searchService: SearchService,
    private cloudService: CloudService,
    private sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<AddItemComponent>
  ) {
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  selectedStorageLocation(id: string) {
    this.location = this.searchService.getStorageLocation(id)
    this.closeAllPanels();
    this.showLocation = true;
  }

  closeAllPanels() {
    this.panels.forEach(panel => panel.close());
  }

  get labels(): FormArray {
    return this.fourthFormGroup.get('labels') as FormArray;
  }

  toggleLabel(id: string) {
    const index = this.labels.controls.findIndex(ctrl => ctrl.value === id);
    if (index >= 0) {
      this.labels.removeAt(index);
    } else {
      this.labels.push(new FormControl(id));
    }
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
    this.showCropper = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!);
    this.croppedImageBlob = event.blob ?? null;
    console.log(this.croppedImage);

  }

  loadImageFailed() {
    // show message
  }

  closeCropper() {
    this.showCropper = false;
  }

  removeImg() {
    this.croppedImage = '';
  }

  async saveItem() {
    if (!this.firstFormGroup.valid || !this.secondFormGroup.valid || !this.thirdFormGroup.valid) {
      console.warn('Nicht alle Felder sind gültig oder kein Bild vorhanden.');
      return;
    }

    this.isLoading = true;

    try {
      const itemData = {
        name: this.firstFormGroup.value.firstCtrl,
        description: this.secondFormGroup.value.secondCtrl,
        position: this.thirdFormGroup.value.thirdCtrl,
        spaceId: this.location!.id,
        labels: this.labels.value,
        photoURL: 'img/placeholder.png',
      };

      const docRef = await this.firestoreService.addData(itemData, 'items');
      if (this.croppedImageBlob) {
        const file = new File([this.croppedImageBlob], `temp.png`, { type: 'image/png' });
        const downloadUrl = await this.cloudService.uploadImage(file, docRef.id, 'items');
        await this.firestoreService.updateImage(docRef.id, downloadUrl, 'items');
      }
      this.dialogRef.close();
      console.log('Item erfolgreich gespeichert!');
    } catch (error) {
      console.error('Fehler beim Speichern des Items mit Bild:', error);
    } finally {
      this.isLoading = false;
    }
  }
}

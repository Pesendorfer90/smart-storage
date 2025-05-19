import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule, StepperOrientation } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { map, Observable } from 'rxjs';
import { FirestoreService } from '../../../service/firestore.service';
import { CloudService } from '../../../service/cloud.service';
import { MatDialogRef } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-add-room',
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AsyncPipe,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatTooltipModule,
    ImageCropperComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.scss'
})
export class AddRoomComponent {
  private _formBuilder = inject(FormBuilder);

  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';
  croppedImageBlob: Blob | null = null;

  showCropper: boolean = false;
  isLoading: boolean = false;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', [Validators.required]],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    furnitures: this._formBuilder.array<FormControl<string>>([], this.minArrayLength(1)),
  });
  fourthFormGroup = this._formBuilder.group({
    spaces: this._formBuilder.array<FormArray<FormControl<string>>>([], this.allInnerArraysHaveMinOne()),
  });
  fifththFormGroup = this._formBuilder.group({
    fifthhCtrl: ['', Validators.required],
  });

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    public firestoreService: FirestoreService,
    private cloudService: CloudService,
    private sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<AddRoomComponent>
  ) {
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  onStepChange(event: StepperSelectionEvent) {
    if (event.selectedIndex === 3) {
      this.initSpacesForFurnitures();
    }
  }

  preventEnter(event: Event, data: string, index: number, furniture: boolean) {
    event.preventDefault();
    if (furniture) {
      this.addFurnitures(data);
    } else {
      this.addSpace(data, index);
    }
  }

  addFurnitures(furniture: string) {
    if (!furniture.trim()) return;
    this.furnituresArray.push(this._formBuilder.control(furniture.trim(), { nonNullable: true }));
  }

  deleteFurnitures(furniture: string) {
    const index = this.furnituresArray.controls.findIndex(control => control.value === furniture);
    this.furnituresArray.removeAt(index);
  }

  addSpace(space: string, furnitureIndex: number) {
    if (!space.trim()) return;

    const targetArray = this.spacesArray.at(furnitureIndex);
    if (targetArray instanceof FormArray) {
      targetArray.push(this._formBuilder.control(space.trim(), { nonNullable: true }));
    }
  }

  deleteSpace(space: string, furnitureIndex: number) {
    const targetArray = this.spacesArray.at(furnitureIndex);
    if (targetArray instanceof FormArray) {
      const index = targetArray.controls.findIndex(control => control.value === space);
      targetArray.removeAt(index);
    }
  }

  get furnituresArray(): FormArray<FormControl<string>> {
    return this.thirdFormGroup.get('furnitures') as FormArray<FormControl<string>>;
  }

  get spacesArray(): FormArray<FormArray<FormControl<string>>> {
    return this.fourthFormGroup.get('spaces') as FormArray<FormArray<FormControl<string>>>;
  }

  initSpacesForFurnitures() {
    this.spacesArray.clear();
    this.furnituresArray.controls.forEach(() => {
      this.spacesArray.push(this._formBuilder.array<FormControl<string>>([]));
    });
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
    this.showCropper = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!);
    this.croppedImageBlob = event.blob ?? null;
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
        furnitures: this.createFurnitureObj(),
        photoURL: 'img/placeholder.png',
      };

      const docRef = await this.firestoreService.addData(itemData, 'rooms');
      if (this.croppedImageBlob) {
        const file = new File([this.croppedImageBlob], `temp.png`, { type: 'image/png' });
        const downloadUrl = await this.cloudService.uploadImage(file, docRef.id, 'rooms');
        await this.firestoreService.updateImage(docRef.id, downloadUrl, 'rooms');
      }
      this.dialogRef.close();
    } catch (error) {
      console.error('Fehler beim Speichern des Items mit Bild:', error);
    } finally {
      this.isLoading = false;
    }
  }

  minArrayLength(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const array = control as FormArray;
      return array.length >= min ? null : { minLength: true };
    };
  }

  allInnerArraysHaveMinOne(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const outerArray = control as FormArray;
      const isValid = outerArray.controls.every(inner =>
        (inner as FormArray).length > 0
      );
      return isValid ? null : { emptyInnerArray: true };
    };
  }

  createFurnitureObj() {
    const furnitureNames: string[] = this.thirdFormGroup.value.furnitures!;
    const spaceLists: string[][] = this.fourthFormGroup.value.spaces!;

    return furnitureNames.map((name, index) => ({
      furnitureName: name,
      space: (spaceLists?.[index] ?? []).map(spaceName => ({
        name: spaceName,
        spaceId: this.generateId()
      }))
    }));
  }

  generateId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    return result;
  }
}

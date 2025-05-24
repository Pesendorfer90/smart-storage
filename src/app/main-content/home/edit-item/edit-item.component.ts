import { Component, inject } from '@angular/core';
import { NgClass, NgStyle, NgIf } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inventory } from '../../../models/inventory';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { SearchService } from '../../../service/search.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FirestoreService } from '../../../service/firestore.service';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { CloudService } from '../../../service/cloud.service';

@Component({
  selector: 'app-edit-item',
  imports: [
    NgClass,
    NgStyle,
    NgIf,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatBadgeModule,
    MatExpansionModule,
    MatTooltipModule,
    MatIconModule,
    MatListModule,
    AsyncPipe,
    MatButtonModule,
    MatProgressSpinnerModule,
    ImageCropperComponent
  ],
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.scss'
})
export class EditItemComponent {
  item = inject<Inventory>(MAT_DIALOG_DATA);
  private _formBuilder = inject(FormBuilder);
  labelEdit: boolean = false;
  showLocation: boolean = true;
  locationInput: boolean = false;
  isLoading: boolean = false;
  showCropper: boolean = false;
  form!: FormGroup;

  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';
  croppedImageBlob: Blob | null = null;

  locationFn: (id: string) => { roomName: string; furnitureName: string; spaceName: string } | null;
  labelFn: (id: string) => { labelName: string; id: string } | null;

  constructor(
    public searchService: SearchService,
    public firestoreService: FirestoreService,
    private dialogRef: MatDialogRef<EditItemComponent>,
    private sanitizer: DomSanitizer,
    private cloudService: CloudService,
  ) {
    this.locationFn = this.searchService.getStorageLocation.bind(this.searchService);
    this.labelFn = this.searchService.getLabelName.bind(this.searchService);
  }

  ngOnInit() {
    this.form = this._formBuilder.group({
      name: [this.item.name, Validators.required],
      description: [this.item.description, Validators.required],
      photoURL: [this.item.photoURL],
      labels: [this.item.labels || []],
      spaceId: [this.item.spaceId, Validators.required],
      position: [this.item.position, Validators.required],
      id: [this.item.id, Validators.required],
    });
    this.croppedImage = this.item.photoURL;
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
    this.showCropper = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImageBlob = event.blob ?? null;
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl!);
  }

  loadImageFailed() {
    // show message
  }

  closeCropper() {
    this.showCropper = false;
  }

  removeImg() {
    this.croppedImage = this.item.photoURL;
    this.croppedImageBlob = null;
  }

  selectedStorageLocation(id: string) {
    this.form.get('spaceId')!.setValue(id);
    this.showLocation = true;
    this.locationInput = true;
  }

  toggleLabel(id: string) {
    const control = this.form.get('labels');
    if (!control) return;
    const current: string[] = control.value || [];
    const exists = current.includes(id);
    const updated = exists
      ? current.filter(label => label !== id) : [...current, id];
    control.setValue(updated);
  }


  closeEdit() {
    this.dialogRef.close();
  }

  async saveEditedItem() {
    if (!this.form.get('name')?.valid || !this.form.get('description')?.valid ||
      !this.form.get('spaceId')?.valid || !this.form.get('position')?.valid) {
      console.warn('Nicht alle Felder sind gültig oder kein Bild vorhanden.');
      return;
    }

    this.isLoading = true;

    try {
      const itemData = {
        name: this.form.value.name,
        description: this.form.value.description,
        position: this.form.value.position,
        spaceId: this.form.value.spaceId,
        labels: this.form.value.labels,
        photoURL: this.form.value.photoURL,
        id: this.item.id
      };

      const docRef = await this.firestoreService.updateData(itemData, 'items');
      if (this.croppedImageBlob) {
        const file = new File([this.croppedImageBlob], `temp.png`, { type: 'image/png' });
        const downloadUrl = await this.cloudService.uploadImage(file, this.item.id, 'items');
        await this.firestoreService.updateImage(this.item.id, downloadUrl, 'items');
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

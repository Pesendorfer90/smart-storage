import { AsyncPipe, NgClass } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { Room } from '../../../models/room';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FirestoreService } from '../../../service/firestore.service';
import { CloudService } from '../../../service/cloud.service';

@Component({
  selector: 'app-edit-room',
  imports: [
    NgClass,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    // MatBadgeModule,
    MatExpansionModule,
    MatTooltipModule,
    MatIconModule,
    MatListModule,
    // AsyncPipe,
    MatButtonModule,
    MatProgressSpinnerModule,
    ImageCropperComponent
  ],
  templateUrl: './edit-room.component.html',
  styleUrl: './edit-room.component.scss'
})
export class EditRoomComponent {
  isMobile = window.innerWidth < 600;
  form!: FormGroup;
  room = inject<Room>(MAT_DIALOG_DATA);
  private _formBuilder = inject(FormBuilder);
  isLoading: boolean = false;
  showCropper: boolean = false;

  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';
  croppedImageBlob: Blob | null = null;

  constructor(
    public firestoreService: FirestoreService,
    private dialogRef: MatDialogRef<EditRoomComponent>,
    private sanitizer: DomSanitizer,
    private cloudService: CloudService,
  ) {

  }

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 600;
  }

  ngOnInit() {
    this.form = this._formBuilder.group({
      name: [this.room.name, Validators.required],
      description: [this.room.description, Validators.required],
      photoURL: [this.room.photoURL],
      furnitures: this._formBuilder.array(
        this.room.furnitures.map(f => this._formBuilder.group({
          furnitureName: [f.furnitureName, Validators.required],
          space: this._formBuilder.array(
            f.space.map(s => this._formBuilder.group({
              name: [s.name, Validators.required],
              spaceId: [s.spaceId]
            }))
          )
        }))
      ),
      id: [this.room.id, Validators.required],
    });

    // UI-Status hinzufügen
    this.room.furnitures = this.room.furnitures.map(f => ({
      ...f,
      titelEdit: false,
      space: f.space.map(s => ({
        ...s,
        titelEdit: false
      }))
    }));

    this.croppedImage = this.room.photoURL;
  }

  get furnitures(): FormArray {
    return this.form.get('furnitures') as FormArray;
  }

  getSpaces(i: number): FormArray {
    return this.furnitures.at(i).get('space') as FormArray;
  }

  getSpaceGroup(i: number, si: number): FormGroup {
    return this.getSpaces(i).at(si) as FormGroup;
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
    this.croppedImage = this.room.photoURL;
    this.croppedImageBlob = null;
  }

  onTitleClick(event: MouseEvent, furniture: any): void {
    this.preventEvent(event);
    furniture.titelEdit = true;
  }

  preventEvent(event: MouseEvent) {
    event.stopPropagation();
  }

  saveEditedItem() {
    console.log('hi');
  }

  closeEdit() {
    this.dialogRef.close();
  }
}

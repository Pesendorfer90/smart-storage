import { inject, Injectable } from '@angular/core';
import { ref, Storage, uploadBytesResumable } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  private readonly storage: Storage = inject(Storage);

  uploadFile(file: File) {
    const storageRef = ref(this.storage, file.name);
    return uploadBytesResumable(storageRef, file);
  }
}

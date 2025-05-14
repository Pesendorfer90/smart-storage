import { inject, Injectable } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytes, uploadBytesResumable } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  private readonly storage: Storage = inject(Storage);

  // uploadFile(file: File) {
  //   const storageRef = ref(this.storage, file.name);
  //   return uploadBytesResumable(storageRef, file);
  // }

  async uploadItemImage(file: File, id: string): Promise<string> {
    const path = `items/${id}.png`;
    const fileRef = ref(this.storage, path);

    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  }
}

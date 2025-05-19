import { inject, Injectable } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytes, uploadBytesResumable } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  private readonly storage: Storage = inject(Storage);

  async uploadImage(file: File, id: string, collectionPath: string): Promise<string> {
    const path = `${collectionPath}/${id}.png`;
    const fileRef = ref(this.storage, path);

    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  }
}

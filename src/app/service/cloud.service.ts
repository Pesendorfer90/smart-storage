import { inject, Injectable } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import imageCompression from 'browser-image-compression';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  private readonly storage: Storage = inject(Storage);

  // async uploadImage(file: File, id: string, collectionPath: string): Promise<string> {
  //   const path = `${collectionPath}/${id}.png`;
  //   const fileRef = ref(this.storage, path);

  //   await uploadBytes(fileRef, file);
  //   return await getDownloadURL(fileRef);
  // }


  async uploadImage(file: File, id: string, collectionPath: string): Promise<string> {
    const compressedFile = await this.compressImage(file);
    const path = `${collectionPath}/${id}.jpg`; // JPEG ist effizienter
    const fileRef = ref(this.storage, path);

    await uploadBytes(fileRef, compressedFile);
    return await getDownloadURL(fileRef);
  }

  private async compressImage(file: File): Promise<File> {
    const options = {
      maxSizeMB: 0.4,              // Zielgröße: max ~700 KB
      maxWidthOrHeight: 512,      // optionale Größenbegrenzung
      useWebWorker: true,
      fileType: 'image/jpeg'       // in JPG komprimieren
    };

    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error('Bildkompression fehlgeschlagen:', error);
      throw error;
    }
  }
}
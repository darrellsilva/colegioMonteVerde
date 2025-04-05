import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }


  checkIfImageExists(filePath: string): Observable<string | null> {
    const fileRef = this.storage.ref(filePath);

    return new Observable<string | null>((observer) => {
      fileRef.getMetadata()
        .subscribe(
          () => {
            fileRef.getDownloadURL().subscribe(
              (url) => observer.next(url), // Si la URL es obtenida, el archivo existe
              (error) => observer.next(null) // Si hay un error al obtener la URL
            );
          },
          (error) => observer.next(null) // Si hay un error al obtener la metadata, el archivo no existe
        );
    });
  }

  deleteImage(filePath: string): void {
    const fileRef = this.storage.ref(filePath);
    fileRef.delete().subscribe(
      () => {
        console.log('Image deleted successfully');
      },
      (error) => {
        console.error('Error deleting image:', error);
      }
    );
  }
}

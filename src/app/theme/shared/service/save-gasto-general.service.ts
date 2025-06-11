import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  Firestore,
  getDocs,
  updateDoc
} from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { gastosGenerales } from '../../../store/state/totalState';

@Injectable({
  providedIn: 'root'
})
export class SaveGastoGeneralService {
  constructor(private firebase: Firestore) {}

  listarGastosGenerales(): Observable<gastosGenerales[]> {
    const ref = collection(this.firebase, 'gastosGenerales'); // Corrected collection name
    return from(getDocs(ref)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            detalleGasto: data['detalleGasto'],
            fechaGasto: data['fechaGasto'],
            foto: data['foto'],
            montoGasto: data['montoGasto'],
            pathImagen: data['pathImage'],
          } as gastosGenerales;
        })
      )
    );
  }

  editarVentasCurso(idVenta: string, dataRegistro: any): Observable<void> {
    const alumnoDocRef = doc(this.firebase, 'ventasCursos', idVenta);
    return from(updateDoc(alumnoDocRef, dataRegistro));
  }

  guardarGastoGeneral(data: any): Observable<DocumentReference<DocumentData>> {
    const ref = collection(this.firebase, 'gastosGenerales');
    return from(addDoc(ref, data));
  }
}

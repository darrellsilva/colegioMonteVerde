import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, DocumentData, DocumentReference, Firestore, getDocs, doc } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtrosIngresosService {

  constructor(private firestore: Firestore) {  }

  listarOtrosIngresos(): Observable<any[]> {
    const ref = collection(this.firestore, 'otrosIngresos');
    return from(getDocs(ref)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data
          };
        })
      )
    );
  }

  guardarOtrosIngresos(data: { descripcionIngreso: string; montoIngreso: number }): Observable<DocumentReference<DocumentData>> {
    const ref = collection(this.firestore, 'otrosIngresos');
    return from(addDoc(ref, data));
  }

  eliminarIngreso(id: string): Observable<void> {
    const ref = doc(this.firestore, `otrosIngresos/${id}`);
    return from(deleteDoc(ref));
  }
}

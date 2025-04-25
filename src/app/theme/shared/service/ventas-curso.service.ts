import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDocs, updateDoc } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { otrosCobro, ventasCursos } from '../../../store/state/totalState';

@Injectable({
  providedIn: 'root'
})
export class VentasCursoService {

  constructor(private firebase: Firestore) { }

  listarVentasCursos(): Observable<ventasCursos[]> {
    const ref = collection(this.firebase, 'ventasCursos'); // Corrected collection name
    return from(getDocs(ref)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc['id'],
            venta: data['venta'],
            registroVenta: data['registroVenta'],
          } as ventasCursos;
        })
      )
    );
  }

  editarVentasCurso(idVenta: string, dataRegistro: any): Observable<void> {
    const alumnoDocRef = doc(this.firebase, 'ventasCursos', idVenta);
    return from(updateDoc(alumnoDocRef, dataRegistro ));
  }
}

import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import {  infoApoderado } from '../../../store/state/totalState';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class InfoApoderadoService {
  constructor(private firebase: Firestore) {}

  listarInfoApoderado(): Observable<infoApoderado[]> {
    const ref = collection(this.firebase, 'informacionApoderado'); // Corrected collection name
    return from(getDocs(ref)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            nombre: data['nombre'],
            apellido: data['apellido'],
            correoPersonal: data['emailPersonal'],
            correoInstitucional: data['correoInstitucional'],
            telefono: data['telefono'],
            alumno: data['alumno']
          } as infoApoderado;
        })
      )
    );
  }
}

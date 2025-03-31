import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import {  infoApoderado } from '../../../store/state/totalState';
import { addDoc, collection, Firestore, getDocs } from '@angular/fire/firestore';

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
            correoPersonal: data['correoPersonal'],
            correoInstitucional: data['correoInstitucional'],
            telefono: data['telefono'],
            alumno: data['alumno'],
            rolUsuario: data['rolUsuario']
          } as infoApoderado;
        })
      )
    );
  }

  guardarInfoApoderado(datosApoderados: infoApoderado): Observable<any> {
    const ref = collection(this.firebase, 'informacionApoderado');
    return from(addDoc(ref, datosApoderados));
  }


}

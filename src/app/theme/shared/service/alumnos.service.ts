import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { addDoc, collection, doc, Firestore, getDocs, updateDoc } from '@angular/fire/firestore';
import { alumnos, otrosCobro } from '../../../store/state/totalState';
import { DocumentData, DocumentReference } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(private firebase: Firestore ) { }

  // LISTAR ALUMNOS

  listarAlumnos(): Observable<alumnos[]> {
    const ref = collection(this.firebase, 'alumnos'); // Corrected collection name
    return from(getDocs(ref)).pipe(
      map(snapshot => snapshot.docs.map(doc => {
        const data = doc.data();
        console.log('dataEffects', data)
        return {
          id: doc.id,
          nombre: data['nombre'],
          apellido: data['apellido'],
          emailPadre: data['emailPadre'],
          mesesPago: data['mesesPago']
        } as alumnos;
      }))
    );
  }

  guardarAlumno(alumnos: any): Observable<any> {
    const ref = collection(this.firebase, 'alumnos');
    return from(addDoc(ref, alumnos));
  }

  editarAlumno(id: string, correo: any): Observable<void> {
    const alumnoDocRef = doc(this.firebase, `alumnos/${id}`);
    return from(updateDoc(alumnoDocRef, correo));
  }



  // FIN LISTAR ALUMNOS
  // ----------------------------------------------------------------------
  // OTROS COBROS
  listarOtrosCobros(): Observable<otrosCobro[]> {
    const ref = collection(this.firebase, 'otrosCobros'); // Corrected collection name
    return from(getDocs(ref)).pipe(
      map(snapshot => snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          activo: data['activo'],
          infoPagoAlumno: data['infoPagoAlumno'],
          titulo: data['titulo'],
          montoCobrar: data['montoCobrar'],
          montoTotalRecaudado: data['montoTotalRecaudado'],
          cantidadAlumnosPago: data['cantidadAlumnosPago']
        } as otrosCobro;
      }))
    );

  }

  editarCobros(dataModificar: any): Observable<void> {
    const alumnoDocRef = doc(this.firebase, `otrosCobros/${dataModificar.id}`);
    return from(updateDoc(alumnoDocRef, dataModificar));
  }

  // FIN OTROS COBROS


}


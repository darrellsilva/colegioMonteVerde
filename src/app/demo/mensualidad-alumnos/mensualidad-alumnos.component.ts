import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../theme/shared/shared.module';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/indexReducer/indexReducer';
import { alumnos } from '../../store/state/totalState';

@Component({
  selector: 'app-mensualidad-alumnos',
  imports: [SharedModule],
  templateUrl: './mensualidad-alumnos.component.html',
  styleUrl: './mensualidad-alumnos.component.scss'
})
export class MensualidadAlumnosComponent implements  OnInit {

  mensualidadAlumos = [];
  tableModal: alumnos = {
    id:'',
    nombre:'',
    apellido:'',
    emailPadre: '',
    mesesPago: [
      {
        mes: '',
        monto: 0
      }
    ]

  };

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('listarAlumnos').subscribe(alumnos => {
      if (alumnos.length > 0) {
        this.mensualidadAlumos = alumnos;
      }
    })
  }

  dataDetalle(id) {
    this.tableModal = this.mensualidadAlumos.find(alumno => alumno.id === id);
  }
}

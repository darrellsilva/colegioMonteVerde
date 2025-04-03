import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../theme/shared/shared.module';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/indexReducer/indexReducer';
import { alumnos } from '../../store/state/totalState';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mensualidad-alumnos',
  imports: [SharedModule],
  templateUrl: './mensualidad-alumnos.component.html',
  styleUrl: './mensualidad-alumnos.component.scss'
})
export class MensualidadAlumnosComponent implements  OnInit {

  formBusqueda : FormGroup;
  alertNoEncontrado: boolean = false;
  mensualidadAlumos = [];
  mensualidadAlumosCopia = [];
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

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.formBusqueda = this.fb.group({
      busqueda: ['']
    })
  }

  ngOnInit(): void {
    this.store.select('listarAlumnos').subscribe(alumnos => {
      if (alumnos.length > 0) {
        this.mensualidadAlumos = [...alumnos].sort((a, b) => a.nombre.localeCompare(b.nombre));;
        this.mensualidadAlumosCopia = [...alumnos].sort((a, b) => a.nombre.localeCompare(b.nombre));;
      }
    })
  }

  dataDetalle(id) {
    this.tableModal = this.mensualidadAlumos.find(alumno => alumno.id === id);
    console.log('detalle', this.tableModal)
  }

  filtrarAlumnos() {
    const busqueda = this.formBusqueda.get('busqueda').value.toLowerCase();
    const nuevaBusqueda = this.mensualidadAlumosCopia.filter(alumno =>
      alumno.nombre.toLowerCase().includes(busqueda) ||
      alumno.apellido.toLowerCase().includes(busqueda) ||
      alumno.emailPadre.toLowerCase().includes(busqueda)
    );

    if (nuevaBusqueda.length === 0) {
      this.alertNoEncontrado = true;
      this.mensualidadAlumos = this.mensualidadAlumosCopia;
    } else {
      this.alertNoEncontrado = false;
      this.mensualidadAlumos = nuevaBusqueda;
    }
  }
}

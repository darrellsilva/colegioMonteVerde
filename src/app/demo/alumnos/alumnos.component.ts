import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/indexReducer/indexReducer';
import { alumnos } from '../../store/state/totalState';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addAlumno } from '../../store/action/totalActions';
import { AlumnosService } from '../../theme/shared/service/alumnos.service';
import { SpinnerServiceService } from '../../theme/shared/service/spinner-service.service';

@Component({
  selector: 'app-alumnos',
  imports: [ReactiveFormsModule],
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.scss'
})
export class AlumnosComponent implements OnInit {
  newAlumno: FormGroup;
  listaAlumnos: alumnos[] = [];

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private saveAlumno: AlumnosService,
    private spinner: SpinnerServiceService
  ) {
    this.newAlumno = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correoApoderado: ['']
    });
  }

  ngOnInit(): void {
    this.store.select('listarAlumnos').subscribe((alumnos) => {
      console.log(alumnos);
      this.listaAlumnos = alumnos;
    });
  }

  guardarAlumno() {
    this.spinner.funcionalidadSpinner(true)

    const newAlumno = {
      nombre: this.newAlumno.value.nombre,
      apellido: this.newAlumno.value.apellido,
      emailPadre: this.newAlumno.value.correoApoderado,
      mesesPago: []
    };

    this.store.dispatch(addAlumno({ alumno: newAlumno }));

    this.saveAlumno.guardarAlumno(newAlumno).subscribe(response => {
      console.log('guardado exitosamente');
      this.spinner.funcionalidadSpinner(false)

    })
  }
}
;

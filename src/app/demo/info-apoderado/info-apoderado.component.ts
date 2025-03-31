import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../theme/shared/shared.module';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/indexReducer/indexReducer';
import { listarAlumnos } from '../../store/action/totalActions';
import { alumnos } from '../../store/state/totalState';

@Component({
  selector: 'app-info-apoderado',
  imports: [ReactiveFormsModule, SharedModule],
  templateUrl: './info-apoderado.component.html',
  styleUrl: './info-apoderado.component.scss'
})
export class InfoApoderadoComponent implements OnInit{

  registerForm: FormGroup;
  listaAlumnos: alumnos[] = [];

  constructor(private store:Store<AppState>, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correoPersonal: ['', Validators.required],
      telefono: ['', Validators.required],
      correoInstitucional: ['', Validators.required],
      alumno: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.store.dispatch(listarAlumnos())
    this.store.select('listarAlumnos').subscribe((listAlumnos) => {
      if (listAlumnos.length > 0) {
        this.listaAlumnos = listAlumnos;
        console.log(this.listaAlumnos);
      }
    });
  }

  registrarDataUsuario() {
    console.log(this.registerForm.value)
  }
}

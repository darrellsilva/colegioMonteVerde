import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../theme/shared/shared.module';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/indexReducer/indexReducer';
import { listarAlumnos } from '../../store/action/totalActions';
import { alumnos, infoApoderado } from '../../store/state/totalState';
import { InfoApoderadoService } from '../../theme/shared/service/info-apoderado.service';
import { AlumnosService } from '../../theme/shared/service/alumnos.service';
import { Router } from '@angular/router';
import { SpinnerServiceService } from '../../theme/shared/service/spinner-service.service';

@Component({
  selector: 'app-info-apoderado',
  imports: [ReactiveFormsModule, SharedModule],
  templateUrl: './info-apoderado.component.html',
  styleUrl: './info-apoderado.component.scss'
})
export class InfoApoderadoComponent implements OnInit {
  registerForm: FormGroup;
  listaAlumnos: alumnos[] = [];
  correoInstitucional: string = '';

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private apoderado: InfoApoderadoService,
    private alumos: AlumnosService,
    private router: Router,
    private spinner: SpinnerServiceService
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correoPersonal: ['', Validators.required],
      telefono: ['', Validators.required],
      correoInstitucional: ['', Validators.required],
      alumno: ['', Validators.required]
    });

    this.store.select('correoInsitucional').subscribe((apoderadoInfo) => {
      if (apoderadoInfo.correoInstitucional !== '') {
        console.log('correo institucional', apoderadoInfo.correoInstitucional);
        this.correoInstitucional = apoderadoInfo.correoInstitucional;
        this.registerForm.get('correoInstitucional')?.disable();
        this.registerForm.get('correoInstitucional')?.setValue(apoderadoInfo.correoInstitucional);
      }
    });
  }

  ngOnInit(): void {
    this.spinner.funcionalidadSpinner(false)
    this.store.dispatch(listarAlumnos());
    this.store.select('listarAlumnos').subscribe((listAlumnos) => {
      if (listAlumnos.length > 0) {
        this.listaAlumnos = listAlumnos;
        console.log(this.listaAlumnos);
      }
    });
  }

  registrarDataUsuario() {
    this.spinner.funcionalidadSpinner(true);
    const datosApoderados: infoApoderado = {
      nombre: this.registerForm.value.nombre,
      apellido: this.registerForm.value.apellido,
      correoPersonal: this.registerForm.value.correoPersonal,
      correoInstitucional: this.correoInstitucional,
      telefono: this.registerForm.value.telefono,
      alumno: this.registerForm.get('alumno')?.value,
      rolUsuario: 'user'
    };

    const emailPadre = {
      emailPadre: this.correoInstitucional
    };

    this.alumos.editarAlumno(this.registerForm.get('alumno')?.value, emailPadre);

    this.apoderado.guardarInfoApoderado(datosApoderados).subscribe(() => {
      console.log('Datos guardados correctamente');
      this.router.navigate(['dashboard']);
    });
  }
}

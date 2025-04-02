import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/indexReducer/indexReducer';
import { combineLatest } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { AlumnosService } from '../../theme/shared/service/alumnos.service';
import { listarAlumnos, listarOtrosCobros } from '../../store/action/totalActions';

@Component({
  selector: 'app-pagos',
  imports: [ReactiveFormsModule],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.scss'
})
export class PagosComponent implements OnInit {
  formRegister: FormGroup;
  listaOtrosCobros: any = [];
  alumnosAdeudados: any = [];

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private service: AlumnosService
  ) {
    this.formRegister = this.fb.group({
      monto: ['', Validators.required],
      fechaPago: ['', Validators.required],
      idAlumno: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    combineLatest([this.store.select('otrosCobros'), this.store.select('listarAlumnos')]).subscribe(([otrosCobrs, listarAlumnos]) => {
      if (otrosCobrs['otrosCobros'] != null || otrosCobrs['otrosCobros'] != undefined) {
        this.listaOtrosCobros = otrosCobrs['otrosCobros'];
        this.alumnosAdeudados = listarAlumnos;
      }
    });
  }

  guardarRegistroPago(id) {
    const listaSave = this.listaOtrosCobros.filter(cob => cob.id === id);

    const finalArray = {
      infoPagoAlumno:[]
    }

    listaSave[0].infoPagoAlumno.forEach((infoPagoAlumno) => {
      finalArray.infoPagoAlumno.push(infoPagoAlumno);
    })


    const dataRegistro = {
      monto: this.formRegister.value.monto,
      fechaPago: this.convertToTimestamp(this.formRegister.value.fechaPago),
      idAlumno: this.formRegister.value.idAlumno
    };

    finalArray.infoPagoAlumno.push(dataRegistro)

    console.log(finalArray)

    this.service.editarInfoPagoAlmno(listaSave[0], finalArray).subscribe(response =>{
      this.store.dispatch(listarOtrosCobros())
    })

  }
  seleccionarCobro(id) {
    const listaSave = this.listaOtrosCobros.filter(cob => cob.id === id)
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate, 'dd/MM/yyyy', 'en-US');
    this.formRegister.get('fechaPago').setValue(formattedDate);
    this.formRegister.get('monto').setValue(listaSave[0].montoCobrar);
  }

  convertToTimestamp(formattedDate: string): any {
    const [day, month, year] = formattedDate.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return { seconds: Math.floor(date.getTime() / 1000), nanoseconds: 0 };
  }

  validUsuario(id, idAlumno: any) {
    const existe = idAlumno.filter(cob => cob.idAlumno === id);
    if (existe.length > 0) {
      return true
    }else {
      return false;
    }
  }
}

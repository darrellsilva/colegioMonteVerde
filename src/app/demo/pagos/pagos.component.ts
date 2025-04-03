import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/indexReducer/indexReducer';
import { combineLatest } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { AlumnosService } from '../../theme/shared/service/alumnos.service';
import { listarAlumnos, listarOtrosCobros } from '../../store/action/totalActions';
import { SpinnerServiceService } from '../../theme/shared/service/spinner-service.service';
import { otrosCobro } from '../../store/state/totalState';

@Component({
  selector: 'app-pagos',
  imports: [ReactiveFormsModule],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.scss'
})
export class PagosComponent implements OnInit {
  formRegister: FormGroup;
  formRegisterMesual: FormGroup;
  formCobro: FormGroup;
  listaOtrosCobros: any = [];
  alumnosAdeudados: any = [];
  listaMeses: any = [];
  mesesPagar: any = [];
  idSeleccionadoAlumno: string = '';

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private service: AlumnosService,
    private spinner: SpinnerServiceService
  ) {
    this.formRegisterMesual = this.fb.group({
      mes: ['', Validators.required],
      monto: ['', Validators.required]
    });

    this.formRegister = this.fb.group({
      monto: ['', Validators.required],
      fechaPago: ['', Validators.required],
      idAlumno: ['', Validators.required]
    });

    this.formCobro = this.fb.group({
      activo: [false],
      titulo: ['', Validators.required],
      montoCobrar: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    combineLatest([this.store.select('otrosCobros'), this.store.select('listarAlumnos')]).subscribe(([otrosCobrs, listarAlumnos]) => {
      if (otrosCobrs['otrosCobros'] != null || otrosCobrs['otrosCobros'] != undefined) {
        this.listaOtrosCobros = otrosCobrs['otrosCobros'];
        this.alumnosAdeudados = [...listarAlumnos].sort((a, b) => a.nombre.localeCompare(b.nombre));
      }
    });
  }

  guardarRegistroPago(id) {
    const listaSave = this.listaOtrosCobros.filter((cob) => cob.id === id);

    const finalArray = {
      infoPagoAlumno: []
    };

    listaSave[0].infoPagoAlumno.forEach((infoPagoAlumno) => {
      finalArray.infoPagoAlumno.push(infoPagoAlumno);
    });

    const dataRegistro = {
      monto: this.formRegister.value.monto,
      fechaPago: this.convertToTimestamp(this.formRegister.value.fechaPago),
      idAlumno: this.formRegister.value.idAlumno
    };

    finalArray.infoPagoAlumno.push(dataRegistro);

    console.log(finalArray);

    this.service.editarInfoPagoAlmno(listaSave[0], finalArray).subscribe((response) => {
      this.store.dispatch(listarOtrosCobros());
    });
  }

  seleccionarCobro(id) {
    const listaSave = this.listaOtrosCobros.filter((cob) => cob.id === id);
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
    const existe = idAlumno.filter((cob) => cob.idAlumno === id);
    if (existe.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedId = selectElement.value;
    this.idSeleccionadoAlumno = selectedId;
    const dataAlumno = this.alumnosAdeudados.filter((cob) => cob.id === selectedId);
    this.listaMeses = dataAlumno[0].mesesPago;
    this.formRegisterMesual.get('monto').setValue(5000);
    this.mesesPagar = [
      { mes: 'Marzo' },
      { mes: 'Abril' },
      { mes: 'Mayo' },
      { mes: 'Junio' },
      { mes: 'Julio' },
      { mes: 'Agosto' },
      { mes: 'Septiembre' },
      { mes: 'Octubre' },
      { mes: 'Noviembre' },
      { mes: 'Diciembre' }
    ];
  }

  guardarMensualidad() {
    this.spinner.funcionalidadSpinner(true);

    const dataAlumno = this.alumnosAdeudados.filter((cob) => cob.id === this.idSeleccionadoAlumno);

    const listaSaveFinal = {
      mesesPago: []
    };

    dataAlumno[0].mesesPago.forEach((mesesPago) => {
      listaSaveFinal.mesesPago.push(mesesPago);
    });

    const agregaMonto = {
      mes: this.formRegisterMesual.value.mes,
      monto: this.formRegisterMesual.value.monto
    };

    listaSaveFinal.mesesPago.push(agregaMonto);

    console.log('monto agregado', listaSaveFinal);
    this.service.editarAlumno(this.idSeleccionadoAlumno, listaSaveFinal).subscribe((response) => {
      this.store.dispatch(listarAlumnos())
      window.location.reload()
      this.spinner.funcionalidadSpinner(false);
    });
  }

  mesesDisponible(mes: any) {
    const operacionSeleccionada = this.alumnosAdeudados.filter((cob) => cob.id === this.idSeleccionadoAlumno);
    const mesAsignado = operacionSeleccionada[0].mesesPago.filter((cob) => cob.mes === mes);
    if (mesAsignado.length > 0) {
      return true
    }else {
      return false;
    }
  }

  guardarCobro() {

    const newCobro: otrosCobro = {
      id: '',
      activo: this.formCobro.value.activo,
      titulo: this.formCobro.value.titulo,
      montoCobrar: Number(this.formCobro.value.montoCobrar),
      idCobro: this.formCobro.value.titulo.replace(/\s/g, ''),
      montoTotalRecaudado: 0,
      cantidadAlumnosPago: 0,
      infoGasto: [
        {
          descripcionGasto: '',
          fechaGasto: '',
          totalGasto: 0
        }
      ],
      infoPagoAlumno: [
        {
          fechaPago: '',
          montoPago: 0,
          idAlumno: ''
        }
      ]
    };


    this.service.guardarOtrosCobros(newCobro).subscribe((response) => {
      this.store.dispatch(listarOtrosCobros());
      window.location.reload();
    });
  }
}

// angular import
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

import '../../../assets/charts/amchart/amcharts.js';
import '../../../assets/charts/amchart/gauge.js';
import '../../../assets/charts/amchart/serial.js';
import '../../../assets/charts/amchart/light.js';
import '../../../assets/charts/amchart/pie.min.js';
import '../../../assets/charts/amchart/ammap.min.js';
import '../../../assets/charts/amchart/usaLow.js';
import '../../../assets/charts/amchart/radar.js';
import '../../../assets/charts/amchart/worldLow.js';
import { AppState } from '../../store/indexReducer/indexReducer';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { SpinnerServiceService } from '../../theme/shared/service/spinner-service.service';
import { InfoProfesoresComponent } from '../info-profesores/info-profesores.component';
import { DetalleGastoDashboardComponent } from '../detalle-gasto-dashboard/detalle-gasto-dashboard.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, SharedModule, DetalleGastoDashboardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  listaAlumnos: any = [];
  listaOtrosCobros: any = [];
  porcentajePagado: number = 0;
  montoPagado: number = 0;
  montoTotal : number = 0;

  constructor(
    private store: Store<AppState>,
    private spinner: SpinnerServiceService
  ) {}

  // life cycle event
  ngOnInit() {
    this.spinner.funcionalidadSpinner(false);
    combineLatest([this.store.select('otrosCobros'), this.store.select('listarAlumnos')]).subscribe(([otrosCobros, alumnosRegistrados]) => {
      if (otrosCobros['otrosCobros'] != null || otrosCobros['otrosCobros'] != undefined) {
        this.listaOtrosCobros = otrosCobros['otrosCobros'];
      }
      if (alumnosRegistrados.length > 0) {
        this.cantidadDealumnosPago();
        this.listaAlumnos = alumnosRegistrados;
        this.cantidadDealumnosPago();
      }
    });
  }

  cantidadDealumnosPago() {
    const cantidadAlumnos = this.listaAlumnos.length;
    const cantidadDePagosARealizar = cantidadAlumnos * 10;
    let mesesPagados = 0;
    this.listaAlumnos.forEach((alumno) => {
      if (alumno.mesesPago.length > 0) {
        mesesPagados = mesesPagados + alumno.mesesPago.length;
      }
    });
    this.montoPagado = mesesPagados * 5000;
    this.porcentajePagado = Math.round((mesesPagados * 100) / cantidadDePagosARealizar);

    this.sales = [
      {
        title: 'Monto Total Mensualidad',
        icon: 'icon-arrow-up text-c-green',
        amount: '$'.concat(String(this.montoPagado)),
        percentage: String(this.porcentajePagado).concat('%'),
        progress: this.porcentajePagado,
        design: 'col-md-6',
        progress_bg: 'progress-c-theme'
      }
      // {
      //   title: 'Pago Mensualidad Completa',
      //   icon: 'icon-arrow-up text-c-green',
      //   amount: '$249.95',
      //   percentage: '10%',
      //   progress: 10,
      //   design: 'col-md-6',
      //   progress_bg: 'progress-c-theme'
      // }
    ];
  }
  // public method
  sales = [
    {
      title: 'Monto Total Mensualidad',
      icon: 'icon-arrow-up text-c-green',
      amount: '$'.concat(String(this.montoPagado)),
      percentage: String(this.porcentajePagado).concat('%'),
      progress: this.porcentajePagado,
      design: 'col-md-6',
      progress_bg: 'progress-c-theme'
    }
    // {
    //   title: 'Pago Mensualidad Completa',
    //   icon: 'icon-arrow-up text-c-green',
    //   amount: '$249.95',
    //   percentage: '10%',
    //   progress: 10,
    //   design: 'col-md-6',
    //   progress_bg: 'progress-c-theme'
    // }
  ];

  hayPago(alumnoId: number, pagos: any[]): boolean {
    if (!pagos) {
      return false;
    }
    return pagos.some((pago) => pago.idAlumno === alumnoId);
  }

  totalGastos(otrosCobros: any, id) {
    let montoGastoTotal: number = 0;

    otrosCobros.infoGasto.forEach((infoGasto) => {
      montoGastoTotal = montoGastoTotal + infoGasto.totalGasto;
    });
    this.montoTotal = montoGastoTotal;
    return montoGastoTotal;
  }

  montoFinal(otrosCobros: any, montoTotalRecaudado: number) {
    return montoTotalRecaudado - this.montoTotal;
  }
}

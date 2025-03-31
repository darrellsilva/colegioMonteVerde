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
import { listarAlumnos } from '../../store/action/totalActions';
import { combineLatest } from 'rxjs';
import { alumnosPago } from '../../store/state/totalState';
import { SpinnerServiceService } from '../../theme/shared/service/spinner-service.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  listaAlumnos: any = [];
  listaOtrosCobros: any = [];

  constructor(private store: Store<AppState>, private spinner: SpinnerServiceService) {
  }

  // life cycle event
  ngOnInit() {
    this.spinner.funcionalidadSpinner(false)
    combineLatest([
      this.store.select('otrosCobros'),
      this.store.select('listarAlumnos')
    ]).subscribe(([otrosCobros, alumnosRegistrados]) => {
      if (otrosCobros['otrosCobros'] != null || otrosCobros['otrosCobros'] != undefined) {
        this.listaOtrosCobros = otrosCobros['otrosCobros'];
        console.log('otros cobros', this.listaOtrosCobros);
      }
      if (alumnosRegistrados.length > 0) {
        console.log('alumnos registrados', alumnosRegistrados);
        this.listaAlumnos = alumnosRegistrados;
      }

    });

  }

  // public method
  sales = [
    {
      title: 'Monto Total Mensualidad',
      icon: 'icon-arrow-up text-c-green',
      amount: '$250.000',
      percentage: '20%',
      progress: 20,
      design: 'col-md-6',
      progress_bg: 'progress-c-theme'
    },
    {
      title: 'Pago Mensualidad Completa',
      icon: 'icon-arrow-up text-c-green',
      amount: '$249.95',
      percentage: '10%',
      progress: 10,
      design: 'col-md-6',
      progress_bg: 'progress-c-theme'
    }
  ];
}

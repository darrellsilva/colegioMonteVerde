import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/indexReducer/indexReducer';
import { otrosIngresos } from '../../store/state/totalState';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { guardarOtrosIngresos, listarOtrosIngresos } from '../../store/action/totalActions';
import { OtrosIngresosService } from '../../theme/shared/service/otros-ingresos.service';
import { SpinnerServiceService } from '../../theme/shared/service/spinner-service.service';

@Component({
  selector: 'app-otro-ingresos',
  imports: [ReactiveFormsModule],
  templateUrl: './otro-ingresos.component.html',
  styleUrl: './otro-ingresos.component.scss'
})
export class OtroIngresosComponent implements OnInit {
  listOtrosIngresos: otrosIngresos[] = [];
  formOtrosIngresos: FormGroup;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private otrosIngresos: OtrosIngresosService,
    private spinner: SpinnerServiceService
  ) {
    this.formOtrosIngresos = this.fb.group({
      descripcionIngreso: ['', Validators.required],
      montoIngreso: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.store.select('otrosIngresos').subscribe((otrosIngresos) => {
      if (otrosIngresos && otrosIngresos.length > 0) {
        this.listOtrosIngresos = otrosIngresos;
      }
    });
  }

  registraIngresoExtra() {
    this.spinner.funcionalidadSpinner(true);
    this.store.dispatch(guardarOtrosIngresos({ otrosIngresos: this.formOtrosIngresos.value }));
    this.otrosIngresos.guardarOtrosIngresos(this.formOtrosIngresos.value).subscribe((response) => {
      this.spinner.funcionalidadSpinner(false);
      this.formOtrosIngresos.reset();
    });
  }

  eliminarIngreso(id: string) {
    this.spinner.funcionalidadSpinner(true);
    this.otrosIngresos.eliminarIngreso(id).subscribe((response) => {
      this.spinner.funcionalidadSpinner(false);
      this.store.dispatch(listarOtrosIngresos());
    });
  }
}

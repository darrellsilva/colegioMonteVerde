import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/indexReducer/indexReducer';
import { otrosIngresos } from '../../store/state/totalState';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { guardarOtrosIngresos } from '../../store/action/totalActions';

@Component({
  selector: 'app-otro-ingresos',
  imports: [ReactiveFormsModule],
  templateUrl: './otro-ingresos.component.html',
  styleUrl: './otro-ingresos.component.scss'
})
export class OtroIngresosComponent implements OnInit {
  listOtrosIngresos: otrosIngresos[] = [];
  formOtrosIngresos: FormGroup;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.formOtrosIngresos = this.fb.group({
      descripcionIngreso: ['', Validators.required],
      montoIngreso: ['', Validators.required],
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
    this.store.dispatch(guardarOtrosIngresos({ otrosIngresos: this.formOtrosIngresos.value}))
  }
}

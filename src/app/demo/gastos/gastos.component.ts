import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store/indexReducer/indexReducer';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { guardarGasto } from '../../store/action/totalActions';

@Component({
  selector: 'app-gastos',
  imports: [ReactiveFormsModule],
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.scss'
})
export class GastosComponent implements OnInit {
  listGastoAdicional: FormGroup;
  listGastos;
  any = [];
  base64Image: string | ArrayBuffer | null = null;
  idSeleccionado: string = '';

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.listGastoAdicional = fb.group({
      detalleGasto: ['', Validators.required],
      montoGasto: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.store.select('otrosCobros').subscribe((otrosCobros) => {
      console.log('otrosCobros', otrosCobros['otrosCobros']);
      this.listGastos = otrosCobros['otrosCobros'];
    });
  }

  guardarGasto(id) {
    this.idSeleccionado = id;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.base64Image = e.target?.result;
        console.log(this.base64Image); // Aquí puedes manejar la imagen en base64
      };
      reader.readAsDataURL(file);
    }
  }

  guardarGastoConFoto() {

    const newGasto = {
      id: this.idSeleccionado,
      fechaGasto:  new Date().toLocaleDateString('es-ES'),
      detalleGasto: this.listGastoAdicional.get('detalleGasto')?.value,
      montoGasto: this.listGastoAdicional.get('montoGasto')?.value,
      foto: this.base64Image,
    }


    this.store.dispatch(guardarGasto({ gasto: newGasto }));
    console.log('Gastos guardado', newGasto);

  }
}

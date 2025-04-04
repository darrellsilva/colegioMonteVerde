import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store/indexReducer/indexReducer';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { activarSpinner, deleteGasto, guardarGasto } from '../../store/action/totalActions';

declare var bootstrap: any;

@Component({
  selector: 'app-gastos',
  imports: [ReactiveFormsModule],
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.scss'
})
export class GastosComponent implements OnInit {
  listGastoAdicional: FormGroup;
  private currentModal: any;
  listGastos;
  any = [];
  base64Image: string | ArrayBuffer | null = null;
  idSeleccionado: string = '';
  imgBoleta: string = '';

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.listGastoAdicional = fb.group({
      detalleGasto: ['', Validators.required],
      montoGasto: ['', Validators.required]
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
    this.store.dispatch(activarSpinner({ spinner: true }));

    const newGasto = {
      fechaGasto: new Date().toLocaleDateString('es-ES'),
      detalleGasto: this.listGastoAdicional.get('detalleGasto')?.value,
      montoGasto: this.listGastoAdicional.get('montoGasto')?.value,
      foto: this.base64Image
    };

    this.store.dispatch(guardarGasto({ gasto: newGasto, id: this.idSeleccionado }));
    console.log('Gastos guardado', newGasto);
  }

  openImg(modalId, imgBoleta: any) {
    if (this.currentModal) {
      this.currentModal.hide();
    }
    if (imgBoleta === undefined) {
      alert('Registro no presenta imagen');
    } else {
      const modalElement = document.getElementById(modalId);
      this.currentModal = new bootstrap.Modal(modalElement);
      this.currentModal.show();
      this.imgBoleta = imgBoleta;
    }
  }

  deleteGasto(idGasto: any, descripcionGasto: any) {
    const registerGasto = {
      infoGasto: []
    };

    const confirmDelete = confirm(`¿Está seguro de eliminar el gasto "${descripcionGasto}"?`);
    if (confirmDelete) {
      const gasto = this.listGastos.filter((gasto) => gasto.id === idGasto);
      registerGasto.infoGasto = gasto[0].infoGasto.filter((gastoRegister) => gastoRegister.descripcionGasto !== descripcionGasto);

      this.store.dispatch(deleteGasto({ gasto: registerGasto, id: idGasto }));
      console.log('Gastos eliminado', descripcionGasto);
    }
  }
}

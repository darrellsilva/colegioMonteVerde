import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store/indexReducer/indexReducer';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { activarSpinner, deleteGasto, guardadoConExito, guardarGasto } from '../../store/action/totalActions';

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
  private currentModalGasto: any;
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
      montoGasto: ['', Validators.required],
      img: ['']
    });
  }

  ngOnInit(): void {
    this.store.select('otrosCobros').subscribe((otrosCobros) => {
      console.log('otrosCobros', otrosCobros['otrosCobros']);
      this.listGastos = otrosCobros['otrosCobros'];
    });
  }

  guardarGasto(id, idGasto) {
    this.store.select('guardadoConExito').subscribe((res) => {
      console.log('redux guardado',res)
      if (res.guardado){
        this.base64Image = '';
        this.listGastoAdicional.reset();
        this.currentModalGasto.hide();
        this.store.dispatch(guardadoConExito({ guardado: false }));
      }
    })


    const modalElement = document.getElementById(id);
    this.currentModalGasto = new bootstrap.Modal(modalElement);
    this.currentModalGasto.show();
    this.idSeleccionado = idGasto;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Set the desired resolution
          const MAX_WIDTH = 300;
          const MAX_HEIGHT = 300;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          this.base64Image = canvas.toDataURL('image/png');
          console.log(this.base64Image); // Here you can handle the base64 image
        };
        img.src = e.target?.result as string;
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

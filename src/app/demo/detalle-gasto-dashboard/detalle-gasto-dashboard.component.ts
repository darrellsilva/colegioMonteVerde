import { Component, Input, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/indexReducer/indexReducer';
import { Store } from '@ngrx/store';
declare var bootstrap: any;
@Component({
  selector: 'app-detalle-gasto-dashboard',
  imports: [],
  templateUrl: './detalle-gasto-dashboard.component.html',
  styleUrl: './detalle-gasto-dashboard.component.scss'
})
export class DetalleGastoDashboardComponent implements OnInit {
  @Input() data: any[];
  gastos: any = [];
  private currentModal: any;
  imgBoleta: string = '';


  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    console.log(this.data);
    this.gastos = this.data
  }

  openImg(modalId, imgBoleta: string) {
    const byteCharacters = atob(imgBoleta.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');

    // if (this.currentModal) {
    //   this.currentModal.hide();
    // }
    // if (imgBoleta === undefined) {
    //   alert('Registro no presenta imagen');
    // } else {
    //   const modalElement = document.getElementById(modalId);
    //   this.currentModal = new bootstrap.Modal(modalElement);
    //   this.currentModal.show();
    //   this.imgBoleta = imgBoleta;
    // }
  }
}

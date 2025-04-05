import { Component, Input, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/indexReducer/indexReducer';
import { Store } from '@ngrx/store';
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

  openImg(imgBoleta: string) {
    window.open(imgBoleta, '_blank');

  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/indexReducer/indexReducer';

@Component({
  selector: 'app-spinner-monte-verde',
  imports: [],
  templateUrl: './spinner-monte-verde.component.html',
  styleUrl: './spinner-monte-verde.component.scss'
})
export class SpinnerMonteVerdeComponent implements OnInit{

  spinnerActivated: boolean = false;

  constructor(private store: Store<AppState>) {
  }


  ngOnInit(): void {
    this.store.select('spinner').subscribe(spinner =>{
      this.spinnerActivated = spinner.spinner;
    })
  }

}

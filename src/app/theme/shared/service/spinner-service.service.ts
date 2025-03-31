import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/indexReducer/indexReducer';
import { activarSpinner } from '../../../store/action/totalActions';

@Injectable({
  providedIn: 'root'
})
export class SpinnerServiceService {

  constructor(private store: Store<AppState>) { }

  funcionalidadSpinner(estado: boolean){
    this.store.dispatch(activarSpinner({spinner: estado}));
  }
}

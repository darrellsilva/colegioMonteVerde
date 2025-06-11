import {Action, createReducer, on} from '@ngrx/store';
import { gastosGenerales,  } from '../state/totalState';
import {
  listarGastosGeneralesSucces
} from '../action/totalActions';

const initialProductState: gastosGenerales[] = [];

const GastoGeneralReducer = createReducer(initialProductState,
  on(listarGastosGeneralesSucces,  (state, {gastosGenerales}) => {
    console.log('Gastos generales', gastosGenerales);
    return [...gastosGenerales];
  })
);

export function gastoGeneralReducer(state: gastosGenerales[] | undefined, action: Action) {
  return GastoGeneralReducer(state, action);
}

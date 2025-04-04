import {Action, createReducer, on} from '@ngrx/store';
import { correoInstitucional, guardadoExitoso, spinner } from '../state/totalState';
import { activarSpinner, correoInstitucionalActions, guardadoConExito } from '../action/totalActions';

const initialProductState: guardadoExitoso = {
  guardado: false
};

const GuardadoExitosoReducer = createReducer(initialProductState,
  on(guardadoConExito,  (state, {guardado}) => {
    return { ...state, guardado: guardado };
  })
);

export function guardadoExitosoReducer(state: guardadoExitoso | undefined, action: Action) {
  return GuardadoExitosoReducer(state, action);
}

import {Action, createReducer, on} from '@ngrx/store';
import { correoInstitucional } from '../state/totalState';
import { correoInstitucionalActions } from '../action/totalActions';

const initialProductState: correoInstitucional = {
  correoInstitucional: ''
};

const CorreoInstitucionalReducer = createReducer(initialProductState,
  on(correoInstitucionalActions,  (state, {correo}) => {
    console.log('Correo Institucional', correo)
    return { ...state, correoInstitucional: correo };
  })
);

export function correoInstitucionalReducer(state: correoInstitucional | undefined, action: Action) {
  return CorreoInstitucionalReducer(state, action);
}

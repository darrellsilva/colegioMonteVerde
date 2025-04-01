import {Action, createReducer, on} from '@ngrx/store';
import { otrosCobro } from '../state/totalState';
import {  listarOtrosCobrosSucces } from '../action/totalActions';

const initialProductState: otrosCobro[] = [];

const OtrosCobrosReducer = createReducer(initialProductState,
  on(listarOtrosCobrosSucces,  (state, {otrosCobros}) => {
    return {...state, otrosCobros: otrosCobros};
  })
);

export function otrosCobrosReducer(state: otrosCobro[] | undefined, action: Action) {
  return OtrosCobrosReducer(state, action);
}

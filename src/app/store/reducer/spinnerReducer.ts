import {Action, createReducer, on} from '@ngrx/store';
import { correoInstitucional, spinner } from '../state/totalState';
import { activarSpinner, correoInstitucionalActions } from '../action/totalActions';

const initialProductState: spinner = {
  spinner: false
};

const SpinnerReducer = createReducer(initialProductState,
  on(activarSpinner,  (state, {spinner}) => {
    console.log('Spinner Reducer', spinner)
    return { ...state, spinner: spinner };
  })
);

export function spinnerReducer(state: spinner | undefined, action: Action) {
  return SpinnerReducer(state, action);
}

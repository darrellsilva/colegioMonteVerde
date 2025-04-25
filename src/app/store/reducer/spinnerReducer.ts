import {Action, createReducer, on} from '@ngrx/store';
import {  spinner } from '../state/totalState';
import { activarSpinner } from '../action/totalActions';

const initialProductState: spinner = {
  spinner: false
};

const SpinnerReducer = createReducer(initialProductState,
  on(activarSpinner,  (state, {spinner}) => {
    return { ...state, spinner: spinner };
  })
);

export function spinnerReducer(state: spinner | undefined, action: Action) {
  return SpinnerReducer(state, action);
}

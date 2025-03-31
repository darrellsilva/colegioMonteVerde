import {Action, createReducer, on} from '@ngrx/store';
import { infoApoderado } from '../state/totalState';
import { infoApoderadosSuccess } from '../action/totalActions';

const initialProductState: infoApoderado[] = [];

const InfoApoderadoReducer = createReducer(initialProductState,
  on(infoApoderadosSuccess,  (state, {infoApoderado}) => {
    console.log('Apoderado reducer', infoApoderado)
    return [...state, ...infoApoderado];
  })
);

export function infoApoderadoReducer(state: infoApoderado[] | undefined, action: Action) {
  return InfoApoderadoReducer(state, action);
}

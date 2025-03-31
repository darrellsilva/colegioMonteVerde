import {
  alumnos, infoApoderado, otrosCobro
} from '../state/totalState';
import {ActionReducerMap} from "@ngrx/store";
import { alumnosReducer } from '../reducer/alumnosReducer';
import { otrosCobrosReducer } from '../reducer/otrosCobrosReducer';
import { infoApoderadoReducer } from '../reducer/infoApoderadosReducer';

export interface AppState {
  listarAlumnos: alumnos[]
  otrosCobros: otrosCobro[]
  infoApoderado: infoApoderado[]
}

export const appReducers: ActionReducerMap<AppState> = {
  listarAlumnos: alumnosReducer,
  otrosCobros: otrosCobrosReducer,
  infoApoderado: infoApoderadoReducer
};


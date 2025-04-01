import {
  alumnos, correoInstitucional, infoApoderado, otrosCobro, spinner
} from '../state/totalState';
import {ActionReducerMap} from "@ngrx/store";
import { alumnosReducer } from '../reducer/alumnosReducer';
import { otrosCobrosReducer } from '../reducer/otrosCobrosReducer';
import { infoApoderadoReducer } from '../reducer/infoApoderadosReducer';
import { correoInstitucionalReducer } from '../reducer/correoInstitucionalReducer';
import { spinnerReducer } from '../reducer/spinnerReducer';

export interface AppState {
  listarAlumnos: alumnos[]
  otrosCobros: otrosCobro[]
  infoApoderado: infoApoderado[]
  correoInsitucional: correoInstitucional
  spinner: spinner
}

export const appReducers: ActionReducerMap<AppState> = {
  listarAlumnos: alumnosReducer,
  otrosCobros: otrosCobrosReducer,
  infoApoderado: infoApoderadoReducer,
  correoInsitucional: correoInstitucionalReducer,
  spinner: spinnerReducer
};


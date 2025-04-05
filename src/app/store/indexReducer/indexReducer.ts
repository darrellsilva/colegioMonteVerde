import {
  alumnos, correoInstitucional, guardadoExitoso, infoApoderado, otrosCobro, spinner
} from '../state/totalState';
import {ActionReducerMap} from "@ngrx/store";
import { alumnosReducer } from '../reducer/alumnosReducer';
import { otrosCobrosReducer } from '../reducer/otrosCobrosReducer';
import { infoApoderadoReducer } from '../reducer/infoApoderadosReducer';
import { correoInstitucionalReducer } from '../reducer/correoInstitucionalReducer';
import { spinnerReducer } from '../reducer/spinnerReducer';
import { guardadoExitosoReducer } from '../reducer/guardadoExitosoReducer';

export interface AppState {
  listarAlumnos: alumnos[]
  otrosCobros: otrosCobro[]
  infoApoderado: infoApoderado[]
  correoInsitucional: correoInstitucional
  spinner: spinner
  guardadoConExito: guardadoExitoso
}

export const appReducers: ActionReducerMap<AppState> = {
  listarAlumnos: alumnosReducer,
  otrosCobros: otrosCobrosReducer,
  infoApoderado: infoApoderadoReducer,
  correoInsitucional: correoInstitucionalReducer,
  spinner: spinnerReducer,
  guardadoConExito: guardadoExitosoReducer
};


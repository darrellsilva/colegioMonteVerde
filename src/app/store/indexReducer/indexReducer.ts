import {
  alumnos, correoInstitucional, guardadoExitoso, infoApoderado, otrosCobro, otrosIngresos, spinner
} from '../state/totalState';
import {ActionReducerMap} from "@ngrx/store";
import { alumnosReducer } from '../reducer/alumnosReducer';
import { otrosCobrosReducer } from '../reducer/otrosCobrosReducer';
import { infoApoderadoReducer } from '../reducer/infoApoderadosReducer';
import { correoInstitucionalReducer } from '../reducer/correoInstitucionalReducer';
import { spinnerReducer } from '../reducer/spinnerReducer';
import { guardadoExitosoReducer } from '../reducer/guardadoExitosoReducer';
import { otrosIngresosReducer } from '../reducer/otrosIngresosReducer';

export interface AppState {
  listarAlumnos: alumnos[]
  otrosCobros: otrosCobro[]
  infoApoderado: infoApoderado[]
  correoInsitucional: correoInstitucional
  spinner: spinner
  guardadoConExito: guardadoExitoso
  otrosIngresos: otrosIngresos[]
}

export const appReducers: ActionReducerMap<AppState> = {
  listarAlumnos: alumnosReducer,
  otrosCobros: otrosCobrosReducer,
  infoApoderado: infoApoderadoReducer,
  correoInsitucional: correoInstitucionalReducer,
  spinner: spinnerReducer,
  guardadoConExito: guardadoExitosoReducer,
  otrosIngresos: otrosIngresosReducer
};


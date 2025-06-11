import {
  alumnos,
  correoInstitucional,
  gastosGenerales,
  guardadoExitoso,
  infoApoderado,
  otrosCobro,
  otrosIngresos,
  spinner,
  ventasCursos
} from '../state/totalState';
import {ActionReducerMap} from "@ngrx/store";
import { alumnosReducer } from '../reducer/alumnosReducer';
import { otrosCobrosReducer } from '../reducer/otrosCobrosReducer';
import { infoApoderadoReducer } from '../reducer/infoApoderadosReducer';
import { correoInstitucionalReducer } from '../reducer/correoInstitucionalReducer';
import { spinnerReducer } from '../reducer/spinnerReducer';
import { guardadoExitosoReducer } from '../reducer/guardadoExitosoReducer';
import { otrosIngresosReducer } from '../reducer/otrosIngresosReducer';
import { ventasCursoReducer } from '../reducer/ventasCursoReducer';
import { gastoGeneralReducer } from '../reducer/gastosGeneralesReducer';

export interface AppState {
  listarAlumnos: alumnos[]
  otrosCobros: otrosCobro[]
  infoApoderado: infoApoderado[]
  correoInsitucional: correoInstitucional
  spinner: spinner
  guardadoConExito: guardadoExitoso
  otrosIngresos: otrosIngresos[]
  ventasCurso: ventasCursos[],
  gastosGenerales: gastosGenerales[]
}

export const appReducers: ActionReducerMap<AppState> = {
  listarAlumnos: alumnosReducer,
  otrosCobros: otrosCobrosReducer,
  infoApoderado: infoApoderadoReducer,
  correoInsitucional: correoInstitucionalReducer,
  spinner: spinnerReducer,
  guardadoConExito: guardadoExitosoReducer,
  otrosIngresos: otrosIngresosReducer,
  ventasCurso: ventasCursoReducer,
  gastosGenerales: gastoGeneralReducer
};


import {Action, createReducer, on} from '@ngrx/store';
import { alumnos } from '../state/totalState';
import { addAlumno, listarAlumnosSucces } from '../action/totalActions';

const initialProductState: alumnos[] = [];

const AlumnosReducer = createReducer(initialProductState,
  on(listarAlumnosSucces,  (state, {alumnos}) => {
    console.log("Alumnos reducer", alumnos);
    return [...state, ...alumnos];
  }),
  on(addAlumno,  (state, {alumno}) => {
 return [...state, alumno];
  })
);

export function alumnosReducer(state: alumnos[] | undefined, action: Action) {
  return AlumnosReducer(state, action);
}

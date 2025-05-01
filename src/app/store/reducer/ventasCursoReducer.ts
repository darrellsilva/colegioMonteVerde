import {Action, createReducer, on} from '@ngrx/store';
import {ventasCursos } from '../state/totalState';
import {
  listarVentasCursoSucces
} from '../action/totalActions';

const initialProductState: ventasCursos[] = [];

const VentaCursoReducer = createReducer(initialProductState,
  on(listarVentasCursoSucces,  (state, {ventasCurso}) => {
    console.log('Otros Ingresos', ventasCurso);
    return [...ventasCurso];
  })
);

export function ventasCursoReducer(state: ventasCursos[] | undefined, action: Action) {
  return VentaCursoReducer(state, action);
}

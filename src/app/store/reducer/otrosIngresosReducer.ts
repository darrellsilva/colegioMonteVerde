import {Action, createReducer, on} from '@ngrx/store';
import { otrosCobro, otrosIngresos } from '../state/totalState';
import { guardarOtrosIngresos, listarOtrosCobrosSucces, listarOtrosIngresosSucces } from '../action/totalActions';

const initialProductState: otrosIngresos[] = [];

const OtrosIngresosReducer = createReducer(initialProductState,
  on(listarOtrosIngresosSucces,  (state, {otrosIngresos}) => {
    console.log('Otros Ingresos', otrosIngresos);
    return [...otrosIngresos];
  }),
  on(guardarOtrosIngresos,  (state, {otrosIngresos}) => {
    console.log('Otros Ingresos', otrosIngresos);
    const nuevoRegistro = {
      id: '',
      descripcionIngreso: otrosIngresos.descripcionIngreso,
      montoIngreso: otrosIngresos.montoIngreso
    }
    return [...state, nuevoRegistro];
  })
);

export function otrosIngresosReducer(state: otrosIngresos[] | undefined, action: Action) {
  return OtrosIngresosReducer(state, action);
}

import { createAction, props } from '@ngrx/store';
import { alumnos, otrosCobro } from '../state/totalState';

// LISTAR ALUMNOS
export const listarAlumnos = createAction('[ALUMNOS] Listar Alumnos');
export const listarAlumnosSucces = createAction('[PRODUCTOS] Listar Productos Succes', props<{alumnos: alumnos[]}>());
export const listarAlumnosFail = createAction('[PRODUCTOS] Listar Productos Fail', props<{error: string}>());
export const addAlumno = createAction('[ALUMNOS] Agregar Alumno', props<{alumno: any}>());

// OTROS COBROS
export const listarOtrosCobros = createAction('[OTROS COBROS] Listar Otros Cobros');
export const listarOtrosCobrosSucces = createAction('[OTROS COBROS] Listar Otros Cobros Succes', props<{otrosCobros: otrosCobro[]}>());
export const listarOtrosCobrosFail = createAction('[OTROS COBROS] Listar Otros Cobros Fail', props<{error: string}>());

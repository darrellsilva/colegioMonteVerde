import { createAction, props } from '@ngrx/store';
import { alumnos, correoInstitucional, infoApoderado, otrosCobro } from '../state/totalState';

// LISTAR ALUMNOS
export const listarAlumnos = createAction('[ALUMNOS] Listar Alumnos');
export const listarAlumnosSucces = createAction('[PRODUCTOS] Listar Productos Succes', props<{alumnos: alumnos[]}>());
export const listarAlumnosFail = createAction('[PRODUCTOS] Listar Productos Fail', props<{error: string}>());
export const addAlumno = createAction('[ALUMNOS] Agregar Alumno', props<{alumno: any}>());

// OTROS COBROS
export const listarOtrosCobros = createAction('[OTROS COBROS] Listar Otros Cobros');
export const listarOtrosCobrosSucces = createAction('[OTROS COBROS] Listar Otros Cobros Succes', props<{otrosCobros: otrosCobro[]}>());
export const listarOtrosCobrosFail = createAction('[OTROS COBROS] Listar Otros Cobros Fail', props<{error: string}>());

// INFORMACION APODERADOS
export const infoApoderadoActions = createAction('[INFO APODERADO] Informacion Apoderado');
export const infoApoderadosSuccess = createAction('[INFO APODERADO] Informacion Apoderado Success', props<{infoApoderado: infoApoderado[]}>());
export const infoApoderadosFail = createAction('[INFO APODERADO] Informacion Apoderado Fail', props<{error: string}>());

// CORREO INSTITUCIONAL
export const correoInstitucionalActions = createAction('[CORREO INSTITUCIONAL] Correo Institucional', props<{correo: string}>());

// ACTIVACION SPINNER
export const activarSpinner = createAction('[SPINNER] Activar Spinner', props<{spinner: boolean}>());

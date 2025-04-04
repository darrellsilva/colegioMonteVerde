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
export const modificarOtrosCobros = createAction('[OTROS COBROS] Modificar Otros Cobros', props<{otrosCobros: any}>());

// INFORMACION APODERADOS
export const infoApoderadoActions = createAction('[INFO APODERADO] Informacion Apoderado');
export const infoApoderadosSuccess = createAction('[INFO APODERADO] Informacion Apoderado Success', props<{infoApoderado: infoApoderado[]}>());
export const infoApoderadosFail = createAction('[INFO APODERADO] Informacion Apoderado Fail', props<{error: string}>());

// CORREO INSTITUCIONAL
export const correoInstitucionalActions = createAction('[CORREO INSTITUCIONAL] Correo Institucional', props<{correo: string}>());

// ACTIVACION SPINNER
export const activarSpinner = createAction('[SPINNER] Activar Spinner', props<{spinner: boolean}>());


// GUARDAR GASTO
export const guardarGasto = createAction('[GASTO] Guardar Gasto', props<{gasto: any, id: any}>());
export const deleteGasto = createAction('[GASTO] Delete gastos', props<{gasto: any, id: any}>());
export const guardadoConExito = createAction('[GASTO] Guardado con exito', props<{guardado: boolean}>());

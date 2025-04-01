import {Injectable} from "@angular/core";
import {catchError, map, mergeMap, of} from "rxjs";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  listarOtrosCobros,
  listarOtrosCobrosFail,
  listarOtrosCobrosSucces, modificarOtrosCobros
} from '../action/totalActions';
import { AlumnosService } from '../../theme/shared/service/alumnos.service';
import { Store } from '@ngrx/store';
import { AppState } from '../indexReducer/indexReducer';

@Injectable()
export class OtrosCobrosEffects {
  loadOtrosCobros$;
  modificarOtrosCobros$;

  constructor(
    private actions$: Actions,
    private fireStoreService: AlumnosService,
    private store: Store<AppState>,
  ) {

    // LISTAR CATEGORIAS
    this.loadOtrosCobros$ = createEffect(() =>
      this.actions$.pipe(
        ofType(listarOtrosCobros),
        mergeMap(action => {
          return this.fireStoreService.listarOtrosCobros().pipe(
            map((otrosCobros) => {
              otrosCobros.forEach((otrosCobro) => {
                const cantidadPago = otrosCobro.infoPagoAlumno.length;
                const camposModificar = {
                  id: otrosCobro.id,
                  cantidadAlumnosPago: cantidadPago,
                  montoTotalRecaudado: otrosCobro.montoCobrar * cantidadPago
                };
                this.store.dispatch(modificarOtrosCobros({otrosCobros: camposModificar}));
              })
              return listarOtrosCobrosSucces({otrosCobros: otrosCobros});
            }),
            catchError((error) => {
              console.error('Error occurred:', error);
              return of(listarOtrosCobrosFail({error}));
            })
          );
        })
      )
    );

// GUARDADO DE CAMPOS MODIFICADOS
    this.modificarOtrosCobros$ = createEffect(() =>
        this.actions$.pipe(
          ofType(modificarOtrosCobros),
          mergeMap(action =>
            this.fireStoreService.editarCobros(action.otrosCobros).pipe(
              map(() => void 0),
              catchError((error) => {
                console.error('Error occurred:', error);
                return of(listarOtrosCobrosFail({error}));
              })
            )
          )
        ),
      {dispatch: false}
    );

  }

}

import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  listarOtrosCobrosFail,
  listarOtrosCobrosSucces, listarOtrosIngresos, listarOtrosIngresosFail, listarOtrosIngresosSucces
} from '../action/totalActions';
import { AlumnosService } from '../../theme/shared/service/alumnos.service';
import { Store } from '@ngrx/store';
import { AppState } from '../indexReducer/indexReducer';
import { OtrosIngresosService } from '../../theme/shared/service/otros-ingresos.service';
@Injectable()
export class OtrosIngresosEffects {
  loadOtrosIngresos$;

  constructor(
    private actions$: Actions,
    private fireStoreService: OtrosIngresosService,
    private store: Store<AppState>,
  ) {
    // LISTAR CATEGORIAS
    this.loadOtrosIngresos$ = createEffect(() =>
      this.actions$.pipe(
        ofType(listarOtrosIngresos),
        mergeMap((action) => {
          return this.fireStoreService.listarOtrosIngresos().pipe(
            map((otrosIngresos) => {

              return listarOtrosIngresosSucces({ otrosIngresos: otrosIngresos });
            }),
            catchError((error) => {
              console.error('Error occurred:', error);
              return of(listarOtrosIngresosFail({ error }));
            })
          );
        })
      )
    );
  }
}

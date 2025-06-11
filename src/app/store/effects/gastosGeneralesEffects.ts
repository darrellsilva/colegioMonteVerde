import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {listarGastosGenerales, listarGastosGeneralesFail, listarGastosGeneralesSucces,
} from '../action/totalActions';
import { Store } from '@ngrx/store';
import { AppState } from '../indexReducer/indexReducer';
import { SaveGastoGeneralService } from '../../theme/shared/service/save-gasto-general.service';

@Injectable()
export class GastosGeneralesEffects {
  loadOtrosCobros$;
  otrosCobros: any = [];

  constructor(
    private actions$: Actions,
    private fireStoreService: SaveGastoGeneralService,
    private store: Store<AppState>
  ) {
    // LISTAR CATEGORIAS
    this.loadOtrosCobros$ = createEffect(() =>
      this.actions$.pipe(
        ofType(listarGastosGenerales),
        mergeMap((action) => {
          return this.fireStoreService.listarGastosGenerales().pipe(
            map((gastosGenerales) => {
              return listarGastosGeneralesSucces({ gastosGenerales: gastosGenerales });
            }),
            catchError((error) => {
              console.error('Error occurred:', error);
              return of(listarGastosGeneralesFail({ error }));
            })
          );
        })
      )
    );
  }
}

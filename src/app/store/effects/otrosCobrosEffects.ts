import {Injectable} from "@angular/core";
import {catchError, map, mergeMap, of} from "rxjs";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  listarOtrosCobros,
  listarOtrosCobrosFail,
  listarOtrosCobrosSucces
} from '../action/totalActions';
import { AlumnosService } from '../../theme/shared/service/alumnos.service';

@Injectable()
export class OtrosCobrosEffects {
  loadOtrosCobros$;

  constructor(
    private actions$: Actions,
    private fireStoreService: AlumnosService
  ) {

    // LISTAR CATEGORIAS
    this.loadOtrosCobros$ = createEffect(() =>
      this.actions$.pipe(
        ofType(listarOtrosCobros),
        mergeMap(action => {
          return this.fireStoreService.listarOtrosCobros().pipe(
            map((otrosCobros) => {
              console.log('Otros Cobros:', otrosCobros);
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

  }

}

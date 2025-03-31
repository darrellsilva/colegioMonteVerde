import {Injectable} from "@angular/core";
import {catchError, map, mergeMap, of} from "rxjs";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  infoApoderadoActions,
  infoApoderadosFail,
  infoApoderadosSuccess,
} from '../action/totalActions';
import { InfoApoderadoService } from '../../theme/shared/service/info-apoderado.service';

@Injectable()
export class infoApoderadosEffects {
  loadOtrosCobros$;

  constructor(
    private actions$: Actions,
    private fireStoreService: InfoApoderadoService
  ) {

    // LISTAR CATEGORIAS
    this.loadOtrosCobros$ = createEffect(() =>
      this.actions$.pipe(
        ofType(infoApoderadoActions),
        mergeMap(action => {
          return this.fireStoreService.listarInfoApoderado().pipe(
            map((infoApoderado) => {
              console.log('Informacion Apoderado:', infoApoderado);
              return infoApoderadosSuccess({infoApoderado: infoApoderado});
            }),
            catchError((error) => {
              console.error('Error occurred:', error);
              return of(infoApoderadosFail({error}));
            })
          );
        })
      )
    );

  }

}

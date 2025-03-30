import {Injectable} from "@angular/core";
import {catchError, map, mergeMap, of} from "rxjs";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { listarAlumnos, listarAlumnosFail, listarAlumnosSucces } from '../action/totalActions';
import { AlumnosService } from '../../theme/shared/service/alumnos.service';

@Injectable()
export class AlumnosEffects {
  loadCategorias$;

  constructor(
    private actions$: Actions,
    private fireStoreService: AlumnosService
  ) {

    // LISTAR CATEGORIAS
    this.loadCategorias$ = createEffect(() =>
      this.actions$.pipe(
        ofType(listarAlumnos),
        mergeMap(action => {
          return this.fireStoreService.listarAlumnos().pipe(
            map((alumnos) => {
              console.log('Alumnos:', alumnos);
              return listarAlumnosSucces({alumnos: alumnos});
            }),
            catchError((error) => {
              console.error('Error occurred:', error);
              return of(listarAlumnosFail({error}));
            })
          );
        })
      )
    );

  }

}

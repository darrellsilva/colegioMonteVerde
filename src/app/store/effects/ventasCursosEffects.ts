import {Injectable} from "@angular/core";
import {catchError, map, mergeMap, of} from "rxjs";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  listarVentasCurso, listarVentasCursoFail,
  listarVentasCursoSucces
} from '../action/totalActions';
import { VentasCursoService } from '../../theme/shared/service/ventas-curso.service';

@Injectable()
export class VentasCursosEffects {
  loadVentasCursos$;

  constructor(
    private actions$: Actions,
    private fireStoreService: VentasCursoService,
  ) {

    // LISTAR VENTAS CURSOS
    this.loadVentasCursos$ = createEffect(() =>
      this.actions$.pipe(
        ofType(listarVentasCurso),
        mergeMap(action => {
          return this.fireStoreService.listarVentasCursos().pipe(
            map((listVenta) => {
              return listarVentasCursoSucces({ventasCurso: listVenta});
            }),
            catchError((error) => {
              console.error('Error occurred:', error);
              return of(listarVentasCursoFail({error}));
            })
          );
        })
      )
    );

  }

}

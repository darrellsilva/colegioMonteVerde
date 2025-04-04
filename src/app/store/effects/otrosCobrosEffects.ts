import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, mergeMap, of, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  guardarGasto,
  listarOtrosCobros,
  listarOtrosCobrosFail,
  listarOtrosCobrosSucces,
  modificarOtrosCobros
} from '../action/totalActions';
import { AlumnosService } from '../../theme/shared/service/alumnos.service';
import { Store } from '@ngrx/store';
import { AppState } from '../indexReducer/indexReducer';

@Injectable()
export class OtrosCobrosEffects {
  loadOtrosCobros$;
  modificarOtrosCobros$;
  agregaGasto$;
  otrosCobros: any = []

  constructor(
    private actions$: Actions,
    private fireStoreService: AlumnosService,
    private store: Store<AppState>
  ) {
    // LISTAR CATEGORIAS
    this.loadOtrosCobros$ = createEffect(() =>
      this.actions$.pipe(
        ofType(listarOtrosCobros),
        mergeMap((action) => {
          return this.fireStoreService.listarOtrosCobros().pipe(
            map((otrosCobros) => {
              otrosCobros.forEach((otrosCobro) => {
                const cantidadPago = otrosCobro.infoPagoAlumno.length;
                const camposModificar = {
                  id: otrosCobro.id,
                  cantidadAlumnosPago: cantidadPago,
                  montoTotalRecaudado: otrosCobro.montoCobrar * cantidadPago
                };
                this.store.dispatch(modificarOtrosCobros({ otrosCobros: camposModificar }));
              });
              return listarOtrosCobrosSucces({ otrosCobros: otrosCobros });
            }),
            catchError((error) => {
              console.error('Error occurred:', error);
              return of(listarOtrosCobrosFail({ error }));
            })
          );
        })
      )
    );

    // GUARDADO DE CAMPOS MODIFICADOS
    this.modificarOtrosCobros$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(modificarOtrosCobros),
          mergeMap((action) =>
            this.fireStoreService.editarCobros(action.otrosCobros).pipe(
              map(() => void 0),
              catchError((error) => {
                console.error('Error occurred:', error);
                return of(listarOtrosCobrosFail({ error }));
              })
            )
          )
        ),
      { dispatch: false }
    );

    this.agregaGasto$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(guardarGasto), // Filtrar la acción específica
          tap((action) => {
            // Ejecutar la lógica que no retorna un Observable
            this.executeSomeLogic(action);
          })
        ),
      { dispatch: false }
    );
  }

  private executeSomeLogic(action: any) {
    console.log('Esta llegando aqui', action)
    this.store.select('otrosCobros').subscribe(otrosCobros => {
      this.otrosCobros = otrosCobros;
    })

    const filterCobros = this.otrosCobros['otrosCobros'].filter(otrosCobro => otrosCobro.id === action.gasto.id);
    const newGasto = {
      infoGasto : []
    }

    filterCobros[0].infoGasto.forEach(gasto => {
      newGasto.infoGasto.push(gasto);
    })

      const dataNueva = {
        descripcionGasto: action.gasto.detalleGasto,
        fechaGasto: action.gasto.fechaGasto,
        totalGasto: Number( action.gasto.montoGasto),
        imgBoleta: action.gasto.foto
      }

      newGasto.infoGasto.push(dataNueva);

    console.log('data agregada', newGasto);




  }
}

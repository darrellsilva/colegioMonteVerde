// Angular import
import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

// project import
import { SpinnerComponent } from './theme/shared/components/spinner/spinner.component';
import { FirebaseService } from './theme/shared/service/firebase.service';
import { Store } from '@ngrx/store';
import { AppState } from './store/indexReducer/indexReducer';
import {
  correoInstitucionalActions,
  infoApoderadoActions,
  listarAlumnos,
  listarOtrosCobros
} from './store/action/totalActions';
import { Subscription } from 'rxjs';
import { LoginService } from './theme/shared/service/login.service';
import { SpinnerMonteVerdeComponent } from './demo/spinner-monte-verde/spinner-monte-verde.component';

@Component({
  selector: 'app-root',
  imports: [SpinnerComponent, RouterModule, SpinnerMonteVerdeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'datta-able';
  inicioSesionActiva: boolean;
  private router = inject(Router);
  private fireBase = inject(FirebaseService);
  estadoSesionSubscription: Subscription | undefined;

  constructor(
    private store: Store<AppState>,
    private sesion: LoginService
  ) {
    this.estadoSesionSubscription = this.sesion.estadoSesion().subscribe((user) => {
      if (user) {
        console.log('Usuario autenticado:', user.email);
        this.store.dispatch(correoInstitucionalActions({ correo: user.email }));
        this.store.dispatch(infoApoderadoActions());
        if (user.email !== 'admin@admin.com') {
          this.store.select('infoApoderado').subscribe((apoderadoInfo) => {
            if (apoderadoInfo.length > 0) {
              const correoInstitucional = apoderadoInfo.filter((correo) => correo.correoInstitucional === user.email);
              if (correoInstitucional.length === 0) {
                this.router.navigate(['infoApoderado']);
              } else {
                this.inicioSesionActiva = true;
                this.store.dispatch(listarAlumnos());
                this.store.dispatch(listarOtrosCobros());
              }
            }
          });
        } else {
          this.inicioSesionActiva = true;
          this.store.dispatch(listarAlumnos());
          this.store.dispatch(listarOtrosCobros());
        }
      } else {
        console.log('desactiva spinner');
        this.inicioSesionActiva = false;
      }
    });
  }

  // life cycle hook
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}

// angular import
import { Component, inject, OnInit } from '@angular/core';

// bootstrap import
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { LoginService } from '../../../../shared/service/login.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../store/indexReducer/indexReducer';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-nav-right',
  imports: [SharedModule],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {

  nombreUsuario = '';

  constructor(private sesion: LoginService, private store: Store<AppState>) {
    const config = inject(NgbDropdownConfig);

    config.placement = 'bottom-right';
  }

  ngOnInit(): void {
    combineLatest([
      this.store.select('infoApoderado'),
      this.store.select('correoInsitucional')
    ]).subscribe(([infoApoderado, correoInsitucional]) => {
      const usuario = infoApoderado.filter(dataAdicional => dataAdicional.correoInstitucional === correoInsitucional.correoInstitucional);
      this.nombreUsuario = usuario[0].nombre.concat(' ').concat(usuario[0].apellido);
    });
  }

  cerrarSesion() {
    this.sesion.logout()
    window.location.reload()
  }


}

// angular import
import { Component, inject } from '@angular/core';

// bootstrap import
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { LoginService } from '../../../../shared/service/login.service';

@Component({
  selector: 'app-nav-right',
  imports: [SharedModule],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent {
  // public props

  // constructor
  constructor(private sesion: LoginService) {
    const config = inject(NgbDropdownConfig);

    config.placement = 'bottom-right';
  }

  cerrarSesion() {
    this.sesion.logout()
    window.location.reload()
  }
}

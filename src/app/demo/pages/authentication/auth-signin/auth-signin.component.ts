import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { sesion } from '../../../../store/state/totalState';
import { LoginService } from '../../../../theme/shared/service/login.service';
import { Subscription } from 'rxjs';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SpinnerServiceService } from '../../../../theme/shared/service/spinner-service.service';
import { SpinnerMonteVerdeComponent } from '../../../spinner-monte-verde/spinner-monte-verde.component';
declare var bootstrap: any;

@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [RouterModule, AngularFireAuthModule, ReactiveFormsModule, SpinnerMonteVerdeComponent],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export default class AuthSigninComponent implements OnInit {
  initSesion: FormGroup;
  estadoSesionSubscription: Subscription | undefined;
  errorContrasenaIncorrecta= false;

  constructor(
    private form: FormBuilder,
    private router: Router,
    private sesion: LoginService,
    private spinner: SpinnerServiceService
  ) {
    this.initSesion = this.form.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const myModalWelcome = new bootstrap.Modal(document.getElementById('exampleModal'));
    myModalWelcome.show();
    this.estadoSesionSubscription = this.sesion.estadoSesion().subscribe((user) => {
      if (user) {
        console.log('Usuario autenticado:', user);
        // Realizar acciones para usuario autenticado
      } else {
        console.log('Usuario no autenticado');
        // Realizar acciones para usuario no autenticado
      }
    });
  }

  iniciarSesion() {
    this.spinner.funcionalidadSpinner(true);
    const sesion: sesion = {
      email: this.initSesion.value.email,
      password: this.initSesion.value.password
    };

    this.sesion
      .iniciarSesion(sesion)
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        this.spinner.funcionalidadSpinner(false);
        if (error.code === 'auth/invalid-credential') {
          this.errorContrasenaIncorrecta = true;
        }
        setTimeout(() => {
         this.errorContrasenaIncorrecta = false
        },4000);

      });
  }
}

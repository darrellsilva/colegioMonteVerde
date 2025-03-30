import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { sesion } from '../../../../store/state/totalState';
import { LoginService } from '../../../../theme/shared/service/login.service';
import { Subscription } from 'rxjs';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [RouterModule, AngularFireAuthModule, ReactiveFormsModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export default class AuthSigninComponent implements OnInit {
  initSesion: FormGroup;
  estadoSesionSubscription: Subscription | undefined;

  constructor(
    private form: FormBuilder,
    private router: Router,
    private sesion: LoginService
  ) {
    this.initSesion = this.form.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
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
    const sesion: sesion = {
      email: this.initSesion.value.email,
      password: this.initSesion.value.password
    };

    console.log('credenciales:', sesion);
    this.sesion
      .iniciarSesion(sesion)
      .then(() => {
        console.log('Sesion iniciado com sucesso!');
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        console.log('Error al iniciar sesion:', error);
      });
  }
}

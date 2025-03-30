import { Injectable } from '@angular/core';
import { sesion } from '../../../store/state/totalState';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private authentication: AngularFireAuth) { }

  iniciarSesion(sesion: sesion) {
    return this.authentication.signInWithEmailAndPassword(sesion.email, sesion.password);
  }

  estadoSesion() {
    return this.authentication.authState;
  }

  logout() {
    return this.authentication.signOut();
  }
}

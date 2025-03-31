import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../../theme/shared/service/login.service';

@Component({
  selector: 'app-auth-signup',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export default class AuthSignupComponent implements OnInit {
  newRegister: FormGroup;

  constructor(
    private fb: FormBuilder,
    private register: LoginService,
    private router: Router
  ) {
    this.newRegister = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  registrarCuenta() {
    const email = this.newRegister.value.email;
    const domain = email.substring(email.indexOf('@') + 1);
    if (domain !== 'colegiomonteverde.cl') {
      alert('El dominio de correo no es válido');
    } else {
      this.register.registrarCuenta(this.newRegister.value);
      this.router.navigate(['dashboard']);

    }
  }
}

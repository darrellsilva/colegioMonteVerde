import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);
const redirectUnauthorizedToSignin = () => redirectUnauthorizedTo(['auth/signin']);


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',

        pathMatch: 'full'
      },
      {
        path: 'mensualidad',
        loadComponent: ()=> import('./demo/mensualidad-alumnos/mensualidad-alumnos.component').then((c) => c.MensualidadAlumnosComponent),
        ...canActivate(redirectUnauthorizedToSignin)
      },
      {
        path: 'alumnos',
        loadComponent: ()=> import('./demo/alumnos/alumnos.component').then((c) => c.AlumnosComponent),
        ...canActivate(redirectUnauthorizedToSignin)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./demo/dashboard/dashboard.component').then((c) => c.DashboardComponent),
        ...canActivate(redirectUnauthorizedToSignin)
      },
      {
        path: 'pagos',
        loadComponent: () => import('./demo/pagos/pagos.component').then((c) => c.PagosComponent),
        ...canActivate(redirectUnauthorizedToSignin)
      },
      {
        path: 'profesores',
        loadComponent: () => import('./demo/info-profesores/info-profesores.component').then((c) => c.InfoProfesoresComponent),
        ...canActivate(redirectUnauthorizedToSignin)
      },
      {
        path: 'gastos',
        loadComponent: () => import('./demo/gastos/gastos.component').then((c) => c.GastosComponent),
        ...canActivate(redirectUnauthorizedToSignin)
      }

    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule),
          ...canActivate(redirectLoggedInToDashboard)
      },
      {
        path:'infoApoderado',
        loadComponent: () => import('./demo/info-apoderado/info-apoderado.component').then((c) => c.InfoApoderadoComponent),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

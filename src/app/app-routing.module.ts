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
        path: 'basic',
        loadChildren: () => import('./demo/ui-elements/ui-basic/ui-basic.module').then((m) => m.UiBasicModule),
        ...canActivate(redirectUnauthorizedToSignin)
      },
      {
        path: 'forms',
        loadChildren: () => import('./demo/pages/form-elements/form-elements.module').then((m) => m.FormElementsModule),
        ...canActivate(redirectUnauthorizedToSignin)
      },
      {
        path: 'tables',
        loadChildren: () => import('./demo/pages/tables/tables.module').then((m) => m.TablesModule),
        ...canActivate(redirectUnauthorizedToSignin)
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/extra/sample-page/sample-page.component'),
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

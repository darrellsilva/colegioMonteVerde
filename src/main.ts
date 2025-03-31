import { enableProdMode, importProvidersFrom } from '@angular/core';


import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { appReducers } from './app/store/indexReducer/indexReducer';
import { provideEffects } from '@ngrx/effects';
import { AlumnosEffects } from './app/store/effects/alumnosEffects';
import { OtrosCobrosEffects } from './app/store/effects/otrosCobrosEffects';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { LoginService } from './app/theme/shared/service/login.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from './environments/environment';
import { infoApoderadosEffects } from './app/store/effects/infoApoderadoEffects';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent,{
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule),
    provideAnimations(),
    provideStore(appReducers),
    provideEffects([AlumnosEffects, OtrosCobrosEffects, infoApoderadosEffects]),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    LoginService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }
  ]
})
  .catch((err) => console.error(err));

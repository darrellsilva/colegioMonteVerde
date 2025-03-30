import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { initializeApp } from 'firebase/app';
import { getAnalytics,  } from 'firebase/analytics';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app;
  private analytics;

  constructor() {
    console.log('Inicilizando Firebase');
    this.app = initializeApp(environment.firebaseConfig);
    this.analytics = getAnalytics(this.app);
  }

  getFirebaseApp() {
    return this.app;
  }

  getAnalytics() {
    return this.analytics;
  }
}

import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBR6_KQXhBoS6YC94GjJzsfV_rvxs_K-9c",
    authDomain: "colegio-monte-verde-dev.firebaseapp.com",
    projectId: "colegio-monte-verde-dev",
    storageBucket: "colegio-monte-verde-dev.firebasestorage.app",
    messagingSenderId: "264975189490",
    appId: "1:264975189490:web:5e405cec6bbfe740ca576b",
    measurementId: "G-G6P1XNRNCK"
  }
};

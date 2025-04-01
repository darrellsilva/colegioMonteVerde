import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyB2RhBecYNr2kKxdKy590CXUYKZhmWRmkc",
    authDomain: "colegio-monte-verde-prod.firebaseapp.com",
    projectId: "colegio-monte-verde-prod",
    storageBucket: "colegio-monte-verde-prod.firebasestorage.app",
    messagingSenderId: "566871119368",
    appId: "1:566871119368:web:8ffb0a0b6ed1e2253b23bd"
  }
};

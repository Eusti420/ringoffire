import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp({
      "projectId": "ring-of-fire-66e53",
      "appId": "1:905967106779:web:e24caac9337b61de5eaafe",
      "storageBucket": "ring-of-fire-66e53.appspot.com",
      "apiKey": "AIzaSyBo_7K4dJtE_0_fHX7KKWAERZNnZWFZSeU",
      "authDomain": "ring-of-fire-66e53.firebaseapp.com",
      "messagingSenderId": "905967106779"
    })),
    provideFirestore(() => getFirestore())
  ]
};


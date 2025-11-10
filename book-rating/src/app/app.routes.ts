import { Routes } from '@angular/router';
// import { booksRoutes } from './books/books.routes';
import { NotfoundPage } from './notfound-page/notfound-page';
import { HomePage } from './home-page/home-page';

export const routes: Routes = [
  // bei Weiterleitung vom leeren Pfad ist (fast) immer pathMatch:full nötig
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage, title: 'Start' },
  // ...booksRoutes

  // Basisroute für Lazy Loading
  {
    path: 'books',
    loadChildren: () => import('./books/books.routes').then(m => m.booksRoutes)
  },

  // Wildcard-Route, muss ganz unten stehen!
  { path: '**', component: NotfoundPage },
];

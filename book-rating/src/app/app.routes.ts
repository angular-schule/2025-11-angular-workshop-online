import { Routes } from '@angular/router';
import { booksRoutes } from './books/books.routes';
import { NotfoundPage } from './notfound-page/notfound-page';

export const routes: Routes = [
  // bei Weiterleitung vom leeren Pfad ist (fast) immer pathMatch:full nötig
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  ...booksRoutes,
  // Wildcard-Route, muss ganz unten stehen!
  { path: '**', component: NotfoundPage },
];

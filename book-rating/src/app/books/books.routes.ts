import { Routes } from "@angular/router";
import { DashboardPage } from "./dashboard-page/dashboard-page";
import { BookDetailsPage } from "./book-details-page/book-details-page";
import { BookDetailsResourcePage } from "./book-details-resource-page/book-details-resource-page";
import { BookCreatePage } from "./book-create-page/book-create-page";
import { BookSearchPage } from "./book-search-page/book-search-page";
import { BooksEntryPage } from "./books-entry-page/books-entry-page";
import { BookCreateSignalPage } from "./book-create-signal-page/book-create-signal-page";

export const booksRoutes: Routes = [
  {
    path: '',
    component: BooksEntryPage,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardPage, title: 'Dashboard' },
      { path: 'create', component: BookCreateSignalPage, title: 'Buch erstellen' },
      { path: 'search', component: BookSearchPage, title: 'Suche' },
      { path: ':isbn', component: BookDetailsPage, title: 'Details' },
      { path: 'details/:isbn', component: BookDetailsResourcePage, title: 'Details' },
    ]
  },

];

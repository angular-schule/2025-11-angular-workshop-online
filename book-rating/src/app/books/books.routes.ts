import { Routes } from "@angular/router";
import { DashboardPage } from "./dashboard-page/dashboard-page";
import { BookDetailsPage } from "./book-details-page/book-details-page";
import { BookDetailsResourcePage } from "./book-details-resource-page/book-details-resource-page";

export const booksRoutes: Routes = [
  { path: '', component: DashboardPage, title: 'Dashboard' },
  { path: ':isbn', component: BookDetailsPage, title: 'Details' },
  { path: 'details/:isbn', component: BookDetailsResourcePage, title: 'Details' }
];

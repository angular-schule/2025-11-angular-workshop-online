import { inject, Injectable, Signal } from '@angular/core';
import { Book } from './book';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookStore {
  #http = inject(HttpClient);
  #apiURL = 'https://api.angular.schule';

  getAll(): Observable<Book[]> {
    return this.#http.get<Book[]>(this.#apiURL + '/books');
    // this.#http.get(`${this.#apiURL}/books`);
  }

  getAllResource(): HttpResourceRef<Book[]> {
    return httpResource<Book[]>(
      () => this.#apiURL + '/books',
      { defaultValue: [] }
    );
  }

  getSingle(isbn: string): Observable<Book> {
    return this.#http.get<Book>(`${this.#apiURL}/books/${isbn}`);
  }

  getSingleResource(isbn: Signal<string>): HttpResourceRef<Book | undefined> {
    return httpResource<Book>(() => `${this.#apiURL}/books/${isbn()}`);
  }

  create(book: Book): Observable<Book> {
    return this.#http.post<Book>(`${this.#apiURL}/books`, book);
  }

  search(term: string): Observable<Book[]> {
    return this.#http.get<Book[]>(`${this.#apiURL}/books/search/${term}`);
  }
}

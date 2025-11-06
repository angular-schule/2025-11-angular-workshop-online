import { inject, Injectable } from '@angular/core';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';
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

  getSingle(isbn: string): Observable<Book> {
    return this.#http.get<Book>(`${this.#apiURL}/books/${isbn}`);
  }

  create(book: Book): Observable<Book> {
    return this.#http.post<Book>(`${this.#apiURL}/books`, book);
  }

  search(term: string): Observable<Book[]> {
    return this.#http.get<Book[]>(`${this.#apiURL}/books/search/${term}`);
  }
}

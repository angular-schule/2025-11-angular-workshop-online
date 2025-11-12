import { Component, inject, input, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookStore } from '../shared/book-store';
import { Book } from '../shared/book';
import { filter, map, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-book-details-page',
  imports: [RouterLink],
  templateUrl: './book-details-page.html',
  styleUrl: './book-details-page.scss'
})
export class BookDetailsPage {
  // #route = inject(ActivatedRoute);
  #store = inject(BookStore);
  readonly isbn = input.required<string>(); // Component Input Binding

  /*protected readonly book = toSignal(this.#route.paramMap.pipe(
    map(params => params.get('isbn')),
    filter(isbn => isbn !== null),
    switchMap(isbn => this.#store.getSingle(isbn)),
  ));*/

  protected readonly book = toSignal(
    toObservable(this.isbn).pipe(
      switchMap(isbn => this.#store.getSingle(isbn))
    )
  );
}


/*
TODO
- ISBN aus der URL lesen
- Buch laden per HTTP
- Buch anzeigen
*/

import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookStore } from '../shared/book-store';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book-details-page',
  imports: [RouterLink],
  templateUrl: './book-details-page.html',
  styleUrl: './book-details-page.scss'
})
export class BookDetailsPage {
  #route = inject(ActivatedRoute);
  #store = inject(BookStore);

  protected readonly book = signal<Book | undefined>(undefined);

  constructor() {
    // Pull
    // const isbn = this.#route.snapshot.paramMap.get('isbn');

    // Push
    // TODO. Verschachtelte Subscriptions vermeiden
    this.#route.paramMap.subscribe(params => {
      const isbn = params.get('isbn');
      if (isbn) {
        this.#store.getSingle(isbn).subscribe(book => {
          this.book.set(book);
        })
      }
    });

  }
}


/*
TODO
- ISBN aus der URL lesen
- Buch laden per HTTP
- Buch anzeigen
*/

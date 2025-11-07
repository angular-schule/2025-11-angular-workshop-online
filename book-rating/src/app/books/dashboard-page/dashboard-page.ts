import { Component, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookCard } from "../book-card/book-card";
import { BookRatingHelper } from '../shared/book-rating-helper';
import { BookStore } from '../shared/book-store';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-page',
  imports: [BookCard],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss'
})
export class DashboardPage {
  #ratingHelper = inject(BookRatingHelper);
  #store = inject(BookStore);

  protected readonly books = this.#store.getAllResource();
  // protected readonly booksCount = computed(() => this.books().length);


  constructor() {
    /*this.#store.getAll().subscribe(receivedBooks => {
      this.books.set(receivedBooks);
    });*/
  }

  doRateUp(book: Book) {
    const ratedBook = this.#ratingHelper.rateUp(book);
    this.#updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.#ratingHelper.rateDown(book);
    this.#updateList(ratedBook);
  }

  // [1,2,3,4,5,6].map(e => e * 10) // [10, 20, 30, 40, 50, 60]
  // [1,2,3,4,5,6,7,8,9,10].filter(e => e % 2 === 0) // [2,4,6,8,10]

  #updateList(ratedBook: Book) {
    this.books.update(currentList => {
      return currentList.map(b => {
        if (b.isbn === ratedBook.isbn) {
          return ratedBook;
        } else {
          return b;
        }
      });

    });
  }

  deleteBook(book: Book) {
    if (!confirm(`Buch "${book.title}" wirklich löschen?`)) {
      return;
    }

    this.#store.delete(book.isbn).subscribe(() => {
      // Liste neuladen
      // this.books.reload();

      // oder: Liste lokal filtern
      this.books.update(currentList => currentList.filter(b => b.isbn !== book.isbn));
    });
  }
}

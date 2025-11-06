import { Component, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookCard } from "../book-card/book-card";
import { BookRatingHelper } from '../shared/book-rating-helper';

@Component({
  selector: 'app-dashboard-page',
  imports: [BookCard],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss'
})
export class DashboardPage {
  protected readonly books = signal<Book[]>([]);
  // protected readonly booksCount = computed(() => this.books().length);

  #ratingHelper = inject(BookRatingHelper);

  constructor() {
    this.books.set([
      {
        isbn: '1234',
        title: 'Angular',
        description: 'Grundlagen und mehr',
        price: 42.9,
        rating: 5
      },
      {
        isbn: '5678',
        title: 'Vue.js',
        description: 'Das grüne Framework',
        price: 32.9,
        rating: 3
      }
    ]);

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
}

import { Component, inject, input } from '@angular/core';
import { BookStore } from '../shared/book-store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-details-resource-page',
  imports: [RouterLink],
  templateUrl: './book-details-resource-page.html',
  styleUrl: './book-details-resource-page.scss'
})
export class BookDetailsResourcePage {
  #store = inject(BookStore);

  readonly isbn = input.required<string>();
  protected readonly book = this.#store.getSingleResource(this.isbn);


}

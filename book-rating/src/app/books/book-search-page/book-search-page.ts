import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, Observable, of, switchMap, tap } from 'rxjs';
import { BookStore } from '../shared/book-store';
import { toSignal } from '@angular/core/rxjs-interop';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book-search-page',
  imports: [ReactiveFormsModule],
  templateUrl: './book-search-page.html',
  styleUrl: './book-search-page.scss'
})
export class BookSearchPage {
  protected readonly searchControl = new FormControl('', { nonNullable: true });
  protected readonly isLoading = signal(false);
  #store = inject(BookStore);

  protected readonly results = toSignal(
    this.searchControl.valueChanges.pipe(
      // filter(term => term.length >= 3),
      debounceTime(1000),
      distinctUntilChanged(),
      tap(() => this.isLoading.set(true)),
      switchMap(term => {
        if (term.length < 3) {
          return of([])
        }
        return this.#store.search(term);
      }),
      tap(() => this.isLoading.set(false)),
    ),
    { initialValue: [] }
  );
}
